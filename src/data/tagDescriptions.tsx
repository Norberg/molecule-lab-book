import { JSX } from "react";

interface TagDescription {
  title : string;
  description: JSX.Element;
}
export type { TagDescription };

const tagDescriptions: Record<string, TagDescription> = {
  "Acid-base reaction": {
    title: "Acid-base reaction",
    description: (
      <>
        An acid-base reaction is a type of chemical reaction where an acid reacts with a base to form water and a salt. 
        This reaction is an example of neutralization, where the hydrogen ions (<strong>H<sup>+</sup></strong>) from the acid combine 
        with the hydroxide ions (<strong>OH<sup>-</sup></strong>) from the base to produce water. The resulting salt is a compound 
        formed from the remaining ions of the acid and base. These reactions are common in various chemical processes, 
        including digestion and the neutralization of harmful substances. The pH of the solution typically moves towards 7, 
        indicating a neutral solution. Acid-base reactions are important in both industrial applications and biological systems.
      </>
    ),
  },
  "Double displacement reaction": {
    title: "Double displacement reaction",
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
  "Redox reaction": {
    title: "Redox reaction",
    description: (
      <>
        A redox reaction, short for reduction-oxidation reaction, is a type of chemical reaction that involves the transfer of electrons 
        between two chemical species. One reactant undergoes oxidation, where it loses electrons, while the other undergoes reduction, 
        where it gains electrons. The species that loses electrons is called the reducing agent, while the species that gains electrons 
        is called the oxidizing agent. Redox reactions are essential in various biological processes, such as cellular respiration, 
        as well as in industrial applications like batteries and corrosion prevention
      </>
    ),
  },
  "Precipitation reaction": {
    title: "Precipitation reaction",
    description: (
      <>
        A precipitation reaction occurs when two aqueous solutions containing soluble salts are mixed and one of the reaction products is insoluble in water, 
        forming a solid known as a precipitate. This reaction is utilized extensively in analytical chemistry for ion detection and removal, as well as in wastewater treatment 
        processes. The formation of the precipitate results from the combination of ions that form an insoluble compound, and the reaction is influenced by factors such as concentration, temperature, 
        and the solubility product constant (Ksp). Precipitation reactions are fundamental in chemical synthesis and environmental chemistry.
      </>
    ),
  },
  "Combination reaction": {
    title: "Combination reaction",
    description: (
      <>
        A combination reaction, also known as a synthesis reaction, is a type of chemical reaction where two or more reactants merge to form a single, more complex product. 
        This reaction often results in a compound with distinct properties that differ from those of the individual reactants. Combination reactions are essential in the synthesis of new compounds 
        and play a significant role in various industrial and laboratory processes. They typically occur under moderate conditions and are often highly exothermic. 
        This reaction is widely used in organic synthesis as well as in the industrial production of complex compounds.
      </>
    ),
  },
  "Equilibrium reaction": {
    title: "Equilibrium reaction",
    description: (
      <>
        An equilibrium reaction is characterized by the balance between the forward and reverse reactions, reaching a state where the rates of both processes are equal. 
        At equilibrium, the concentrations of reactants and products remain constant over time, providing insights into the dynamic nature of chemical systems. 
        Equilibrium reactions are critical in industrial processes and natural phenomena, including those found in biological systems. Adjusting temperature or pressure can shift the equilibrium position. 
        Understanding the equilibrium constant is crucial for optimizing these reactions in practical applications.
      </>
    ),
  },
  "Decomposition reaction": {
    title: "Decomposition reaction",
    description: (
      <>
        A decomposition reaction occurs when a single compound breaks down into two or more simpler substances. This type of reaction typically requires energy input 
        in the form of heat, light, or electricity and is fundamental in understanding the breakdown and recycling of chemical compounds. Decomposition reactions are widely used 
        in both industrial applications and environmental processes to transform complex substances into more basic forms. They often serve as preliminary steps in chemical synthesis. 
        This process plays a pivotal role in breaking down unstable compounds and recycling elements in natural systems.
      </>
    ),
  },
  "Ion exchange reaction": {
    title: "Ion exchange reaction",
    description: (
      <>
        An ion exchange reaction involves the swapping of ions between a solid compound and a solution or between two different solutions. This reaction is essential in processes 
        like water purification and softening, where undesirable ions are replaced by more favorable ones. The controlled exchange of ions is applied in various industrial and 
        environmental treatment technologies to achieve specific chemical balances. This process can often be reversed by altering the ionic concentration in the surrounding solution. 
        Such reactions are also fundamental in chromatographic techniques used for separating mixtures.
      </>
    ),
  },
  "Neutralization reaction": {
    title: "Neutralization reaction",
    description: (
      <>
        A neutralization reaction is a specific type of acid-base reaction where an acid and a base react to form water and a salt. This process effectively reduces the 
        reactivity of the participating species by forming more stable products. Neutralization reactions are vital in chemical manufacturing, waste treatment, and maintaining 
        balanced pH levels in natural and industrial systems. They are frequently accompanied by a significant release of heat, making them useful in controlling reaction conditions. 
        The exothermic nature of these reactions also highlights the energetic feasibility of the neutralization process.
      </>
    ),
  },
};

export default tagDescriptions;
