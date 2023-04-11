import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../contexts/UserProvider'; 
import PokemonCard from '../components/PokemonCard';
import { usePagination } from '../hooks/usePagination'
import { getAllPokemons } from '../services/getAllPokemons';
import { typeColor } from '../services/typeColor';


const Pokedex = () => {
  const { user } = useContext(UserContext);
  const [pokemons, setPokemons] = useState([]);
  const [pokeSearch, setPokeSearch] = useState("");
  const [typeSelected, setTypeSelected] = useState(""); 

  const pokemonsPagination = usePagination(pokemons, 50); 
 
  const loadAllpokemons = async () => {
    const allPokemons = await getAllPokemons();
    setPokemons(allPokemons);
  };

  useEffect(() => {
    loadAllpokemons(); 
  }, [pokeSearch]);

  const handleSearch = (e) => {
    e.preventDefault()  
    setPokemons(pokemons.filter(pokemon => pokemon.name == pokeSearch.toLowerCase()))
  }

  const handleSelect = (e) => {

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

      <div className='lg:flex lg:justify-center lg:px-20 lg:gap-60 grid grid-cols-1 my-4 gap-4'>
        <select className={`border-2 border-slate-500 rounded-full p-3 text-gray-700 font-semibold placeholder-red-400 min-w-[400px] capitalize text-center ${typeColor[typeSelected]} ${typeSelected === "normal" ? "" : typeSelected == "flying" ? "" : typeSelected == "" ? "" : "text-white"}`} onClick={e => setTypeSelected(e.target.value)}> 
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
        <form onSubmit={e => handleSearch(e)} className=' border-2 border-slate-500 rounded-full p-3  min-w-[400px]'>
          <input type="text" value={pokeSearch} onChange={e => setPokeSearch(e.target.value)} placeholder='Buscar un pokemón' className='text-gray-700 font-semibold placeholder-red-400 w-full outline-none text-center'/>  
        </form>
      </div>

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