import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, vi, expect } from "vitest";
import "@testing-library/jest-dom";
import PokemonCard from ".";
import { mockPokemon } from "../../mocks/pokemonMock";

describe("PokemonCard Component", () => {
  const toggleFavoriteMock = vi.fn();

  it("should render Pokemon card with the correct data", () => {
    render(
      <PokemonCard
        pokemon={mockPokemon}
        isFavorite={false}
        toggleFavorite={toggleFavoriteMock}
      />
    );

    expect(screen.getByText(mockPokemon.name)).toBeInTheDocument();

    expect(screen.getByAltText(mockPokemon.name)).toHaveAttribute(
      "src",
      mockPokemon.image
    );

    expect(screen.getByText("☆")).toBeInTheDocument();
  });

  it("should toggle favorite status when favorite button is clicked", () => {
    render(
      <PokemonCard
        pokemon={mockPokemon}
        isFavorite={false}
        toggleFavorite={toggleFavoriteMock}
      />
    );

    const favoriteButton = screen.getByText("☆");
    fireEvent.click(favoriteButton);

    expect(toggleFavoriteMock).toHaveBeenCalled();
  });

  it("should open modal when card is clicked", () => {
    render(
      <PokemonCard
        pokemon={mockPokemon}
        isFavorite={false}
        toggleFavorite={toggleFavoriteMock}
      />
    );

    const card = screen.getByText(mockPokemon.name).closest("div");
    if (card) {
      fireEvent.click(card);
    }

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("should close modal when onClose is called", () => {
    render(
      <PokemonCard
        pokemon={mockPokemon}
        isFavorite={false}
        toggleFavorite={toggleFavoriteMock}
      />
    );

    const card = screen.getByText(mockPokemon.name).closest("div");
    if (card) {
      fireEvent.click(card);
    }
    const closeButton = screen.getByRole("button", { name: "✖" });
    fireEvent.click(closeButton);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("should show filled star if Pokemon is a favorite", () => {
    render(
      <PokemonCard
        pokemon={mockPokemon}
        isFavorite={true}
        toggleFavorite={toggleFavoriteMock}
      />
    );

    expect(screen.getByText("★")).toBeInTheDocument();
  });
});
