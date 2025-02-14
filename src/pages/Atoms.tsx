import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import "../App.css";
import "../styles/Atoms.css"; // Skapa och importera en CSS-fil för Atoms

interface Atom {
  formula: string;
  property: {
    Name?: string;
    Description?: string;
    DescriptionAttribution?: string;
    DescriptionLicense?: string;
  };
}

const fetchAtoms = async (): Promise<Atom[]> => {
  const { data } = await axios.get("http://localhost:8000/atom");
  return data;
};

const Atoms = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["atoms"],
    queryFn: fetchAtoms,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error when fetching data.</p>;

  return (
    <div className="container">
      <h2>Atoms</h2>
      <table className="atom-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Formula</th>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((atom, index) => (
            <tr key={index}>
              <td>
                <img
                  src={`http://localhost:8000/atom/${atom.formula}/image`}
                  alt={`${atom.formula} skeletal structure`}
                  className="atom-image"
                />
              </td>
              <td>{atom.formula}</td>
              <td>{atom.property.Name || "N/A"}</td>
              <td>
                {atom.property.Description ? (
                  <>
                    {atom.property.Description}{" "}
                    {atom.property.DescriptionAttribution && (
                      <a
                        href={atom.property.DescriptionAttribution}
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

export default Atoms;