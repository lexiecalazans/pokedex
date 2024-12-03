import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PokemonList from "./components/PokemonListPage";
import Header from "./components/Header";
import { FavoritesList } from "./components/PokemonFavoritesPage";

const App: React.FC = () => {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<PokemonList />} />
          <Route path="/Favoritos" element={<FavoritesList />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
