import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import "../App.css";
import "../styles/Molecules.css";
import MoleculesList from "../components/MoleculesList";

interface Molecule {
  formula: string;
  property: {
    Name?: string;
    Description?: string;
    DescriptionAttribution?: string;
    DescriptionLicense?: string;
  };
}

const fetchMolecules = async (): Promise<Molecule[]> => {
  const { data } = await axios.get("http://localhost:8000/molecule");
  return data;
};

const Molecules = () => {
  const { data, error, isLoading } = useQuery<Molecule[]>({
    queryKey: ["molecules"],
    queryFn: fetchMolecules,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error when fetching data.</p>;
  if (!data) return <p>No data available</p>;

  return (
    <div className="container">
      <h2>Molecules</h2>
      <MoleculesList molecules={data} />
    </div>
  );
};

export default Molecules;
