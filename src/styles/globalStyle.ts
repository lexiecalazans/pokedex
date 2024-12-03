import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    font-family: 'Poppins', sans-serif; 
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    line-height: 1.6;
    background-image: url('/images/background.png');
    background-size: cover;
    background-attachment: fixed;
    color: #333;
  }

  :root {
    --grass: 95, 189, 88;
    --bug: 146, 188, 44;
    --dark: 89, 87, 97;
    --dragon: 12, 105, 200;
    --electric: 242, 217, 78;
    --fairy: 238, 144, 230;
    --fighting: 211, 66, 95;
    --fire: 220, 135, 47;
    --flying: 161, 187, 236;
    --ghost: 95, 109, 188;
    --ground: 218, 124, 77;
    --ice: 117, 208, 193;
    --normal: 160, 162, 159;
    --poison: 183, 99, 207;
    --psychic: 255, 44, 168;
    --rock: 163, 140, 33;
    --steel: 86, 149, 163;
    --water: 83, 157, 223;
  }

  ::-webkit-scrollbar {
    width: 0.375rem; 
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2); 
    border-radius: 0.1875rem; 
  }
`;

export default GlobalStyle;
