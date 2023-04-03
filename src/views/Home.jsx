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
    <div> 
      <img src="/pokedex.png" alt="Pokedex" /> 
      <div className="text-center">
        <h1 className="text-red-500 text-4xl font-bold">¡Hello Trainer!</h1>
        <p>Type your name to start</p>
      </div>
      <form
        className="flex flex-row justify-center items-center mt-8"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className="shadow-md border border-black p-3"
          value={nameValue}
          onChange={handleChange}
        />
        <button type="submit" className="bg-red-500 text-white font-bold p-3">
          Start
        </button>
      </form>
      {nameError && <p className="text-red-500 text-center">{nameError}</p>}
      {user && <Navigate to="/pokedex" />}

    </div>
   );
  };

export default Home;