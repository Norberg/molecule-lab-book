import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import MoleculesList from "../components/MoleculesList";
import { useState } from "react";

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
    <div>
      <h2>Current Level</h2>
      <p>Points: {levelData.points}</p>
      <p>Time: {Math.floor(levelData.time)}</p>
      <p>Hint: {levelData.hint}</p>
      
      <h2>Victory Condition</h2>
      <MoleculesList molecules={victoryMolecules} expandedImage={true} />

      {levelData.reactionHint && levelData.reactionHint.length > 0 && (
        <div>
          <h3>Reaction Hints</h3>
          <ul>
            {levelData.reactionHint.map((item, index) => (
              <li key={index}>
                <img
                  src={`http://localhost:8000/reaction/image/${revealed[index] ? item.reactionPath : item.reactionHintPath}`}
                  alt={`Reaction image for ${
                    revealed[index] ? item.reactionPath : item.reactionHintPath
                  }`}
                />
                <button onClick={() => toggleReveal(index)}>
                  {revealed[index] ? "Hide Reaction Path" : "Reveal Reaction Path"}
                </button>
              </li>
            ))}
          </ul>
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
