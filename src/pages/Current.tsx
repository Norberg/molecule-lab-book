import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import MoleculesList from "../components/MoleculesList";
import { useState, useEffect, useRef } from "react";
import { FaCheckCircle } from "react-icons/fa";
import "../styles/Current.css";
import tagDescriptions, { TagDescription } from "../data/tagDescriptions";
import Popup from "../components/Popup";

interface ReactionHint {
  reactants: string[];
  products: string[];
  reactionPath: string;
  reactionHintPath: string;
}

interface ReactionLog {
  reactants: string[];
  products: string[];
  description: string;
  tags: string[];
  reactionPath: string;
  reactionHintPath: string;
}

interface ReactionHintItemProps {
  item: ReactionHint;
  index: number;
  foundReactionLog: ReactionLog | undefined;
  isRevealed: boolean;
  description: string;
  toggleReveal: (index: number) => void;
}

const ReactionHintItem = ({
  item,
  index,
  foundReactionLog,
  isRevealed,
  description,
  toggleReveal,
}: ReactionHintItemProps) => {
  const isDiscovered = Boolean(foundReactionLog);
  const [animateOverlay, setAnimateOverlay] = useState(false);
  const [animateDescription, setAnimateDescription] = useState(false);
  const [popupContent, setPopupContent] = useState<TagDescription | null>(null);
  const [popupAnchor, setPopupAnchor] = useState<DOMRect | null>(null);
  const itemRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (isDiscovered) {
      setAnimateOverlay(true);
      setAnimateDescription(true);
      itemRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      const timer = setTimeout(() => {
        setAnimateOverlay(false);
      }, 3000); // Animation duration
      return () => clearTimeout(timer);
    }
  }, [isDiscovered]);

  const handleTagClick = (tag: string, event: React.MouseEvent<HTMLButtonElement>) => {
    const buttonRect = event.currentTarget.getBoundingClientRect();
    setPopupAnchor(buttonRect);
    setPopupContent(
      tagDescriptions[tag] || { title: tag, description: <>No description available.</> }
    );
  };

  const closePopup = () => {
    setPopupContent(null);
    setPopupAnchor(null);
  };

  return (
    <li ref={itemRef} className="reaction-hint-item">
      <div className="reaction-hint-description-wrapper">
        <div className="reaction-image-container">
          <img
            src={`http://localhost:8000/reaction/image/${isRevealed ? item.reactionPath : item.reactionHintPath
              }`}
            alt={`Reaction image for ${isRevealed ? item.reactionPath : item.reactionHintPath}`}
          />
          {isDiscovered && (
            <FaCheckCircle className="discovered-icon" title="Discovered" />
          )}
          {animateOverlay && (
            <div className="discovered-overlay">
              <FaCheckCircle className="big-discovered-icon" title="Discovered" />
            </div>
          )}
        </div>
        {isDiscovered ? (
          <div className={`reaction-hint-description-container ${animateDescription ? "fade-in" : ""}`}>
            <div className="reaction-hint-description">{description}
              <div className="reaction-tags">
                {foundReactionLog?.tags.map((tag) => (
                  <button
                    key={tag}
                    className="tag-button"
                    onClick={(event) => handleTagClick(tag, event)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <button onClick={() => toggleReveal(index)} className="reveal-button">
            {isRevealed ? "Hide Reaction Path" : "Reveal Reaction Path"}
          </button>
        )}
      </div>
      {popupContent && popupAnchor && (
        <Popup content={popupContent} anchorRect={popupAnchor} onClose={closePopup} />
      )}
    </li>
  );
};

interface Molecule {
  formula: string;
  property: {
    Name?: string;
    Description?: string;
    DescriptionAttribution?: string;
    DescriptionLicense?: string;
  };
}

interface LevelData {
  points: number;
  time: number;
  victoryCondition: string[];
  hint: string;
  reactionHint: ReactionHint[];
  reactionLog: ReactionLog[];
  reactingElements: string[];
}

const fetchCurrentLevel = async (): Promise<LevelData> => {
  const { data } = await axios.get("http://localhost:8000/level/current");
  return data;
};

const fetchMolecules = async (): Promise<Molecule[]> => {
  const { data } = await axios.get("http://localhost:8000/molecule");
  return data;
};

const Current = () => {
  const { data: levelData, error: levelError, isLoading: levelLoading } = useQuery<LevelData>({
    queryKey: ["currentLevel"],
    queryFn: fetchCurrentLevel,
    refetchInterval: 500, // Refetch every 0.5 seconds
  });

  const { data: moleculesData, error: moleculesError, isLoading: moleculesLoading } = useQuery<Molecule[]>({
    queryKey: ["molecules"],
    queryFn: fetchMolecules,
  });

  const [revealed, setRevealed] = useState<Record<number, boolean>>({});

  if (levelLoading || moleculesLoading) return <p>Loading...</p>;
  if (levelError) return <p>Error when fetching current level.</p>;
  if (moleculesError) return <p>Error when fetching molecules.</p>;
  if (!levelData || !moleculesData) return <p>No data available</p>;

  const reactingMolecules = moleculesData.filter((molecule) =>
    levelData.reactingElements.includes(molecule.formula)
  );

  const victoryMolecules = moleculesData
    .filter((molecule) => levelData.victoryCondition.includes(molecule.formula))
    .map(molecule => {
      // Store original description if available
      const originalDescription = molecule.property.Description || "";
      // Check if any reaction log entry contains this molecule's formula
      const isDiscovered = levelData.reactionLog.some(
        (log) => log.products.includes(molecule.formula)
      );
      // Clone the molecule object to avoid mutating the original
      molecule = JSON.parse(JSON.stringify(molecule));
      molecule.property.Description = isDiscovered ? originalDescription : "Not discovered yet";
      molecule.property.DescriptionAttribution = isDiscovered ? molecule.property.DescriptionAttribution : undefined;
      return molecule;
    });

  const toggleReveal = (index: number) => {
    setRevealed((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="current-container">
      <h2>Current Level</h2>
      <p>Points: {levelData.points}</p>
      <p>Time: {Math.floor(levelData.time)}</p>
      <p>Hint: {levelData.hint}</p>

      <h2>Victory Condition</h2>
      <MoleculesList molecules={victoryMolecules} expandedImage={true} />

      {levelData.reactionHint && levelData.reactionHint.length > 0 && (
        <div className="reaction-hints-container">
          <h3>Reaction Hints</h3>
          <ul>
            {levelData.reactionHint.map((item, index) => {
              const foundReactionLog = levelData.reactionLog.find(
                (log) => log.reactionPath === item.reactionPath
              );
              const isDiscovered = Boolean(foundReactionLog);
              const description = foundReactionLog ? foundReactionLog.description : "";
              const isRevealed = isDiscovered || revealed[index];
              return (
                <ReactionHintItem
                  key={index}
                  item={item}
                  index={index}
                  foundReactionLog={foundReactionLog}
                  isRevealed={isRevealed}
                  description={description}
                  toggleReveal={toggleReveal}
                />
              );
            })}
          </ul>
        </div>
      )}

      {levelData.reactionLog && levelData.reactionLog.length > 0 && (
        <div className="reaction-log-container">
          <h3>Reaction Log</h3>
          <table>
            <thead>
              <tr>
                <th>Reaction Image</th>
                <th>Reactants</th>
                <th>Products</th>
              </tr>
            </thead>
            <tbody>
              {levelData.reactionLog
                .slice()
                .reverse()
                .map((log, index) => (
                  <tr key={index}>
                    <td>
                      <img
                        src={`http://localhost:8000/reaction/image/${log.reactionPath}`}
                        alt={`Reaction log image for ${log.reactionPath}`}
                      />
                    </td>
                    <td>{log.reactants.join(" + ")}</td>
                    <td>{log.products.join(" + ")}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

      {reactingMolecules.length > 0 && (
        <div>
          <h3>Reacting Elements</h3>
          <MoleculesList molecules={reactingMolecules} expandedImage={true} />
        </div>
      )}
    </div>
  );
};

export default Current;