import { getAllPokemons } from "../services/getAllPokemons";
import { getAllTypes } from "../services/getAllTypes";

export const pokedexLoader = async () => {
    const pokemons = await getAllPokemons();
    const types = await getAllTypes();

    return {
        
    }
}