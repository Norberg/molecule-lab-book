import React, { useState } from "react";

interface Molecule {
  formula: string;
  property: {
    Name?: string;
    Description?: string;
    DescriptionAttribution?: string;
    DescriptionLicense?: string;
  };
}

interface MoleculesListProps {
  molecules: Molecule[];
}

const MoleculesList: React.FC<MoleculesListProps> = ({ molecules }) => {
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

  return (
    <div>
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
          {molecules.map((molecule, index) => (
            <tr key={index}>
              <td>
                <img
                  src={`http://localhost:8000/molecule/${molecule.formula}/skeletal`}
                  alt={`${molecule.formula} skeletal structure`}
                  className="molecule-image"
                  onMouseOver={(evt) => handleMouseOver(`http://localhost:8000/molecule/${molecule.formula}/skeletal`, evt)}
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

export default MoleculesList;