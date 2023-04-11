import { getAllPokemons } from "../services/getAllPokemons";
import { getAllTypes } from "../services/getAllTypes";

export const pokedexLoader = async ({ request }) => {
    const pokemons = await getAllPokemons();
    const types = await getAllTypes();
    const url = new URL(request.url);
    console.log(url.searchParams.get('pokemon_type'))
    console.log(url.searchParams.get('pokemon_name'))

    return {
        pokemons,
        types
    }
}