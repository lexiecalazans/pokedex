
# Pokémon Project

Um projeto simples de Pokédex que permite visualizar uma lista de Pokémons, ver detalhes sobre cada um e adicionar/remover Pokémons dos favoritos.

## Tecnologias Utilizadas

- **React**: Para construção da interface de usuário.
- **React Router DOM**: Para navegação entre páginas.
- **Styled Components**: Para estilização da aplicação.
- **Vite**: Ferramenta de build rápida e moderna.
- **Vitest**: Para testes unitários.
- **Axios**: Para fazer requisições à API.
- **ESLint**: Para manter a qualidade do código.

## Instalação

Clone este repositório e instale as dependências utilizando o npm ou yarn:

```bash
git clone https://github.com/lexiecalazans/pokedex.git
cd pokedex
npm install
```

Ou, se preferir, usando Yarn:

```bash
git clone https://github.com/lexiecalazans/pokedex.git
cd pokedex
yarn install
```

## Rodando o Projeto

Após instalar as dependências, você pode rodar o projeto no modo de desenvolvimento com o seguinte comando:

```bash
npm run dev
```

Isso iniciará o servidor de desenvolvimento, e você poderá acessar o projeto em `http://localhost:5173`.

## Funcionalidades

- **Listagem de Pokémons**: Exibe uma lista de Pokémons com nome, imagem e informações básicas.
- **Favoritos**: Permite adicionar e remover Pokémons dos favoritos. A lista de favoritos é salva no armazenamento local do navegador.

## Estrutura do Projeto

```bash
src/
├── components/
│   ├── Header.tsx
│   ├── PokemonCard.tsx
│   ├── PokemonListPage.tsx
│   └── PokemonFavoritesPage.tsx
├── utils/
│   ├── localStorage.ts
│   ├── mocks.ts
│   ├── pokemontypes.ts
│   └── types.ts
├── App.tsx
├── index.tsx
├── vite.config.ts
└── vitest.config.ts
```

## Testes

Os testes do projeto são realizados com **Vitest** e podem ser executados com o comando:

```bash
npm run test
```
