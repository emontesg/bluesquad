import React from "react";

import Box from "@material-ui/core/Box";

import Pokedex from "./components/Pokedex";

function App() {
  const [currentPokemon, setCurrentPokemon] = React.useState(1);

  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      py={4}
    >
      <Pokedex pokemon={currentPokemon} setPokemon={setCurrentPokemon} />
    </Box>
  );
}

export default App;
