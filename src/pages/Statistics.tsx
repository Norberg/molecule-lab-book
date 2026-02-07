import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import "../App.css";
import "../styles/Statistics.css";

interface StatisticsData {
  seenMolecules: number;
  totalMolecules: number;
  seenAtoms: number;
  totalAtoms: number;
  uniqueReactionsPerformed: number;
  totalUniqueReactions: number;
  totalReactionsMade: number;
}

const fetchStatistics = async (): Promise<StatisticsData> => {
  const { data } = await axios.get("http://localhost:8000/statistics");
  return data;
};

const StatCard = ({ title, seen, total, unit }: { title: string; seen: number; total: number; unit: string }) => {
  const percentage = total > 0 ? (seen / total) * 100 : 0;
  return (
    <div className="stat-card">
      <h3>{title}</h3>
      <div className="stat-value">{seen} / {total}</div>
      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${percentage}%` }}></div>
      </div>
      <div className="stat-info">{unit} discovered</div>
    </div>
  );
};

const Statistics = () => {
  const { data, error, isLoading } = useQuery<StatisticsData>({
    queryKey: ["statistics"],
    queryFn: fetchStatistics,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error when fetching statistics.</p>;
  if (!data) return <p>No data available</p>;

  return (
    <div className="statistics-container">
      <h2>Global Statistics</h2>
      <div className="stats-grid">
        <StatCard
          title="Molecules"
          seen={data.seenMolecules}
          total={data.totalMolecules}
          unit="Molecules"
        />
        <StatCard
          title="Atoms"
          seen={data.seenAtoms}
          total={data.totalAtoms}
          unit="Atoms"
        />
        <StatCard
          title="Reaction Types"
          seen={data.uniqueReactionsPerformed}
          total={data.totalUniqueReactions}
          unit="Unique reactions"
        />
        <div className="stat-card total-reactions-card">
          <h3>Total Reactions Performed</h3>
          <div className="stat-value">{data.totalReactionsMade}</div>
          <div className="stat-info">Accumulated count</div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
