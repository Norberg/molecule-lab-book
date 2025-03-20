import React from "react";
import "../styles/Popup.css";

interface PopupProps {
  content: {
    title: string;
    description: React.ReactNode;
  };
  anchorRect: DOMRect;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ content, anchorRect, onClose }) => {
  const computeStyle = (): React.CSSProperties => {
    const sidebarWidth = 250; // Sidebar width
    const padding = 10; // Padding to prevent overlap with edges
    const popupWidth = 800; // Max width
    const popupHeight = 200; // Max height

    // Calculate the center of the anchor element
    let top = anchorRect.top + window.scrollY + anchorRect.height / 2;
    let left = anchorRect.left + window.scrollX + anchorRect.width / 2;

    // Adjust for right edge
    if (left + popupWidth / 2 > window.innerWidth - sidebarWidth) {
      left = window.innerWidth - sidebarWidth - popupWidth / 2 - padding;
    } else if (left - popupWidth / 2 < 0) {
      left = popupWidth / 2 + padding;
    }

    // Adjust for bottom edge
    if (top + popupHeight / 2 > window.innerHeight) {
      top = window.innerHeight - popupHeight / 2 - padding;
    } else if (top - popupHeight / 2 < 0) {
      top = popupHeight / 2 + padding;
    }

    return {
      position: "absolute",
      top,
      left,
      transform: "translate(-50%, -50%)",
    };
  };

  return (
    <div className="popup" style={computeStyle()}>
      <div className="popup-content">
        <h3>{content.title}</h3>
        <p>{content.description}</p>
        <button className="close-popup" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Popup;