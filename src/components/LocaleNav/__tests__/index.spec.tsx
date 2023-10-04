import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import LocaleNav from "..";
import messages from "../../../../messages/en-US.json";
import messagesEs from "../../../../messages/en-US.json";

describe("LocaleNav component", () => {
  it("should render two links with correct href and text", () => {
    jest.mock("next-intl", () => ({
      useTranslations: jest.fn(() => ({
        es: "Spanish",
        en: "English",
      })),
    }));

    const { getByText } = render(
      <NextIntlClientProvider messages={messages} locale="en-US">
        <LocaleNav />
      </NextIntlClientProvider>
    );

    expect(getByText("Spanish")).toHaveAttribute("href", "/es");
    expect(getByText("English")).toHaveAttribute("href", "/");
  });

  it("should use the correct translation for each link", () => {
    jest.mock("next-intl", () => ({
      useTranslations: jest.fn(() => ({
        es: "Español",
        en: "Ingles",
      })),
    }));

    const { getByText } = render(
      <NextIntlClientProvider messages={messagesEs} locale="es">
        <LocaleNav />
      </NextIntlClientProvider>
    );

    expect(getByText("Spanish")).toBeInTheDocument();
    expect(getByText("English")).toBeInTheDocument();
  });
});
