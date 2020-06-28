export async function getPokemon(pokemon) {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`).then((res) =>
    res.json()
  );
}
