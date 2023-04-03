import React, { useEffect, useState } from 'react';
import axios from 'axios';

const getPokemonById = async (url) => {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

const PokemonCard = ({ pokemonData }) => {
  const [pokemon, setPokemon] = useState(null);
  const loadPokemon = async () => {
    const pokemonInfo = await getPokemonById(pokemonData.url);
    setPokemon(pokemonInfo);
  }; 

  useEffect(() => {

    loadPokemon();
  }, []);

  return (
    <>
      {pokemon && (
        <article className='shadow-xl rounded-xl bg-red-500'>
          <header className='w-full justify-between'> 
              <img src={pokemon.sprites.front_default} alt={pokemon.name} /> 
          </header>

          <section>
            <section>
              <h2 className="text-2xl font-semibold">{pokemon.name}</h2>
              <p>{pokemon.types[0].type.name}</p>
              <p>Tipo</p>
            </section>
 
            <section>
              {pokemon.stats.map((stat) => (
                <section key={stat.stat.name}>
                  <h3>{stat.stat.name.toUpperCase()}</h3>
                  <p>{stat.base_stat}</p>
                </section>
              ))}
            </section>
          </section> 
        </article>
      )}
    </>
  );
};

export default PokemonCard;