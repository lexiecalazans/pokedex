import styled from "styled-components";

const HeaderWrapper = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Logo = styled.img`
  width: 25rem;
  margin: auto;
`;

const StyledLink = styled.button`
  background: none;
  font-size: 1.2rem;
  align-self: flex-start;
  border: none;
  color: #ffffff;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s;

  &:hover {
    color: #0070f3;
  }
`;

const Header = () => {
  const onClickAnchor = () =>
    (window.location.href =
      window.location.pathname === "/" ? "/Favoritos" : "/");

  const pageName =
    window.location.pathname === "/"
      ? "Meus Pokemóns Favoritos"
      : "Voltar Para a Pokédex";

  return (
    <HeaderWrapper>
      <StyledLink onClick={onClickAnchor}>{pageName}</StyledLink>
      <Logo src="images/logo.png" alt="Logo" />
    </HeaderWrapper>
  );
};

export default Header;
