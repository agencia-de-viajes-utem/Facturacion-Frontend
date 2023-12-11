import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const withAuth = (WrappedComponent, loginURL) => {
    return props => {
        const token = Cookies.get('token');
        if (!token) {
            // Redirige a una URL externa
            window.location.href = loginURL;
            return null; // Retorna null mientras se redirige
        }
        // Renderiza el componente si está autenticado
        return <WrappedComponent {...props} />;
    };
};


export default withAuth;
