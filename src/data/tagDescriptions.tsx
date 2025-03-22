import { JSX } from "react";

interface TagDescription {
  title: string;
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
  "Oxidation reaction": {
    title: "Oxidation reaction",
    description: (
      <>
        An oxidation reaction is characterized by the loss of electrons from a chemical species, often occurring with the involvement of oxygen or other oxidizing agents.
        This process is central to phenomena such as corrosion, cellular respiration, and energy production. It is usually coupled with a corresponding reduction reaction 
        to maintain the electron balance. Understanding oxidation reactions is crucial for controlling material degradation and optimizing industrial processes.
      </>
    ),
  },
  "Reduction reaction": {
    title: "Reduction reaction",
    description: (
      <>
        A reduction reaction involves the gain of electrons by a chemical species, resulting in a decrease in its oxidation state. This process is often accompanied by
        the transfer of protons or the removal of oxygen atoms. Reduction reactions are essential in biological systems, such as photosynthesis and cellular respiration,
        as well as in industrial processes like metal extraction and wastewater treatment. They are frequently paired with oxidation reactions to form redox reactions.
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
  "Disproportionation reaction": {
    title: "Disproportionation reaction",
    description: (
      <>
        A disproportionation reaction occurs when a single chemical species undergoes simultaneous oxidation and reduction. In this process, part of the molecule is oxidized while
        another part is reduced, forming two distinct products with different oxidation states. This reaction is significant in redox chemistry and helps illustrate the dual behavior
        of certain compounds. It is often observed in both inorganic and organic systems, playing a key role in various metabolic and industrial processes.
      </>
    ),
  },
  "Combustion reaction": {
    title: "Combustion reaction",
    description: (
      <>
        A combustion reaction is a rapid oxidation process that releases a large amount of energy in the form of heat and light. It typically involves a fuel reacting
        with oxygen to produce carbon dioxide and water. This highly exothermic reaction is fundamental for energy production in engines and power plants. 
        It is also studied extensively to improve efficiency and reduce pollutant emissions in industrial applications.
      </>
    ),
  },
  "Catalytic reaction": {
    title: "Catalytic reaction",
    description: (
      <>
        A catalytic reaction is one that is accelerated by the presence of a catalyst, a substance that remains unchanged throughout the process. 
        The catalyst provides an alternative reaction pathway with a lower activation energy, resulting in a faster reaction rate.
        This type of reaction is essential in many industrial syntheses and environmental applications, as it enables efficient chemical transformations under milder
        conditions. It is a cornerstone in modern chemistry, contributing to more sustainable and economical production methods.
      </>
    ),
  },
  "Addition reaction": {
    title: "Addition reaction",
    description: (
      <>
        An addition reaction involves the combining of two or more molecules to form a single product without producing any byproducts.
        It typically occurs when reactants add across a multiple bond, such as a double or triple bond, resulting in a more saturated compound.
        This reaction mechanism is extensively utilized in organic synthesis to create a wide variety of functionalized compounds.
        Addition reactions are crucial for the production of polymers, pharmaceuticals, and specialty chemicals. 
        Their controlled nature facilitates the design of complex molecules in both laboratory and industrial settings.
      </>
    ),
  },
  "Electrophilic addition": {
    title: "Electrophilic addition",
    description: (
      <>
        Electrophilic addition is a specific type of addition reaction where an electrophile targets a region of high electron density,
        typically a carbon-carbon double bond. The reaction begins when the electrophile forms a bond with one of the carbons, 
        creating a reactive intermediate. This intermediate is then attacked by a nucleophile to complete the addition process. 
        Electrophilic addition is widely employed in organic synthesis for modifying alkenes and alkynes. Its versatility makes 
        it a fundamental reaction for constructing a broad range of industrial chemicals and pharmaceuticals.
      </>
    ),
  },
  "Substitution reaction": {
    title: "Substitution reaction",
    description: (
      <>
        A substitution reaction is a type of chemical reaction where one atom or group of atoms in a molecule is replaced by another atom or group of atoms.
        This reaction is common in organic and inorganic chemistry and can occur via different mechanisms, such as nucleophilic, electrophilic, or radical substitution.
        Substitution reactions are widely used in the synthesis of pharmaceuticals, agrochemicals, and polymers, enabling the functionalization of molecules
        to achieve desired properties or reactivity.
      </>
    ),
  },
  "Electrophilic substitution": {
    title: "Electrophilic substitution",
    description: (
      <>
        Electrophilic substitution is a type of chemical reaction where an electrophile replaces a hydrogen atom or another substituent in an aromatic compound.
        This reaction preserves the aromaticity of the compound and is widely used in the synthesis of dyes, pharmaceuticals, and agrochemicals. Common examples
        include nitration, halogenation, and sulfonation of benzene derivatives.
      </>
    ),
  },
  "Nucleophilic substitution": {
    title: "Nucleophilic substitution",
    description: (
      <>
        Nucleophilic substitution is a specific type of substitution reaction where a nucleophile, a species with a lone pair of electrons, attacks an electrophilic center
        in a molecule, replacing a leaving group. This reaction is fundamental in organic synthesis, particularly in the formation of alcohols, ethers, and amines.
        It can proceed via two main mechanisms: SN1 (unimolecular) and SN2 (bimolecular), depending on the reaction conditions and substrate structure.
      </>
    ),
  },
  "Aromatic substitution": {
    title: "Aromatic substitution",
    description: (
      <>
        Aromatic substitution is a type of chemical reaction where a substituent on an aromatic ring is replaced by another atom or group of atoms.
        This reaction preserves the aromaticity of the ring and is widely used in organic synthesis. Common types include electrophilic aromatic substitution,
        where an electrophile replaces a hydrogen atom, and nucleophilic aromatic substitution, where a nucleophile replaces a leaving group.
        Aromatic substitution reactions are fundamental in the production of dyes, pharmaceuticals, and agrochemicals.
      </>
    ),
  },
  "Esterification reaction": {
    title: "Esterification reaction",
    description: (
      <>
        An esterification reaction is a chemical process in which an alcohol reacts with a carboxylic acid to form an ester and water. This reaction is typically catalyzed
        by an acid, such as sulfuric acid, and is widely used in the production of fragrances, flavors, and polymers. Esterification is a reversible reaction, and the yield
        can be improved by removing water or using an excess of one reactant.
      </>
    ),
  },
  "Acetylation reaction": {
    title: "Acetylation reaction",
    description: (
      <>
        An acetylation reaction involves the introduction of an acetyl group (CH3CO) into a molecule, typically replacing a hydrogen atom. This reaction is commonly used
        in organic synthesis to modify the chemical and physical properties of compounds, such as increasing stability or altering reactivity. Acetylation is a key step
        in the production of pharmaceuticals, dyes, and polymers.
      </>
    ),
  },
  "Functionalization reaction": {
    title: "Functionalization reaction",
    description: (
      <>
        A functionalization reaction introduces or modifies functional groups in a molecule to enhance its chemical reactivity or physical properties. This process is
        essential in organic synthesis, enabling the creation of complex molecules with specific functionalities. Functionalization reactions are widely used in the
        development of pharmaceuticals, materials, and catalysts.
      </>
    ),
  },
  "Markovnikov's rule": {
    title: "Markovnikov's rule",
    description: (
      <>
        Markovnikov's rule is a principle in organic chemistry that predicts the outcome of addition reactions to unsymmetrical alkenes. According to this rule, the
        electrophile adds to the carbon atom with the greater number of hydrogen atoms, while the nucleophile adds to the carbon with fewer hydrogen atoms. This rule
        helps explain the regioselectivity of many addition reactions and is fundamental in understanding reaction mechanisms.
      </>
    ),
  },
  "Metabolic reaction": {
    title: "Metabolic reaction",
    description: (
      <>
        A metabolic reaction refers to a chemical process that occurs within living organisms to sustain life. These reactions are categorized into two types:
        catabolic reactions, which break down molecules to release energy, and anabolic reactions, which build complex molecules from simpler ones. Metabolic
        reactions are essential for energy production, growth, and cellular repair.
      </>
    ),
  },
  "Protonation": {
    title: "Protonation",
    description: (
      <>
        Protonation is the process of adding a proton (H⁺) to a molecule, resulting in the formation of a positively charged species. This reaction often increases the
        reactivity of the molecule by altering its electron density. Protonation is common in acid-base chemistry and plays a pivotal role in many biochemical reactions.
        It can serve as an activation step for subsequent transformations, enabling molecules to undergo further chemical changes. The process is typically reversible,
        depending on the reaction conditions and the strength of the acid involved.
      </>
    ),
  },
  "Carbocation formation": {
    title: "Carbocation formation",
    description: (
      <>
        Carbocation formation involves the generation of a positively charged carbon center through heterolytic bond cleavage. This intermediate is central to many
        organic reactions, where it acts as an electrophile. The formation of carbocations is often a rate-determining step and can dictate the overall reaction pathway.
        Their stability depends on factors such as substituent effects, resonance, and hyperconjugation. Carbocation intermediates are key players in rearrangement,
        substitution, and addition reactions in organic synthesis.
      </>
    ),
  },
  "Ether formation": {
    title: "Ether formation",
    description: (
      <>
        Ether formation refers to the creation of an ether bond, where an oxygen atom links two alkyl or aryl groups together. This process typically occurs via
        nucleophilic substitution, where an oxygen nucleophile attacks a carbocation or another electrophilic center. The resulting ethers are important in both
        industrial processes and the synthesis of pharmaceuticals. Ether formation reactions often require careful control of reaction conditions to minimize side reactions.
        They are a central methodology in organic chemistry for constructing molecules with diverse physical and chemical properties.
      </>
    ),
  },
  "Catalytic cycle": {
    title: "Catalytic cycle",
    description: (
      <>
        The catalytic cycle describes a series of reaction steps in which a catalyst participates and is regenerated at the end of the process. This cycle
        facilitates the conversion of reactants to products while minimizing the overall activation energy required. It highlights the efficiency and sustainability
        of catalyzed reactions by showing how the catalyst is reused. Catalytic cycles are fundamental in both industrial chemistry and biological systems,
        ensuring reaction continuity and high turnover numbers. The concept aids in understanding and optimizing reaction mechanisms involving catalysts.
      </>
    ),
  },
  "Amination reaction": {
    title: "Amination reaction",
    description: (
      <>
        An amination reaction introduces an amino group into a molecule, thereby transforming its reactivity and properties. It often occurs as a key step in the synthesis
        of pharmaceuticals and agrochemicals. This reaction can proceed via nucleophilic substitution or electrophilic pathways, depending on the substrate. Amination reactions
        are instrumental in constructing complex nitrogen-containing structures and can be catalyzed by metals or enzymes. Their versatility makes them indispensable in organic synthesis.
      </>
    ),
  },
  "Chain growth reaction": {
    title: "Chain growth reaction",
    description: (
      <>
        A chain growth reaction is a polymerization mechanism where the active center of the polymer chain continuously adds monomer units. This process allows the molecular
        weight of the polymer to increase rapidly until termination occurs. It is typically initiated by a reactive species that propagates the chain reaction. Chain growth reactions
        are fundamental in producing a wide range of synthetic polymers used in everyday materials and high-performance applications. Their control is essential for achieving
        desired polymer properties.
      </>
    ),
  },
  "Condensation reaction": {
    title: "Condensation reaction",
    description: (
      <>
        A condensation reaction involves the joining of two molecules with the concomitant elimination of a small molecule such as water or methanol. This reaction mechanism
        is common in the formation of esters, amides, and peptides. It is characterized by the combination of functional groups that results in a more complex structure.
        Condensation reactions play a pivotal role in both organic synthesis and biological processes, such as protein formation. Their reversible nature also makes them useful
        in dynamic covalent chemistry.
      </>
    ),
  },
  "Hydrolysis reaction": {
    title: "Hydrolysis reaction",
    description: (
      <>
        A hydrolysis reaction involves the cleavage of chemical bonds by the addition of water. This reaction is essential in both organic and inorganic chemistry, as it
        contributes to the breakdown of complex molecules into simpler components. Hydrolysis plays a significant role in biological digestion and environmental degradation.
        The reaction conditions such as pH and temperature greatly influence the reaction rate and product distribution. Its reversibility is often exploited in industrial processes
        to modify material properties.
      </>
    ),
  },
  "Amide formation": {
    title: "Amide formation",
    description: (
      <>
        Amide formation is a reaction that creates an amide bond by coupling a carboxylic acid or its derivative with an amine. This process is fundamental in the synthesis
        of peptides and pharmaceuticals, as well as in polymer chemistry. It generally requires activation of the acid component or the use of a catalyst to improve efficiency.
        The resulting amide linkage contributes to the stability and bioactivity of the molecule. Control over the reaction conditions is critical to minimize side reactions and
        achieve high yields.
      </>
    ),
  },
  "Multicomponent reaction": {
    title: "Multicomponent reaction",
    description: (
      <>
        A multicomponent reaction involves three or more reactants in a single synthetic operation to form a product that incorporates substantial portions of all the inputs.
        This strategy is highly efficient as it enables rapid synthesis of complex molecules while minimizing purification steps. It has found significant applications in drug discovery,
        combinatorial chemistry, and material science. These reactions often display high atom economy and generate diverse libraries of compounds.
        Their design requires careful optimization of reaction conditions to balance reactivity and selectivity.
      </>
    ),
  },
  "Nitrile addition": {
    title: "Nitrile addition",
    description: (
      <>
        Nitrile addition refers to a reaction where a nitrile group is added across a multiple bond or inserted into a substrate, enhancing the nitrogen content of the molecule.
        This reaction is commonly observed in the formation of complex nitrogenous compounds and serves as a key step in many prebiotic syntheses. It can proceed through various
        mechanisms, often involving nucleophilic attack on an electrophilic center. The resulting products are useful intermediates in the synthesis of heterocyclic compounds.
        Such reactions underscore the emerging importance of nitrile chemistry in both laboratory and industrial settings.
      </>
    ),
  },
  "Nucleophilic addition": {
    title: "Nucleophilic addition",
    description: (
      <>
        Nucleophilic addition is a reaction mechanism in which a nucleophile forms a bond with an electron-deficient substrate, typically an unsaturated carbonyl compound.
        This process results in the direct formation of new carbon-heteroatom bonds and is fundamental to many organic transformations. It plays a crucial role in
        synthesizing alcohols, amines, and other functional groups by adding across double bonds. The reaction pathway is often sensitive to steric and electronic factors,
        dictating its regio- and stereoselectivity. Its broad applicability makes nucleophilic addition a cornerstone of synthetic organic chemistry.
      </>
    ),
  },
  "Polymerization reaction": {
    title: "Polymerization reaction",
    description: (
      <>
        A polymerization reaction is a process that converts monomer molecules into polymers through repeated chemical bonding. This reaction can occur via chain growth
        or step-growth mechanisms, resulting in materials with tailored physical and chemical properties. Polymerization is central to the production of plastics, rubbers,
        and fibers used in a myriad of applications. Control of the reaction conditions allows for precise manipulation of molecular weight and architecture.
        These reactions not only contribute to material science but also to innovative biomedical applications.
      </>
    ),
  },
  "Photochemical reaction": {
    title: "Photochemical reaction",
    description: (
      <>
        Photochemical reactions are driven by the absorption of light, which promotes chemical species to excited states and alters their reactivity. These reactions are
        pivotal in processes ranging from atmospheric chemistry to the synthesis of complex organic molecules. The input of light energy allows for unique reaction pathways
        that are not accessible under thermal conditions. Photochemical transformations often lead to rearrangements, cyclizations, or isomerizations that contribute to molecular diversity.
        Their application in synthetic chemistry continues to grow with advances in light sources and catalyst design.
      </>
    ),
  },
  "Cyclization": {
    title: "Cyclization",
    description: (
      <>
        Cyclization is a reaction that leads to the formation of a ring structure through the intramolecular bonding of atoms in a molecule. This process is crucial
        in the formation of cyclic compounds, which are prevalent in natural products, pharmaceuticals, and polymers. Cyclization reactions can occur via various mechanisms,
        such as nucleophilic substitution or addition, often requiring specific catalysts or reaction conditions. They contribute to the rigidity and specific chemical behavior
        of cyclic molecules compared to their acyclic counterparts. The ability to efficiently form rings is a cornerstone of synthetic strategies in organic chemistry.
      </>
    ),
  },
};

export default tagDescriptions;
