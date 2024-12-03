import { useEffect, useState } from "react";
import PokemonCard from "../PokemonCard";
import { getPokemonByName, getPokemonList } from "../../services/api";
import { Pokemon, Type } from "../../types/types";
import { loadFavorites, saveFavorites } from "../../services/localStorage";
import {
  Button,
  Container,
  PokemonListContainer,
  SkeletonCard,
} from "../../styles";

import styled from "styled-components";
import { POKEMON_TYPES } from "../../types/pokemonTypes";

const Form = styled.form`
  display: flex;
  gap: 0.625rem;
  width: 70%;
  justify-content: center;
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1.25rem 0px 1.25rem 0px;
  gap: 0.625rem;
`;

const Input = styled.input`
  padding: 0.625rem;
  font-size: 1rem;
  width: 100%;
  border-radius: 1rem;
  border: none;
`;

const Select = styled.select`
  padding: 0.1875rem;
  font-size: 1rem;
  border-radius: 1rem;
  border: none;
  height: 2.8125rem;
`;

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [allPokemonList, setAllPokemonList] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState<Pokemon[]>([]);
  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const limit = 30;

  useEffect(() => {
    const fetchAllPokemon = async () => {
      setLoading(true);
      try {
        const data = await getPokemonList(limit, offset, typeFilter);
        setPokemonList(data);
        setAllPokemonList((prev) => (page === 1 ? data : [...prev, ...data]));
        if (data.length < limit) {
          setHasMore(false);
        }
      } catch (error) {
        console.error("Erro ao buscar Pokémon:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllPokemon();
  }, [offset, page, typeFilter]);

  useEffect(() => {
    const storedFavorites = loadFavorites();
    setFavorites(storedFavorites);
  }, []);

  const handleToggleFavorite = (pokemon: Pokemon) => {
    const updatedFavorites = favorites.some((fav) => fav.id === pokemon.id)
      ? favorites.filter((fav) => fav.id !== pokemon.id)
      : [...favorites, pokemon];

    setFavorites(updatedFavorites);
    saveFavorites(updatedFavorites);
  };

  const isFavorite = (pokemon: Pokemon) => {
    return favorites.some((fav) => fav.id === pokemon.id);
  };

  const handleNextPage = () => {
    if (hasMore) {
      setOffset((prev) => prev + limit);
      setPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setOffset((prev) => prev - limit);
      setPage((prev) => prev - 1);
    }
  };

  const searchPokemonByName = async (name: string) => {
    setLoading(true);
    try {
      const data = await getPokemonByName(name);
      if (data) {
        setPokemonList([data]);
        setOffset(0);
        setHasMore(false);
      } else {
        setPokemonList([]);
        setHasMore(false);
      }
    } catch (error) {
      console.error("Erro ao buscar Pokémon:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    setPage(1);
    if (search.trim() !== "") {
      if (typeFilter) {
        setPokemonList(
          allPokemonList.filter(
            (pokemon) =>
              pokemon.name
                .toLowerCase()
                .includes(search.trim().toLowerCase()) &&
              pokemon.types.some((type: Type) => type.type.name === typeFilter)
          )
        );
        setOffset(0);
        setHasMore(false);
      } else {
        searchPokemonByName(search.trim());
      }
    } else {
      setOffset(0);
      setHasMore(true);
      setPokemonList(allPokemonList);
    }
  };

  const handleClearSearch = () => {
    setSearch("");
    setOffset(0);
    setHasMore(true);
    setPokemonList(allPokemonList);
  };

  const handleClearTypeFilter = () => {
    setTypeFilter("");
    setOffset(0);
    setHasMore(true);
    setPokemonList(allPokemonList);
  };

  const handleTypeSelectionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedType = event.target.value;
    setTypeFilter(selectedType);

    if (search.trim() !== "") {
      setPokemonList(
        allPokemonList.filter(
          (pokemon) =>
            pokemon.name.toLowerCase().includes(search.trim().toLowerCase()) &&
            (selectedType === "" ||
              pokemon.types.some(
                (type: Type) => type.type.name === selectedType
              ))
        )
      );
    } else {
      setPokemonList(
        allPokemonList.filter(
          (pokemon) =>
            selectedType === "" ||
            pokemon.types.some((type: Type) => type.type.name === selectedType)
        )
      );
    }
    setOffset(0);
    setHasMore(false);
  };

  const filteredPokemon = pokemonList.filter((pokemon) => {
    const matchesName = pokemon.name
      .toLowerCase()
      .includes(search.trim().toLowerCase());
    const matchesType =
      typeFilter === "" ||
      pokemon.types.some((type: Type) => type.type.name === typeFilter);

    return matchesName && matchesType;
  });

  return (
    <>
      <Container>
        <>
          <ContentWrapper>
            <Form role="form" onSubmit={handleSearch}>
              <Input
                type="text"
                placeholder="Buscar Pokémon Por Nome"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <Button type="button" onClick={handleClearSearch}>
                  X
                </Button>
              )}
            </Form>
            <Select value={typeFilter} onChange={handleTypeSelectionChange}>
              <option value="">Tipo do Pokémon</option>
              {POKEMON_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </Select>
            {typeFilter && (
              <Button type="button" onClick={handleClearTypeFilter}>
                X
              </Button>
            )}
          </ContentWrapper>
        </>

        <div>
          <PokemonListContainer>
            {loading ? (
              <>
                <SkeletonCard className="skeleton-loader" />
                <SkeletonCard />
                <SkeletonCard />
              </>
            ) : filteredPokemon.length > 0 ? (
              filteredPokemon.map((pokemon) => (
                <PokemonCard
                  key={pokemon.id}
                  pokemon={pokemon}
                  isFavorite={isFavorite(pokemon)}
                  toggleFavorite={() => handleToggleFavorite(pokemon)}
                />
              ))
            ) : (
              pokemonList !== allPokemonList &&
              !loading && <p>Ops, nenhuma pokebola encontrada</p>
            )}
          </PokemonListContainer>

          {!loading && hasMore && search.trim() === "" ? (
            <ContentWrapper>
              <Button
                type="button"
                onClick={handlePrevPage}
                disabled={page === 1}
              >
                Anterior
              </Button>

              <Button
                type="button"
                onClick={handleNextPage}
                disabled={!hasMore}
              >
                Próxima
              </Button>
            </ContentWrapper>
          ) : (
            pokemonList !== allPokemonList && (
              <ContentWrapper>
                <Button onClick={handleClearSearch}>
                  Voltar para a Pokédex
                </Button>
              </ContentWrapper>
            )
          )}
        </div>
      </Container>
    </>
  );
};

export default PokemonList;
