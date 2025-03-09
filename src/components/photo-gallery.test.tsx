import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import PhotoGallery from "./photo-gallery";
import fetchPhotos from "../plugins/fetchPhotos";
import "@testing-library/jest-dom";

// Mock the fetchPhotos function
jest.mock("../plugins/fetchPhotos");
const mockFetchPhotos = fetchPhotos as jest.MockedFunction<typeof fetchPhotos>;

// Mock IntersectionObserver
const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockImplementation((callback) => {
  return {
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  };
});
window.IntersectionObserver = mockIntersectionObserver;

const mockLocalStorage = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", { value: mockLocalStorage });

describe("Gallery Component", () => {
  test("renders without crashing", () => {
    render(<PhotoGallery showFavorites={false} />);
  });
});
