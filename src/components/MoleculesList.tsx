import React, { useState } from "react";
import "./MoleculesList.css";
import { renderFormulas } from "../utils/formulaUtils";

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
  expandedImage?: boolean;
}

const MoleculesList: React.FC<MoleculesListProps> = ({ molecules, expandedImage = false }) => {
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [hoveredImagePosition, setHoveredImagePosition] = useState<{ top: number; left: number } | null>(null);

  const handleMouseOver = (imageUrl: string, event: React.MouseEvent<HTMLImageElement>) => {
    if (!expandedImage) {
      setHoveredImage(imageUrl);
      setHoveredImagePosition({ top: event.clientY, left: event.clientX });
    }
  };

  const handleMouseOut = () => {
    if (!expandedImage) {
      setHoveredImage(null);
      setHoveredImagePosition(null);
    }
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
            <th className="image-column">Image</th>
            <th>Formula</th>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {molecules.map((molecule, index) => (
            <tr key={index}>
              <td className="image-column">
                <img
                  src={`http://localhost:8000/molecule/${molecule.formula}/skeletal`}
                  alt={`${molecule.formula} skeletal structure`}
                  className="molecule-image"
                  onMouseOver={(evt) =>
                    handleMouseOver(`http://localhost:8000/molecule/${molecule.formula}/skeletal`, evt)
                  }
                  onMouseOut={handleMouseOut}
                  style={expandedImage ? { width: "300px", height: "300px" } : {}}
                />
              </td>
              <td>{renderFormulas(molecule.formula)}</td>
              <td>{molecule.property.Name || "N/A"}</td>
              <td>
                {molecule.property.Description ? (
                  <>
                    {renderFormulas(molecule.property.Description)}{" "}
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