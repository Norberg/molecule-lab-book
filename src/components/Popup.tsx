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
    const padding = 10;
    const offsetY = 5; // margin below the button
    // Position the popup directly under the clicked tag button using fixed positioning
    let top = anchorRect.bottom + offsetY; 
    let left = anchorRect.left;

    // If the popup's width causes it to go off-screen, adjust the left edge
    const popupWidth = 800; 
    if (left + popupWidth + padding > window.innerWidth) {
      left = window.innerWidth - popupWidth - padding;
    }

    return {
      position: "fixed",
      top,
      left,
      width: popupWidth,
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