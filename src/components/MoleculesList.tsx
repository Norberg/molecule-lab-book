import React, { useState, useMemo } from "react";
import "./MoleculesList.css";
import { renderFormulas } from "../utils/formulaUtils";
import { FaSort, FaSortUp, FaSortDown, FaSearch } from "react-icons/fa";

interface Molecule {
  formula: string;
  property: {
    Name?: string;
    Description?: string;
    DescriptionAttribution?: string;
    DescriptionLicense?: string;
  };
  createdCount?: number;
}

interface MoleculesListProps {
  molecules: Molecule[];
  expandedImage?: boolean;
}

type SortField = "formula" | "name" | "createdCount";
type SortDirection = "asc" | "desc";

const MoleculesList: React.FC<MoleculesListProps> = ({ molecules, expandedImage = false }) => {
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [hoveredImagePosition, setHoveredImagePosition] = useState<{ top: number; left: number } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filteredAndSortedMolecules = useMemo(() => {
    let result = [...molecules];

    // Filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (m) =>
          m.formula.toLowerCase().includes(query) ||
          (m.property.Name && m.property.Name.toLowerCase().includes(query))
      );
    }

    // Sort
    if (sortField) {
      result.sort((a, b) => {
        let valA: string | number = "";
        let valB: string | number = "";

        if (sortField === "formula") {
          valA = a.formula;
          valB = b.formula;
        } else if (sortField === "name") {
          valA = a.property.Name || "";
          valB = b.property.Name || "";
        } else if (sortField === "createdCount") {
          valA = a.createdCount ?? 0;
          valB = b.createdCount ?? 0;
        }

        if (valA < valB) return sortDirection === "asc" ? -1 : 1;
        if (valA > valB) return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [molecules, searchQuery, sortField, sortDirection]);

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return <FaSort className="sort-icon-inactive" />;
    return sortDirection === "asc" ? <FaSortUp /> : <FaSortDown />;
  };

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
      <div className="molecule-list-controls">
        <div className="search-wrapper">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by formula or name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

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
            <th onClick={() => handleSort("formula")} className="sortable-header">
              Formula {getSortIcon("formula")}
            </th>
            <th onClick={() => handleSort("name")} className="sortable-header">
              Name {getSortIcon("name")}
            </th>
            <th onClick={() => handleSort("createdCount")} className="sortable-header">
              Created {getSortIcon("createdCount")}
            </th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedMolecules.map((molecule, index) => (
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
              <td>{molecule.createdCount ?? 0}</td>
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