import React from "react";

export const renderFormulas = (text: string): React.ReactNode => {
  const regex = /([A-Z][a-z]?)(\d*)|([+-])(\d*)/g;
  const elements: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      elements.push(text.slice(lastIndex, match.index));
    }
    if (match[1]) {
      // Matched element with optional count.
      elements.push(
        <React.Fragment key={key++}>
          {match[1]}
          {match[2] && <sub>{match[2]}</sub>}
        </React.Fragment>
      );
    } else if (match[3]) {
      // Matched a charge with an optional number.
      const chargeDigits = match[4] ? match[4] : "";
      elements.push(
        <sup key={key++}>
          {chargeDigits}
          {match[3]}
        </sup>
      );
    }
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) {
    elements.push(text.slice(lastIndex));
  }
  return <>{elements}</>;
};