import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  max-width: 75rem;
  margin: 0 auto;
  padding: 1.25rem;
`;

export const Button = styled.button`
  padding: 0.625rem 1.25rem;
  font-size: 1rem;
  border: none;
  border-radius: 0.3125rem;
  background-color: #18335c;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.2s ease;
  border-radius: 1.5rem;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #c0c0c0;
    cursor: not-allowed;
  }
`;

export const CloseButton = styled(Button)`
  position: absolute;
  top: 0.625rem;
  right: 0.625rem;
  background: none;
  color: #18335c;
  font-size: 1.125rem;
`;

export const Title = styled.h1`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  font-weight: bold;
  font-size: 2rem;
  align-self: flex-start;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-weight: bold;
  font-size: 1rem;
  color: #555;
  gap: 0.625rem;
`;

export const Input = styled.input`
  padding: 0.625rem;
  font-size: 1rem;
  border: none;
  border-radius: 1.5rem;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

export const List = styled.ul`
  display: grid;
  list-style: none;
  padding: 0;
`;

export const ListItem = styled.li`
  font-size: 1rem;
  color: #333;
`;

export const PokemonListContainer = styled.div`
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
`;

export const SkeletonCard = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 20rem;
  min-height: 15rem;
  margin: 0.9375rem;
  padding: 1.25rem;
  text-align: center;
  background: #e0e0e0;
  border-radius: 0.9375rem;
  border: none;
  box-shadow: 0px 0.25rem 1.25rem rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;

  background: linear-gradient(90deg, #e0e0e0 25%, #d0d0d0 50%, #e0e0e0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite linear;

  @keyframes shimmer {
    100% {
      background-position: -200% 0;
    }
  }
`;
