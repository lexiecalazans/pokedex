import React, { useEffect, useState } from "react";
import PokemonCard from "../PokemonCard";
import styled from "styled-components";
import { loadFavorites, saveFavorites } from "../../services/localStorage";
import { Pokemon } from "../../types/types";
import { Container, SkeletonCard, Title } from "../../styles";

const FavoritesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 1.25rem;
`;

const FavoritesTitle = styled(Title)`
  display: block;
  text-align: center;
  color: #fff;
`;

export const FavoritesList: React.FC = () => {
  const [favorites, setFavorites] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadedFavorites = loadFavorites();
    setFavorites(loadedFavorites);
    setLoading(false);
  }, []);

  const handleToggleFavorite = (pokemon: Pokemon) => {
    const updatedFavorites = favorites.includes(pokemon)
      ? favorites.filter((fav) => fav.id !== pokemon.id)
      : [...favorites, pokemon];

    setFavorites(updatedFavorites);
    saveFavorites(updatedFavorites);
  };

  return (
    <Container>
      <FavoritesTitle>Meus Pokémons Favoritos</FavoritesTitle>
      <FavoritesContainer>
        {loading ? (
          <>
            <SkeletonCard /> <SkeletonCard /> <SkeletonCard />
          </>
        ) : favorites.length === 0 ? (
          <p>Você ainda não tem favoritos.</p>
        ) : (
          favorites.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              isFavorite={true}
              toggleFavorite={() => handleToggleFavorite(pokemon)}
            />
          ))
        )}
      </FavoritesContainer>
    </Container>
  );
};
