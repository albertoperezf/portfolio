import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Footer from "..";

describe("Footer", () => {
  it("should render three links with correct hrefs and text", () => {
    render(<Footer />);
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(3);
    expect(links[0]).toHaveAttribute(
      "href",
      "https://stackoverflow.com/users/6450931/alberto-perez",
    );
    expect(links[0]).toHaveTextContent("Stackoverflow ->");
    expect(links[1]).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/albertojpf/",
    );
    expect(links[1]).toHaveTextContent("LinkedIn ->");
    expect(links[2]).toHaveAttribute(
      "href",
      "https://github.com/albertoperezf",
    );
    expect(links[2]).toHaveTextContent("Github ->");
  });

  it("should open links in new tab", () => {
    render(<Footer />);
    const links = screen.getAllByRole("link");
    links.forEach((link) => {
      expect(link).toHaveAttribute("target", "_blank");
    });
  });

  it("should have correct rel attribute for links", () => {
    render(<Footer />);
    const links = screen.getAllByRole("link");
    links.forEach((link) => {
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });
  });

  it("should have correct span element for arrow in links", () => {
    render(<Footer />);
    const arrows = screen.getAllByText("->");
    expect(arrows).toHaveLength(3);
    arrows.forEach((arrow) => {
      expect(arrow.tagName).toBe("SPAN");
    });
  });

  it("should match snapshot", () => {
    const { container } = render(<Footer />);
    expect(container).toMatchSnapshot();
  });
});
