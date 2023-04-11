import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../contexts/UserProvider'; 
import PokemonCard from '../components/PokemonCard';
import { usePagination } from '../hooks/usePagination'
import { typeColor } from '../services/typeColor';
import { Form, useLoaderData } from 'react-router-dom';


const Pokedex = () => {
  const { user } = useContext(UserContext);
  const { pokemons, types } = useLoaderData()
  const pokemonsPagination = usePagination(pokemons, 50); 
  const [pokeSearch, setPokeSearch] = useState("");
  const [pokeType, setPokeType] = useState(""); 

  const handleSearchChange = (e) => {
    setPokeSearch(e.target.value)
    setPokeType("")
  }

  const handleTypeChange = (e) => {
    setPokeType(e.target.value)
    setPokeSearch("")
  }
  
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

      <Form className='mb-10 mx-10'> 
        <h3 className='text-red-600 font-semibold'>Filter for Search</h3> 
        <input type="text" value={pokeSearch} name='pokemon_name' onChange={e => handleSearchChange(e)} placeholder='Buscar un pokemón' className='text-gray-700 font-semibold placeholder-red-400 p-3 outline-none text-center border-2 border-slate-500 rounded-full min-w-[400px] mb-2'/> 
        <select name='pokemon_type' value={pokeType} className={`border-2 border-slate-500 rounded-full p-3 text-gray-700 font-semibold placeholder-red-400 min-w-[400px] capitalize text-center ${typeColor[pokeType]} ${pokeType === "normal" ? "" : pokeType == "flying" ? "" : pokeType == "" ? "" : "text-white"} lg:ml-10`} onChange={e => handleTypeChange(e)}> 
          <option className='text-gray-800' value={""}>
            Selecciona un Tipo
          </option>
          <option className={`${typeColor['normal']} text-gray-800`}>
            normal
          </option>
          <option className={`${typeColor['fighting']} text-white`}>
            fighting
          </option>
          <option className={`${typeColor['flying']} text-gray-800`}>
            flying
          </option>
          <option className={`${typeColor['posion']} text-white`}>
            posion
          </option>
          <option className={`${typeColor['ground']} text-white`}>
            ground
          </option>
          <option className={`${typeColor['rock']} text-white`}>
            rock
          </option>
          <option className={`${typeColor['bug']} text-white`}>
            bug
          </option>
          <option className={`${typeColor['ghost']} text-white`}>
            ghost
          </option>
          <option className={`${typeColor['steel']} text-white`}>
            steel
          </option>
          <option className={`${typeColor['fire']} text-white`}>
            fire
          </option>
          <option className={`${typeColor['water']} text-white`}>
            water
          </option>
          <option className={`${typeColor['grass']} text-white`}>
            grass
          </option>
          <option className={`${typeColor['electric']} text-white`}>
            electric
          </option>
          <option className={`${typeColor['psychic']} text-white`}>
            psychic
          </option>
          <option className={`${typeColor['ice']} text-white`}>
            ice
          </option>
          <option className={`${typeColor['dragon']} text-white`}>
            dragon
          </option>
          <option className={`${typeColor['dark']} text-white`}>
            dark
          </option>
          <option className={`${typeColor['fairy']} text-white`}>
            fairy
          </option>
          <option className={`${typeColor['unknown']} text-white`}>
            unknown
          </option>
          <option className={`${typeColor['shadow']} text-white`}>
            shadow
          </option> 
        </select>  
        <button type="submit" className='bg-red-500 text-white p-2 hover:bg-red-300 rounded-xl ml-3'>Search</button>
      </Form>

      <div className='flex flex-row gap-2 justify-center'>
        <button  className={`bg-red-500 hover:bg-red-300 rounded-xl text-white p-2 px-3 min-w-[41.25px]`} onClick={() => pokemonsPagination.previousPage()}>&lt;</button>
        {pokemonsPagination.pages.filter(page => (page <= (pokemonsPagination.currentPage + 2)) && page >= (pokemonsPagination.currentPage - 2)).map(page => <button key={page} className={`${pokemonsPagination.currentPage == page ? "bg-red-700 hover:bg-red-400" : "bg-red-500 hover:bg-red-300"} rounded-xl text-white p-2 px-3 min-w-[41.25px]`} onClick={() => pokemonsPagination.changePageTo(page)}>{page}</button>)}
        <button className={`bg-red-500 hover:bg-red-300 rounded-xl text-white p-2 px-3 min-w-[41.25px]`} onClick={() => pokemonsPagination.nextPage()}>&gt;</button>
      </div>

      <section className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 p-5">
        {pokemonsPagination.listSlice.map(pokemon => <PokemonCard key={pokemon.url} pokemonData={pokemon} />)}
      </section> 
    </div>
  )
};

export default Pokedex;