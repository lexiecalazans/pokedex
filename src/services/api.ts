import axios from "axios";
import { Pokemon } from "../types/types";

const API_BASE_URL = "https://pokeapi.co/api/v2";

const fetchPokemonDetails = async (url: string): Promise<Pokemon> => {
  const response = await axios.get(url);
  const data = response.data;
  return {
    id: data.id,
    name: data.name,
    image: data.sprites.front_default,
    height: data.height,
    base_experience: data.base_experience,
    types: data.types,
    abilities: data.abilities,
    stats: data.stats,
  };
};

export const getPokemonList = async (
  limit: number = 20,
  offset: number = 0,
  typeFilter?: string
): Promise<Pokemon[]> => {
  const url = typeFilter
    ? `${API_BASE_URL}/type/${typeFilter}`
    : `${API_BASE_URL}/pokemon`;

  const response = await axios.get(url, { params: { limit, offset } });

  const pokemonList = typeFilter
    ? response.data.pokemon.map((p: { pokemon: Pokemon }) => p.pokemon)
    : response.data.results;

  const pokemonData = await Promise.all(
    pokemonList.map((pokemon: { url: string }) =>
      fetchPokemonDetails(pokemon.url)
    )
  );

  return pokemonData;
};

export const getPokemonByName = async (
  name: string
): Promise<Pokemon | null> => {
  try {
    return await fetchPokemonDetails(`${API_BASE_URL}/pokemon/${name}`);
  } catch (error) {
    console.error(`Erro ao buscar Pokémon: ${name}`, error);
    return null;
  }
};
