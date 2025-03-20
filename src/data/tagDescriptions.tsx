import React, { JSX } from "react"; // Import React för JSX.Element

interface TagDescription {
  description: JSX.Element; // Allows for rich formatting using JSX
}

const tagDescriptions: Record<string, TagDescription> = {
  "Acid-base reaction": {
    description: (
      <>
        An acid-base reaction is a type of chemical reaction where an acid reacts with a base to form water and a salt. 
        This reaction is an example of neutralization, where the hydrogen ions (<strong>H+</strong>) from the acid combine 
        with the hydroxide ions (<strong>OH-</strong>) from the base to produce water. The resulting salt is a compound 
        formed from the remaining ions of the acid and base. These reactions are common in various chemical processes, 
        including digestion and the neutralization of harmful substances. The pH of the solution typically moves towards 7, 
        indicating a neutral solution. Acid-base reactions are important in both industrial applications and biological systems.
      </>
    ),
  },
  "Double displacement reaction": {
    description: (
      <>
        A double displacement reaction, also known as a double replacement or metathesis reaction, occurs when two compounds 
        react to form two new compounds by exchanging their ions or components. The general formula for this type of reaction 
        is <strong>AB + CD → AC + BD</strong>. In this process, the cations and anions of the two reactants switch places. 
        Double displacement reactions often result in the formation of a precipitate, a gas, or a weak electrolyte like water. 
        These reactions are common in inorganic chemistry, particularly in precipitation and acid-base reactions. They are 
        important in various processes such as water treatment, where ions are exchanged to remove impurities.
      </>
    ),
  },
};

export default tagDescriptions;