import Home from '../Pages/Home';
import Factura from '../Pages/Factura';

import withAuth from '../Components/withAuth'; // Importa el componente de envoltura

const loginURL = import.meta.env.VITE_FRONT_USUARIOS;



export const routes = [
    { path: "/", component: withAuth(Home, loginURL), text: "Home" },
    { path: "/factura", component: withAuth(Factura, loginURL), text: "ver-factura" },
];
