import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import MoleculesList from "../components/MoleculesList";
import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import "../styles/Current.css";

interface ReactionHint {
  reactants: string[];
  products: string[];
  reactionPath: string;
  reactionHintPath: string;
}

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
  reactionLog: ReactionHint[];
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
      // Clone molecule object to avoid changing the original object
      molecule = JSON.parse(JSON.stringify(molecule));
      molecule.property.Description = "Not discovered yet";
      molecule.property.DescriptionAttribution = undefined;
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
              // Kontrollera om reactionHint:ens reactionPath finns i reactionLog
              const isDiscovered = levelData.reactionLog.some(
                (log) => log.reactionPath === item.reactionPath
              );
              // Om den är upptäckt, visas den alltid expanderad
              const isRevealed = isDiscovered || revealed[index];

              return (
                <li key={index} className="reaction-hint-item">
                  <img
                    src={`http://localhost:8000/reaction/image/${
                      isRevealed ? item.reactionPath : item.reactionHintPath
                    }`}
                    alt={`Reaction image for ${
                      isRevealed ? item.reactionPath : item.reactionHintPath
                    }`}
                  />
                  {isDiscovered ? (
                    <div className="discovered-icon-wrapper">
                      <FaCheckCircle className="discovered-icon" title="Discovered" />
                    </div>
                  ) : (
                    <button onClick={() => toggleReveal(index)} className="reveal-button">
                      {isRevealed ? "Hide Reaction Path" : "Reveal Reaction Path"}
                    </button>
                  )}
                </li>
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
