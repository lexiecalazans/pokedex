import React from "react";
import styled from "styled-components";
import { Pokemon } from "../../types/types";
import Modal from "./PokemonModal";

const Card = styled.div<{ type: string }>`
  display: flex;
  flex-direction: column;
  min-width: 20rem;
  margin: 0.9375rem;
  padding: 1.25rem;
  text-align: center;
  cursor: pointer;
  background: ${({ type }) =>
    `linear-gradient(145deg, rgba(var(--${type}), 0.9), rgba(var(--${type}), 0.6))`};
  border-radius: 0.9375rem;
  border: none;
  box-shadow: 0px 0.25rem 1.25rem rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 0.375rem 1.5625rem rgba(0, 0, 0, 0.3);
  }
`;

const PokemonImage = styled.img`
  align-self: center;
  width: 7.5rem;
  height: 7.5rem;
  margin-bottom: 0.625rem;
`;

const PokemonName = styled.h3`
  color: #fff;
  letter-spacing: 0.125rem;
  font-weight: bold;
  text-transform: capitalize;
  margin: 0.625rem 0;
`;

const FavoriteButton = styled.button<{ isFavorite: boolean }>`
  background: transparent;
  border: none;
  align-self: flex-end;
  cursor: pointer;
  font-size: 1.25rem;
  color: ${({ isFavorite }: { isFavorite: boolean }) =>
    isFavorite ? "gold" : "white"};
  transition: color 0.3s ease;

  &:hover {
    color: ${({ isFavorite }: { isFavorite: boolean }) =>
      isFavorite ? "#ffd700" : "lightgray"};
  }
`;

interface PokemonCardProps {
  pokemon: Pokemon;
  isFavorite: boolean;
  toggleFavorite: () => void;
}

const PokemonCard: React.FC<PokemonCardProps> = ({
  pokemon,
  isFavorite,
  toggleFavorite,
}) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const pokemonType = pokemon.types[0].type.name;

  return (
    <>
      <Card
        onClick={() => setIsModalOpen(true)}
        key={pokemon.id}
        type={pokemonType}
      >
        <FavoriteButton
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite();
          }}
          isFavorite={isFavorite}
        >
          {isFavorite ? "★" : "☆"}
        </FavoriteButton>
        <PokemonImage src={pokemon.image} alt={pokemon.name} />
        <PokemonName>{pokemon.name}</PokemonName>
      </Card>
      <Modal
        isOpen={isModalOpen}
        selectedPokemon={pokemon}
        onClose={() => setIsModalOpen(false)}
        handleToggleFavorite={() => toggleFavorite()}
        isFavorite={isFavorite}
      />
    </>
  );
};

export default PokemonCard;
