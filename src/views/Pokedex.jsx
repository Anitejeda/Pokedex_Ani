import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../contexts/UserProvider';
import axios from 'axios';
import PokemonCard from '../components/PokemonCard';

const getAllPokemons = async (p) => {
  const offset = p == 1 ? 0 : (p-1) * 20
  try {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=20`);

    return res.data.results;
  } catch (error) {
    console.error(error);
  }
};

const Pokedex = () => {
  const { user } = useContext(UserContext);
  const [pokemons, setPokemons] = useState([]);
  const [pokeSearch, setPokeSearch] = useState("");
  const [page, setPage] = useState(1)

  const pagination = [];
  for (let i = 1; i <= 60; i++) { 
      pagination.push(<button key={i} className='p-2 mx-2 m-1 px-6 max-w-[60px] min-w-[60px] min-h-[30px] flex justify-center hover:bg-red-400 bg-red-600 rounded-xl font-bold text-white text-xl transition-all duration-300' onClick={() => setPage(i)}>{i}</button>);
  }

  const loadAllpokemons = async () => {
    const allPokemons = await getAllPokemons(page);
    setPokemons(allPokemons);
  };

  useEffect(() => {
    loadAllpokemons(); 
  }, [page]);

  return (
    <div className="w-full h-full">
      <header>
        <div className='bg-red-600 w-full p-8'>
          <img src="/pokedex.png" alt="Pokedex" className='absolute w-[300px] mt-[-1%]' />
        </div>
        <div className='bg-black w-full p-4'> </div>
      </header>
      <p className='p-5'>
        <span className="text-red-500 font-semibold"> Bienvenido {user}, </span> a continuación podrás ver todos los pokemones en tu Pokedex
      </p>
      <div className='p-5 flex justify-center'>
        <button className='p-2 px-5 mx-2 = rounded-xl font-bold text-white text-xl transition-all duration-300 hover:bg-red-400 bg-red-600' onClick={() => page > 1 && setPage(page - 1)}>&lt;</button>
        {pagination.filter((_, id) =>( id >= page - 2 && id <= page ))}
        <button className='p-2 px-5 mx-2 hover:bg-red-400 bg-red-600 rounded-xl font-bold text-white text-xl transition-all duration-300' onClick={() => page < 60 && setPage(page + 1)}>&gt;</button>
      </div>

      <div>
        <select>

        </select>
        <input type="text" value={pokeSearch} onChange={e => setPokeSearch(e.target.value)} className='border-2 border-slate-500 rounded-full p-3 text-gray-700 font-semibold placeholder-red-400 min-w-[400px]' placeholder='Buscar un pokemón'>
          
        </input>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 p-5">
        {pokemons.map(pokemon => <PokemonCard key={pokemon.url} pokemonData={pokemon} />)}
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