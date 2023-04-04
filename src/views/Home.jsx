import React, { useContext, useState } from 'react';
import { Navigate } from 'react-router';
import UserContext from '../contexts/UserProvider';

const Home = () => {
  const [nameValue, setNameValue] = useState('');
  const [nameError, setNameError] = useState(null);
  const { user, setUser } = useContext(UserContext);
 
  const handleChange = (e) => { 
    setNameValue(e.target.value)
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nameError) setUser(nameValue);
  };

  return (
    <div className='min-h-screen'> 
      <div className='w-full flex justify-center'>
        <img src="/pokedex.png" alt="Pokedex" className='p-10 w-[80%] justify-center' /> 
      </div>
      <div className="text-center">
        <h1 className="text-red-500 text-4xl font-bold pb-4">¡Hola Entrenador!</h1>
        <p>Escribe tu nombre para empezar</p>
      </div>
      <form
        className="flex flex-row justify-center items-center mt-8"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className="shadow-md border border-black p-3 rounded-l-lg focus:outline-none focus:border-red-500 font-semibold"
          value={nameValue}
          onChange={handleChange}
        />
        <button type="submit" className="bg-red-500 text-white font-bold p-[13.26px] rounded-r-lg">
          Start
        </button>
      </form>
      {nameError && <p className="text-red-500 text-center">{nameError}</p>}
      {user && <Navigate to="/pokedex" />}

    </div>
   );
  };

export default Home;