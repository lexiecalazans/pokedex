import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, vi, expect } from "vitest";
import "@testing-library/jest-dom";
import Modal from ".";
import { mockPokemon } from "../../../mocks/pokemonMock";

describe("Modal Component", () => {
  const handleToggleFavoriteMock = vi.fn();
  const onCloseMock = vi.fn();

  const renderModal = (isOpen: boolean, isFavorite: boolean) =>
    render(
      <Modal
        isOpen={isOpen}
        onClose={onCloseMock}
        selectedPokemon={mockPokemon}
        isFavorite={isFavorite}
        handleToggleFavorite={handleToggleFavoriteMock}
      />
    );

  it("should not render when isOpen is false", () => {
    renderModal(false, false);
    expect(screen.queryByText(mockPokemon.name)).toBeNull();
  });

  it("should render correctly when isOpen is true", () => {
    renderModal(true, false);
    expect(screen.getByText(mockPokemon.name)).toBeInTheDocument();
    expect(screen.getByText("Tipo:")).toBeInTheDocument();
    expect(screen.getByText("Habilidades:")).toBeInTheDocument();
    expect(screen.getByText("Estatísticas:")).toBeInTheDocument();
  });

  it("should display favorite icon if isFavorite is true", () => {
    renderModal(true, true);
    expect(screen.getByText("Remover dos Favoritos")).toBeInTheDocument();
  });

  it("should display add-to-favorite button if isFavorite is false", () => {
    renderModal(true, false);
    expect(screen.getByText("Adicionar aos Favoritos")).toBeInTheDocument();
  });

  it("should call onClose when close button is clicked", () => {
    renderModal(true, false);
    const closeButton = screen.getByRole("button", { name: "✖" });
    fireEvent.click(closeButton);
    expect(onCloseMock).toHaveBeenCalledOnce();
  });

  it("should call handleToggleFavorite when favorite button is clicked", () => {
    renderModal(true, false);
    const favoriteButton = screen.getByRole("button", {
      name: "Adicionar aos Favoritos",
    });
    fireEvent.click(favoriteButton);
    expect(handleToggleFavoriteMock).toHaveBeenCalledWith(mockPokemon);
  });

  it("should render all types of the selected Pokemon", () => {
    renderModal(true, false);
    expect(screen.getByText("electric")).toBeInTheDocument();
  });

  it("should render all abilities of the selected Pokemon", () => {
    renderModal(true, false);
    expect(screen.getByText("static")).toBeInTheDocument();
    expect(screen.getByText("lightning-rod")).toBeInTheDocument();
  });

  it("should render all stats of the selected Pokemon", () => {
    renderModal(true, false);
    expect(screen.getByText("hp: 35")).toBeInTheDocument();
    expect(screen.getByText("attack: 55")).toBeInTheDocument();
  });
});
