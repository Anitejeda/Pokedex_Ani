import React from "react";
import { Outlet } from "react-router-dom";

const PokedexLayout = () => {
    return (
    <div>
        <Outlet />
        <h1> Pokedex Layout</h1>
    </div>
    );
};

export default PokedexLayout;
