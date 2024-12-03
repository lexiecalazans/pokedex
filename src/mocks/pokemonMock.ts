import { Pokemon } from "../types/types";

export const mockPokemon: Pokemon = {
  id: 1,
  name: "pikachu",
  image:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
  height: 4,
  base_experience: 112,
  types: [
    {
      type: { name: "electric", url: "https://pokeapi.co/api/v2/type/13/" },
      slot: 0,
    },
  ],
  abilities: [
    {
      ability: {
        name: "static",
        url: "",
      },
      is_hidden: false,
      slot: 0,
    },
    {
      ability: {
        name: "lightning-rod",
        url: "",
      },
      is_hidden: false,
      slot: 0,
    },
  ],
  stats: [
    {
      base_stat: 35,
      stat: {
        name: "hp",
        url: "",
      },
      effort: 0,
    },
    {
      base_stat: 55,
      stat: {
        name: "attack",
        url: "",
      },
      effort: 0,
    },
  ],
};
