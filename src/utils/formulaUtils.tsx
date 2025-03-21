import React from "react";

// Helper to render an existing <sub> or <sup> tag from the input.
const renderExistingTag = (tag: string, key: number): React.ReactNode => {
  const tagNameRegex = /<(sub|sup)>(.*?)<\/\1>/i;
  const result = tagNameRegex.exec(tag);
  if (result) {
    const tagName = result[1];
    const innerContent = result[2];
    return React.createElement(tagName, { key }, innerContent);
  }
  return tag;
};

// Handles a chemical element and its optional count.
const renderElementPart = (
  element: string,
  count: string,
  key: number
): React.ReactNode => {
  return (
    <React.Fragment key={key}>
      {element}
      {count && <sub>{count}</sub>}
    </React.Fragment>
  );
};

// Handles a charge, either rendering it in a <sup> if attached or as plain text.
const renderChargePart = (
  charge: string,
  digits: string,
  matchIndex: number,
  text: string,
  key: number
): React.ReactNode => {
  if ((digits && digits.length > 0) || (matchIndex > 0 && text[matchIndex - 1] !== " ")) {
    return (
      <sup key={key}>
        {digits}
        {charge}
      </sup>
    );
  }
  return charge;
};

export const renderFormulas = (text: string): React.ReactNode => {
  if (!text) {
    return null; // Return null if text is null or undefined
  }
  // This regex will match either an existing <sub>/<sup> tag,
  // a chemical element with an optional count, or a charge.
  const regex = /(<(sub|sup)>.*?<\/\2>)|([A-Z][a-z]?)(\d*)|([+-])(\d*)/g;
  const elements: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    // Push any plain text found before the current match.
    if (match.index > lastIndex) {
      elements.push(text.slice(lastIndex, match.index));
    }
    if (match[1]) {
      // Case 1: Existing <sub> or <sup> tag.
      elements.push(renderExistingTag(match[1], key++));
    } else if (match[3]) {
      // Case 2: Element with optional count.
      elements.push(renderElementPart(match[3], match[4] || "", key++));
    } else if (match[5]) {
      // Case 3: Charge symbol (+ or -) with optional digits.
      elements.push(renderChargePart(match[5], match[6] || "", match.index, text, key++));
    }
    lastIndex = regex.lastIndex;
  }
  // Append any remaining text after the last match.
  if (lastIndex < text.length) {
    elements.push(text.slice(lastIndex));
  }
  return <>{elements}</>;
};

export const renderReaction = (reactants: string[], products: string[]): React.ReactNode => {
  const aggregateFormulas = (formulas: string[]): { formula: string; count: number }[] => {
    const map = new Map<string, number>();
    formulas.forEach((formula) => {
      map.set(formula, (map.get(formula) ?? 0) + 1);
    });
    return Array.from(map, ([formula, count]) => ({ formula, count }));
  };

  const renderAggregated = (aggregated: { formula: string; count: number }[]): React.ReactNode[] =>
    aggregated.map(({ formula, count }, index) => (
      <React.Fragment key={index}>
        {count > 1 ? count + " " : ""}{renderFormulas(formula)}
        {index < aggregated.length - 1 && " + "}
      </React.Fragment>
    ));

  const aggregatedReactants = aggregateFormulas(reactants);
  const aggregatedProducts = aggregateFormulas(products);

  return (
    <>
      {renderAggregated(aggregatedReactants)} → {renderAggregated(aggregatedProducts)}
    </>
  );
};