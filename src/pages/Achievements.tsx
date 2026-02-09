import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import "../App.css";
import "../styles/Achievements.css";

interface AchievementData {
    key: string;
    name: string;
    description: string;
    thresholds: {
        bronze: number;
        silver: number;
        gold: number;
    };
    current: number;
    currentLevel: "bronze" | "silver" | "gold" | null;
    unlockedLevels: Record<string, string>; // level -> timestamp
}

const fetchAchievements = async (): Promise<AchievementData[]> => {
    const { data } = await axios.get("http://localhost:8000/achievements");
    return data;
};

const AchievementCard = ({ achievement }: { achievement: AchievementData }) => {
    const levels: ("bronze" | "silver" | "gold")[] = ["bronze", "silver", "gold"];

    // Calculate progress towards next level
    let nextThreshold = achievement.thresholds.bronze;
    let prevThreshold = 0;

    if (achievement.currentLevel === "bronze") {
        nextThreshold = achievement.thresholds.silver;
        prevThreshold = achievement.thresholds.bronze;
    } else if (achievement.currentLevel === "silver") {
        nextThreshold = achievement.thresholds.gold;
        prevThreshold = achievement.thresholds.silver;
    } else if (achievement.currentLevel === "gold") {
        nextThreshold = achievement.thresholds.gold;
        prevThreshold = achievement.thresholds.gold;
    }

    const progressRange = nextThreshold - prevThreshold;
    const currentProgress = achievement.current - prevThreshold;
    const percentage = Math.min(100, Math.max(0, (currentProgress / (progressRange || 1)) * 100));

    return (
        <div className="achievement-card">
            <div className="achievement-header">
                <div className="achievement-info">
                    <h3>
                        {achievement.name}
                        {achievement.currentLevel && (
                            <span className={`achievement-level-tag level-${achievement.currentLevel} ms-2`}>
                                {achievement.currentLevel}
                            </span>
                        )}
                    </h3>
                    <p className="achievement-description">{achievement.description}</p>
                </div>
            </div>

            <div className="badges-container">
                {levels.map((level) => {
                    const isUnlocked = achievement.unlockedLevels[level] !== undefined;
                    const unlockedAt = achievement.unlockedLevels[level];
                    return (
                        <img
                            key={level}
                            src={`http://localhost:8000/achievements/image/${achievement.key}/${level}`}
                            className={`badge-icon ${isUnlocked ? 'unlocked' : ''}`}
                            title={isUnlocked ? `Unlocked: ${new Date(unlockedAt).toLocaleString()}` : `${level.charAt(0).toUpperCase() + level.slice(1)}: ${achievement.thresholds[level]}`}
                            alt={`${level} badge`}
                        />
                    );
                })}
            </div>

            <div className="achievement-progress">
                <div className="progress-label">
                    <span>Progress</span>
                    <span>{achievement.current} / {nextThreshold}</span>
                </div>
                <div className="progress-bar-bg">
                    <div
                        className="progress-bar-fill"
                        style={{ width: `${achievement.currentLevel === "gold" ? 100 : percentage}%` }}
                    ></div>
                </div>
                {achievement.currentLevel !== "gold" && (
                    <div className="next-threshold">
                        {nextThreshold - achievement.current} more to reach {achievement.currentLevel === "bronze" ? "silver" : achievement.currentLevel === "silver" ? "gold" : "bronze"}
                    </div>
                )}
            </div>
        </div>
    );
};

const Achievements = () => {
    const { data, error, isLoading } = useQuery<AchievementData[]>({
        queryKey: ["achievements"],
        queryFn: fetchAchievements,
    });

    if (isLoading) return <p className="p-4">Loading achievements...</p>;
    if (error) return <p className="p-4 text-danger">Error fetching achievements.</p>;
    if (!data) return <p className="p-4">No achievements found.</p>;

    return (
        <div className="achievements-container">
            <h2>Achievements</h2>
            <div className="achievements-grid">
                {data.map((ach) => (
                    <AchievementCard key={ach.key} achievement={ach} />
                ))}
            </div>
        </div>
    );
};

export default Achievements;
