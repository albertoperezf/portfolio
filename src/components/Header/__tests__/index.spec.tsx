import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import NextIntlJestProvider from "@/utils/nextIntlProvider";
import Header from "..";
import messages from "../../../../messages/en-US.json";

describe("Header", () => {
  beforeEach(() => {
    jest.mock("next-intl", () => ({
      useTranslations: jest.fn(() => ({
        ...messages.Header,
      })),
    }));
  });

  it("should render the name and job title", () => {
    render(
      <NextIntlJestProvider>
        <Header />
      </NextIntlJestProvider>
    );
    expect(screen.getByText("Alberto Perez")).toBeInTheDocument();
    expect(screen.getByText("Frontend Developer")).toBeInTheDocument();
  });

  it("should match snapshot", () => {
    const { container } = render(
      <NextIntlJestProvider>
        <Header />
      </NextIntlJestProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
