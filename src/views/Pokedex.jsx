import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../components/contexts/UserProvider';
import axios from 'axios';

const getAllPokemons = async () => { 
  try {
    const res = await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=300');

    return res.data;
  } catch (error ) {
    console.error(error);

  }
}

const Pokedex = () => {
  const { user } = useContext(UserContext);
  const [pokemons, setPokemons] = useState([]);

  
  const loadAllpokemons = async () => {
    const allPokemons = await getAllPokemons();

    console.log(allPokemons);
  };

  useEffect(() => {
    loadAllPokemons();
  }, []);

  return (
    <div className="w-full p-5">
      <p>
    <span className="text-red-500 font-semibold"> Bienvenido {user}, </span> aqui podras encontrar tu pokemon favorito
    </p>
  </div> 
);
};

export default Pokedex;