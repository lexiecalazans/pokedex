import { Pokemon } from "../types/types";

export const saveFavorites = (favorites: Pokemon[]) => {
  localStorage.setItem("favorites", JSON.stringify(favorites));
};

export const loadFavorites = (): Pokemon[] => {
  const storedFavorites = localStorage.getItem("favorites");
  return storedFavorites ? JSON.parse(storedFavorites) : [];
};
