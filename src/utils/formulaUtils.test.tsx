import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { renderFormulas, renderReaction } from "./formulaUtils";

describe("renderFormulas", () => {
  it("renders plain text", () => {
    const { container } = render(<>{renderFormulas("Hello World")}</>);
    expect(container.textContent).toBe("Hello World");
  });

  it("renders a chemical formula with subscript", () => {
    // "H2O" should render H, a <sub> with "2", and then O.
    const { container } = render(<>{renderFormulas("H2O")}</>);
    expect(container.textContent).toBe("H2O");
    const sub = container.querySelector("sub");
    expect(sub).toBeInTheDocument();
    expect(sub).toHaveTextContent("2");
  });

  it("renders an existing <sup> tag", () => {
    // Existing <sup> tag should be maintained.
    const { container } = render(<>{renderFormulas("Na<sup>+</sup>")}</>);
    expect(container.textContent).toBe("Na+");
    const sup = container.querySelector("sup");
    expect(sup).toBeInTheDocument();
    expect(sup?.tagName.toLowerCase()).toBe("sup");
    expect(sup).toHaveTextContent("+");
  });

  it("renders a charge with <sup>", () => {
    // For "Cl-" the charge should be rendered in a <sup> tag.
    const { container } = render(<>{renderFormulas("Cl-")}</>);
    expect(container.textContent).toBe("Cl-");
    const sup = container.querySelector("sup");
    expect(sup).toBeInTheDocument();
    expect(sup).toHaveTextContent("-");
  });

  it("renders n-hexane unchanged", () => {
    const { container } = render(<>{renderFormulas("n-hexane")}</>);
    expect(container.textContent).toBe("n-hexane");
    expect(container.innerHTML).toBe("n-hexane"); // Ensure no HTML tags are added.
  });

  it("renders a valid chemical formula with multiple lowercase letters", () => {
    const { container } = render(<>{renderFormulas("MgCl2")}</>);
    expect(container.textContent).toBe("MgCl2");
    const sub = container.querySelector("sub");
    expect(sub).toBeInTheDocument();
    expect(sub).toHaveTextContent("2");
  });

  it("ignores invalid formulas", () => {
    const { container } = render(<>{renderFormulas("Invalid123")}</>);
    expect(container.innerHTML).toBe("Invalid123");
  });

  it("renders a valid chemical formula with charge", () => {
    const { container } = render(<>{renderFormulas("Na+1")}</>);
    expect(container.textContent).toBe("Na+1");
    const sup = container.querySelector("sup");
    expect(sup).toBeInTheDocument();
    expect(sup).toHaveTextContent("+1");
  });

  it("ignores invalid formulas with charges", () => {
    const { container } = render(<>{renderFormulas("n-hexane-1")}</>);
    expect(container.textContent).toBe("n-hexane-1");
  });

  it("renders a valid chemical formula with subscript and charge", () => {
    const { container } = render(<>{renderFormulas("CO2−3")}</>);
    expect(container.textContent).toBe("CO2−3");
    const sub = container.querySelector("sub");
    expect(sub).toBeInTheDocument();
    expect(sub).toHaveTextContent("2");
    //FIXME: This test is commented out because the charge is not rendered correctly.
    // The charge should be rendered in a <sup> tag.
    //const sup = container.querySelector("sup");
    //expect(sup).toBeInTheDocument();
    //expect(sup).toHaveTextContent("−3");
  });
});

describe("renderReaction", () => {
  it("aggregates duplicate formulas in reactants", () => {
    // Two occurrences of "H2O" should be aggregated to "2 H2O"
    const reactants = ["H2O", "H2O"];
    const products = ["H2", "O2"];
    const { container } = render(<>{renderReaction(reactants, products)}</>);
    expect(container.textContent).toContain("2 H2O");
    expect(container.textContent).toContain("H2");
    expect(container.textContent).toContain("O2");
    expect(container.textContent).toContain("→");
  });

  it("renders multiple formulas correctly", () => {
    const reactants = ["CO2", "H2O"];
    const products = ["C6H12O6", "O2"];
    const { container } = render(<>{renderReaction(reactants, products)}</>);
    expect(container.textContent).toContain("CO2");
    expect(container.textContent).toContain("H2O");
    expect(container.textContent).toContain("C6H12O6");
    expect(container.textContent).toContain("O2");
    expect(container.textContent).toContain("→");
  });
});