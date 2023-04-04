import React, { useContext, useEffect, useState } from 'react'; 
import  UserContext from '../contexts/UserProvider';
import axios from 'axios';
import PokemonCard from '../components/PokemonCard';

const getAllPokemons = async () => { 
  try {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${0}&limit=${1000}`);

    return res.data.results;
  } catch (error ) {
    console.error(error);
  }
};

const Pokedex = () => {
  const { user } = useContext(UserContext);
  const [pokemons, setPokemons] = useState([]);
  //*const pokemonsPagination = usePagination(pokemons, 55)

  const loadAllpokemons = async () => {
    const allPokemons = await getAllPokemons(); 
    setPokemons(allPokemons);  
    console.log(allPokemons)
  };

  useEffect(()=> { 
    loadAllpokemons();
  }, []);

  return (
    <div className="w-full h-full">
      <header>
        <div className='bg-red-600 w-full p-8'>
          <img src="/pokedex.png" alt="Pokedex" className='absolute w-[300px] mt-[-1%]'/> 
        </div>
        <div className='bg-black w-full p-4'> </div> 
      </header>
      <p className='p-5'>
        <span className="text-red-500 font-semibold"> Bienvenido {user}, </span> aqui podras encontrar tu pokemon favorito
      </p>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 p-5">
        {pokemons.map(pokemon => <PokemonCard key={pokemon.url} pokemonData={pokemon}/>)}
      </div>
      <section>
        {/* {pokemonsPagination.ListSlice.map((pokemon) =>(
          <PokemonCard key={pokemon.url} pokemonData={pokemon} />
        ))} */}
      </section>
    </div>  
  )
};

export default Pokedex;