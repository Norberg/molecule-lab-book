import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import "../App.css";

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
  const { data, error, isLoading } = useQuery({
    queryKey: ["molecules"],
    queryFn: fetchMolecules,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error when fetching data.</p>;

  return (
    <div className="container">
      <h2>Molecules</h2>
      <table className="molecule-table">
        <thead>
          <tr>
            <th>Formula</th>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((molecule, index) => (
            <tr key={index}>
              <td>{molecule.formula}</td>
              <td>{molecule.property.Name || "N/A"}</td>
              <td>
                {molecule.property.Description ? (
                  <>
                    {molecule.property.Description}{" "}
                    {molecule.property.DescriptionAttribution && (
                      <a
                        href={molecule.property.DescriptionAttribution}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        [Source]
                      </a>
                    )}
                  </>
                ) : (
                  "N/A"
                )}
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Molecules;
