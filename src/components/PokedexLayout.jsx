import React from "react";
import { Outlet } from "react-router-dom";

const PokedexLayout = () => {
    return (
        <div> 
            <Outlet/> 
        </div>
    );
};

export default PokedexLayout;
