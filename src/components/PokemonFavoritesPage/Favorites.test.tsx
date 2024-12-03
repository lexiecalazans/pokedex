import { render, screen } from "@testing-library/react";
import { describe, it, vi, expect, beforeEach } from "vitest";
import "@testing-library/jest-dom";
import { FavoritesList } from ".";

describe("FavoritesList Component", () => {
  const loadFavoritesMock = vi.fn();

  beforeEach(() => {
    loadFavoritesMock.mockReset();
  });

  it("should display 'no favorites' message when there are no favorites", () => {
    loadFavoritesMock.mockReturnValue([]);
    render(<FavoritesList />);

    const noFavoritesMessage = screen.getByText(
      "Você ainda não tem favoritos."
    );
    expect(noFavoritesMessage).toBeInTheDocument();
  });
});
