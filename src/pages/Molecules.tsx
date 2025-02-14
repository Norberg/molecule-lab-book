import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import "../App.css";
import "../styles/Molecules.css"; // Uppdaterad importväg
import { useState } from "react";

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

  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [hoveredImagePosition, setHoveredImagePosition] = useState<{ top: number; left: number } | null>(null);

  const handleMouseOver = (imageUrl: string, event: React.MouseEvent<HTMLImageElement>) => {
    setHoveredImage(imageUrl);
    setHoveredImagePosition({ top: event.clientY, left: event.clientX });
  };

  const handleMouseOut = () => {
    setHoveredImage(null);
    setHoveredImagePosition(null);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error when fetching data.</p>;

  return (
    <div className="container">
      <h2>Molecules</h2>
      {hoveredImage && hoveredImagePosition && (
        <div
          className="hovered-image-container"
          style={{ top: hoveredImagePosition.top, left: hoveredImagePosition.left }}
        >
          <img src={hoveredImage} alt="Hovered molecule" className="hovered-image" />
        </div>
      )}
      <table className="molecule-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Formula</th>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((molecule, index) => (
            <tr key={index}>
              <td>
                <img
                  src={`http://localhost:8000/molecule/${molecule.formula}/skeletal`}
                  alt={`${molecule.formula} skeletal structure`}
                  className="molecule-image"
                  onMouseOver={(event) => handleMouseOver(`http://localhost:8000/molecule/${molecule.formula}/skeletal`, event)}
                  onMouseOut={handleMouseOut}
                />
              </td>
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
