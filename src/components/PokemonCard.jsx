import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { typeColor } from '../services/typeColor';

const getPokemonById = async (url) => {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

const PokemonCard = ({ pokemonData }) => {
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState(null);
  const loadPokemon = async () => {
    const pokemonInfo = await getPokemonById(pokemonData.url);
    setPokemon(pokemonInfo);
  }; 

  const handlerClickNavigate = () => {
    navigate(`/pokedex/${pokemon.id}`);
  };
  useEffect(() => {

    loadPokemon();
  }, []);

  return (
    <>
      {pokemon && (
        <article onClick={handlerClickNavigate} className={`shadow-xl rounded-xl ${typeColor[pokemon.types[0].type.name]} flex flex-row w-full overflow-hidden hover:opacity-90 transition-all duration-300 cursor-pointer`}>
          <section className='p-4 flex-initial w-[75%] select-none z-10'>
            <h2 className="text-2xl font-semibold capitalize text-white pb-4">{pokemon.name}</h2> 
            <section className='flex gap-2 bg-[#ffffff55] rounded-full text-center mb-1 break-words w-fit'>
              <p className='ml-2 font-semibold text-white'>Tipo:</p>
              <p className='capitalize text-white mr-3'>{pokemon.types.map(({type}) => `|${type.name}|`)}</p>
            </section>
 
            <section className=''>
              {pokemon.stats.map((stat) => (
                <section key={stat.stat.name} className='flex gap-2 bg-[#ffffff55] rounded-full text-center mb-1 items-center justify-center break-words w-fit'>
                  <h3 className='ml-2 capitalize text-white font-semibold'>{stat.stat.name}:</h3>
                  <p className='text-white mr-2'>{stat.base_stat}</p>
                </section>
              ))}
            </section>
          </section> 
          <header className='w-[40%] justify-between relative'> 
              <img src="/pokeball.png" className='absolute bottom-[3%] right-[-80%] min-w-[400px] z-0 opacity-30'/>
              <img src={ pokemon.sprites.other['dream_world'].front_default ?? pokemon.sprites.other['official-artwork'].front_default ?? pokemon.sprites.front_default } alt={pokemon.name} className='absolute bottom-[30%] right-[30%] min-h-[120px] max-h-[120px] min-w-[120px]'/> 
          </header>
        </article>
      )}
    </>
  );
};

export default PokemonCard;