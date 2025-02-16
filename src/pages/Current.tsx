import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface ReactionHint {
  reactants: string[];
  products: string[];
  reactionPath: string;
  reactionHintPath: string;
}

interface LevelData {
  points: number;
  time: number;
  hint: string;
  reactionHint: ReactionHint[];
  reactingElements: string[];
}

const fetchCurrentLevel = async (): Promise<LevelData> => {
  const { data } = await axios.get("http://localhost:8000/level/current");
  return data;
};

const Current = () => {
  const { data, error, isLoading } = useQuery<LevelData>({
    queryKey: ["currentLevel"],
    queryFn: fetchCurrentLevel,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error when fetching current level.</p>;

  return (
    <div>
      <h2>Current Level</h2>
      <p>Points: {data.points}</p>
      <p>Time: {data.time}</p>
      <p>Hint: {data.hint}</p>
      {data.reactionHint && data.reactionHint.length > 0 && (
        <div>
          <h3>Reaction Hints</h3>
          <ul>
            {data.reactionHint.map((item, index) => (
              <li key={index}>
                Reactants: {item.reactants.join(" + ")} {"=>"} Products: {item.products.join(" + ")}
              </li>
            ))}
          </ul>
        </div>
      )}
      {data.reactingElements && data.reactingElements.length > 0 && (
        <p>Reacting Elements: {data.reactingElements.join(", ")}</p>
      )}
    </div>
  );
};

export default Current;
