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

export const renderFormulas = (text: string): React.ReactNode => {
  if (!text) {
    return null; // Return null if text is null or undefined
  }

  const regex = /(<(sub|sup)>.*?<\/\2>)|([A-Z][a-z]{0,2})(\d*)([+-]\d*)?/g;
  const validFormulaRegex = /^[A-Z][a-z]{0,2}(\d+)?([+-]\d*)?$/; // Matches valid formulas only.
  const elements: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    // Add plain text before the current match.
    if (match.index > lastIndex) {
      elements.push(text.slice(lastIndex, match.index));
    }

    if (match[1]) {
      // Case 1: Existing <sub> or <sup> tag.
      elements.push(renderExistingTag(match[1], key++));
    } else if (match[3] && validFormulaRegex.test(match[0])) {
      // Case 2: Valid chemical element with optional count and charge.
      const element = match[3];
      const count = match[4] || "";
      const charge = match[5] || "";
      elements.push(
        <React.Fragment key={key++}>
          {element}
          {count && <sub>{count}</sub>}
          {charge && <sup>{charge}</sup>}
        </React.Fragment>
      );
    } else {
      // Treat invalid matches as plain text.
      elements.push(match[0]);
    }

    lastIndex = regex.lastIndex;
  }

  // Append any remaining plain text after the last match.
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