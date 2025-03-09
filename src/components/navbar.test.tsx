import { render, screen } from "@testing-library/react";
import Navbar from "./navbar";
import { jest } from "@jest/globals";

describe("Navbar Component", () => {
  test("renders without crashing", () => {
    const mockHandleFavorites = jest.fn();
    render(<Navbar handleFavorites={mockHandleFavorites} />);
  });

  test("calls handleFavorites when All Photos link is clicked", () => {
    const mockHandleFavorites = jest.fn();
    render(<Navbar handleFavorites={mockHandleFavorites} />);
    const allPhotosLink = screen.getByText("All Photos");
    allPhotosLink.click();
    expect(mockHandleFavorites).toHaveBeenCalledWith(false);
  });

  test("calls handleFavorites when favorite link is clicked", () => {
    const mockHandleFavorites = jest.fn();
    render(<Navbar handleFavorites={mockHandleFavorites} />);
    const favoriteLink = screen.getByText("Favorite");
    favoriteLink.click();
    expect(mockHandleFavorites).toHaveBeenCalledWith(true);
  });
});
