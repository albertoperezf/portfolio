import { render, screen } from "@testing-library/react";
import BuiltWith from "..";

describe("BuiltWith component", () => {
  it('should render a link with target="_blank" and rel="noopener noreferrer"', () => {
    render(<BuiltWith />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("should render the Next.js logo with width=70 and height=24", () => {
    render(<BuiltWith />);
    const nextLogo = screen.getByAltText("Next.js Logo");
    expect(nextLogo).toBeInTheDocument();
    expect(nextLogo).toHaveAttribute("src", "/next.svg");
    expect(nextLogo).toHaveAttribute("width", "70");
    expect(nextLogo).toHaveAttribute("height", "24");
  });

  it("should render the Vercel logo with width=70 and height=24", () => {
    render(<BuiltWith />);
    const vercelLogo = screen.getByAltText("Vercel Logo");
    expect(vercelLogo).toBeInTheDocument();
    expect(vercelLogo).toHaveAttribute("src", "/vercel.svg");
    expect(vercelLogo).toHaveAttribute("width", "70");
    expect(vercelLogo).toHaveAttribute("height", "24");
  });

  it("should match snapshot", () => {
    const { container } = render(<BuiltWith />);
    expect(container).toMatchSnapshot();
  });
});
