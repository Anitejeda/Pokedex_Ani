'react-router-dom'
PokedexLayout;
import { createBrowserRouter } from 'react-router-dom';
import PokedexLayout from './components/PokedexLayout';
import Home from './views/Home';
import Pokedex from './views/Pokedex';
import PokemonDetail from './views/PokemonDetail';
import ProtectedRoute from './components/ProtectedRoute'


export const router = createBrowserRouter ([
{
    path: '/',
    element: <Home />,
},
{
    path: '/pokedex',
    element: <PokedexLayout/>,
    children: [
        {
            path: ':id',
            element: 
            <ProtectedRoute> 
                <PokemonDetail/> 
            </ProtectedRoute>
        },
        {
            path: '',
            element: (
            <ProtectedRoute> 
                <Pokedex/> 
            </ProtectedRoute>
            ),
        },
    ],
},
]);


