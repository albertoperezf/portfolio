import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Header from "..";

describe("Header", () => {
  it("should render the name and job title", () => {
    render(<Header />);
    expect(screen.getByText("Alberto Perez")).toBeInTheDocument();
    expect(screen.getByText("Frontend Developer")).toBeInTheDocument();
  });

  it("should match snapshot", () => {
    const { container } = render(<Header />);
    expect(container).toMatchSnapshot();
  });
});
