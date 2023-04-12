import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { typeColor } from "../services/typeColor";

const PokemonById = async (id) => {
    try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`); 
        return res.data;
    }   catch (error) {
        console.error(error);
    }
};

const PokemonDetail = () => {
    const { id } = useParams();
    const [pokemon, setPokemon] = useState('')

    useEffect(() => {
        async function fetchData(){
            let p = await PokemonById(id)
            setPokemon(p) 
        }
        fetchData()
    }, [pokemon])
 

    return (
        <div className="bg-sky-200 min-h-screen">
            <div className="">
                <div className={`mx-32 lg:mx-[600px] rounded-md relative top-[300px] content-center rounded-b-none p-8 ${pokemon !== '' ? typeColor[pokemon.types[0].type.name] : ""} min-w-[200px]`}> 
                    <img src={pokemon !== '' ? pokemon.sprites.other['dream_world']['front_default'] : ''} className="absolute top-[-80px] max-w-[150px] md:right-[45%] md:left-[45%] left-[0%]"/>
                </div>  
                <div className="bg-white top-[300px] relative mx-32 lg:mx-[600px] rounded-b-lg p-5 min-w-[200px]">
                    <h3 className="text-slate-800 font-semibold text-center relative pt-2 text-lg top-0">#{id}</h3>
                    <h3 className="text-slate-800 capitalize font-semibold text-center relative pt-2 text-lg top-0  ">{pokemon.name}</h3>
                </div>
            </div>
        </div>
    );
};

export default PokemonDetail;