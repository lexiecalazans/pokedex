import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { vi, describe, it, expect } from "vitest";
import PokemonList from ".";
import { getPokemonList } from "../../services/api";

vi.mock("../../services/api", () => ({
  getPokemonList: vi.fn(() =>
    Promise.resolve([
      {
        name: "Pikachu",
        id: 1,
        types: [{ type: { name: "electric" } }],
      },
      {
        name: "Bulbasaur",
        id: 2,
        types: [{ type: { name: "grass" } }],
      },
      {
        name: "Charmander",
        id: 3,
        types: [{ type: { name: "fire" } }],
      },
    ])
  ),
}));

describe("PokemonList Component", () => {
  it("should render a list of Pokémon", async () => {
    render(<PokemonList />);

    await waitFor(() => expect(getPokemonList).toHaveBeenCalled());

    const pikachu = screen.getByText("Pikachu");
    const bulbasaur = screen.getByText("Bulbasaur");
    const charmander = screen.getByText("Charmander");

    expect(pikachu).toBeInTheDocument();
    expect(bulbasaur).toBeInTheDocument();
    expect(charmander).toBeInTheDocument();
  });

  it("should filter Pokémon by type", async () => {
    render(<PokemonList />);

    await waitFor(() => expect(getPokemonList).toHaveBeenCalled());

    const selectType = screen.getByRole("combobox");
    fireEvent.change(selectType, { target: { value: "fire" } });

    const charmander = screen.getByText("Charmander");
    expect(charmander).toBeInTheDocument();
    expect(screen.queryByText("Pikachu")).not.toBeInTheDocument();
    expect(screen.queryByText("Bulbasaur")).not.toBeInTheDocument();
  });

  it("should search for Pokémon by name", async () => {
    render(<PokemonList />);

    await waitFor(() => expect(getPokemonList).toHaveBeenCalled());

    const input = screen.getByPlaceholderText("Buscar Pokémon Por Nome");
    fireEvent.change(input, { target: { value: "Pikachu" } });
    fireEvent.submit(screen.getByRole("form"));

    const pikachu = screen.getByText("Pikachu");
    expect(pikachu).toBeInTheDocument();
    expect(screen.queryByText("Bulbasaur")).not.toBeInTheDocument();
    expect(screen.queryByText("Charmander")).not.toBeInTheDocument();
  });

  it("should toggle Pokémon favorites", async () => {
    render(<PokemonList />);

    await waitFor(() => expect(getPokemonList).toHaveBeenCalled());

    const pikachuCard = screen.getByText("Pikachu");
    const favoriteButton = pikachuCard.querySelector("button");

    if (favoriteButton) {
      fireEvent.click(favoriteButton);
      expect(localStorage.setItem).toHaveBeenCalled();

      fireEvent.click(favoriteButton);
      expect(localStorage.setItem).toHaveBeenCalledTimes(2);
    }
  });

  it("should show loading state while fetching data", async () => {
    render(<PokemonList />);

    expect(screen.getByText(/carregando/i)).toBeInTheDocument();

    await waitFor(() => expect(getPokemonList).toHaveBeenCalled());

    const pikachu = screen.getByText("Pikachu");
    expect(pikachu).toBeInTheDocument();
  });
});
