import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Card from "./card";

describe("Card Component", () => {
  test("renders card component with the correct data", async () => {
    const mockData = {
      id: 1234,
      width: 300,
      height: 400,
      url: "url",
      photographer: "david",
      photographer_url: "string",
      photographer_id: 456,
      avg_color: "string",
      src: {
        original: "url_original",
        large2x: "url_large2x",
        large: "url_large",
        medium: "url_medium",
        small: "url_small",
        portrait: "url_portrait",
        landscape: "url_lanscape",
        tiny: "url_tiny",
      },
      liked: false,
      alt: "alt",
    };

    render(<Card data={mockData} />);

    expect(screen.getByText("david")).toBeInTheDocument();
    expect(screen.getByText("Favorite")).toBeInTheDocument();
  });
});
