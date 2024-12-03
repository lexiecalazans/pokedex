import React from "react";
import { Container, Title, TextContainer } from "../../../styles/index";
import styled from "styled-components";
import { Pokemon } from "../../../types/types";
import { FaStar, FaRegStar } from "react-icons/fa";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPokemon: Pokemon;
  isFavorite: boolean;
  handleToggleFavorite: (pokemon: Pokemon) => void;
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(0.25rem);
`;

const ModalContainer = styled(Container)<{ type: string }>`
  background-color: white;
  border-radius: 1rem;
  padding: 3rem 2.5rem;
  max-width: 45rem;
  position: relative;
  text-align: center;
  border: 1px solid ${({ type }) => `rgba(var(--${type}), 0.6)`};
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  animation: modal-fade-in 0.3s ease-in-out;

  @keyframes modal-fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const CloseButton = styled.button<{ type: string }>`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: transparent;
  border: none;
  font-size: 1.5rem;
  color: ${({ type }) => `rgba(var(--${type}), 0.7)`};
  cursor: pointer;

  &:hover {
    color: ${({ type }) => `rgba(var(--${type}), 1)`};
  }
`;

const ContentHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
`;

const Image = styled.img<{ type: string }>`
  width: 16rem;
  height: 16rem;
  background-color: ${({ type }) => `rgba(var(--${type}), 0.6)`};
  border-radius: 50%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const ContentContainer = styled(Container)`
  width: 100%;
  padding: 1rem;
  gap: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const PokemonType = styled.span<{ type: string }>`
  background-color: ${({ type }) => `rgba(var(--${type}), 0.8)`};
  color: ${({ type }) => (type === "electric" ? "black" : "white")};
  padding: 0.375rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  margin-right: 0.5rem;
`;

const StatItem = styled.span`
  padding: 0.375rem 0.75rem;
  background-color: #f4f4f4;
  border-radius: 0.375rem;
  font-size: 1rem;
  display: inline-flex;
  align-items: center;
  margin-right: 0.75rem;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
`;

const AbilitiesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const FavoriteButton = styled.button<{ type: string }>`
  background-color: ${({ type }) => `rgba(var(--${type}), 0.8)`};
  color: ${({ type }) => (type === "electric" ? "black" : "white")};
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1.5rem;
  box-shadow: 0 0.25rem 0.375rem rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: ${({ type }) => `rgba(var(--${type}), 1)`};
    box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.2);
  }
`;

const Modal: React.FC<ModalProps> = ({
  selectedPokemon,
  isFavorite,
  handleToggleFavorite,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <Overlay>
      <ModalContainer role="dialog" type={selectedPokemon.types[0].type.name}>
        <CloseButton
          type={selectedPokemon.types[0].type.name}
          onClick={onClose}
        >
          ✖
        </CloseButton>
        <ContentHeader>
          <Image
            type={selectedPokemon.types[0].type.name}
            src={selectedPokemon.image}
            alt={selectedPokemon.name}
          />
          <ContentContainer>
            <Title>
              {selectedPokemon.name}{" "}
              {isFavorite ? (
                <FaStar color="orange" />
              ) : (
                <FaRegStar color="gray" />
              )}
            </Title>
            <TextContainer>
              <p>Tipo:</p>
              <AbilitiesContainer>
                {selectedPokemon.types?.map((typeInfo, index) => (
                  <PokemonType type={typeInfo.type.name} key={index}>
                    {typeInfo.type.name}
                  </PokemonType>
                ))}
              </AbilitiesContainer>
            </TextContainer>
          </ContentContainer>
        </ContentHeader>

        <ContentContainer>
          <TextContainer>
            <Title>Habilidades:</Title>
            <AbilitiesContainer>
              {selectedPokemon.abilities?.map((abilityInfo, index) => (
                <StatItem key={index}>{abilityInfo.ability.name}</StatItem>
              ))}
            </AbilitiesContainer>
          </TextContainer>

          <TextContainer>
            <Title>Estatísticas:</Title>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {selectedPokemon.stats?.map((statInfo, index) => (
                <StatItem key={index}>
                  {statInfo.stat.name}: {statInfo.base_stat}
                </StatItem>
              ))}
            </div>
          </TextContainer>
        </ContentContainer>

        <FavoriteButton
          type={selectedPokemon.types[0].type.name}
          onClick={() => handleToggleFavorite(selectedPokemon)}
        >
          {isFavorite ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
        </FavoriteButton>
      </ModalContainer>
    </Overlay>
  );
};

export default Modal;
