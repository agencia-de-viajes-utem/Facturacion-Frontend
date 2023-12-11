import React, { useState, useEffect } from 'react';
import './totalDeVuelo.css';
import { GiCommercialAirplane } from 'react-icons/gi';
import { FaFileInvoiceDollar } from 'react-icons/fa';

export default function TotalDeVuelo({ detalleJson, selectedServices, onTotalPriceChange }) {
    const {
        DetalleHotel,
        DetallePaquete,
        DetalleReserva,
        DetalleHabitacion
    } = detalleJson;

    const initialTotalServicios = selectedServices.reduce((acc, service) => acc + service.precio, 0);
    const basePrice = DetallePaquete.OfertaVuelo > 0 ? DetallePaquete.PrecioOferta : DetallePaquete.PrecioVuelo;

    // State for total price
    const [totalPrice, setTotalPrice] = useState(basePrice + initialTotalServicios);

    useEffect(() => {
        // Calcula el nuevo total y luego invoca la función del padre
        const newTotalServicios = selectedServices.reduce((acc, service) => acc + service.precio, 0);
        const newTotalPrice = basePrice + newTotalServicios;
        setTotalPrice(newTotalPrice);

        // Aquí invocas la función pasada por el padre para actualizar el precio total
        onTotalPriceChange(newTotalPrice);
    }, [selectedServices, basePrice, onTotalPriceChange]);

    return (
        <div className="box">

            <div className="mx-3 my-3 d-flex flex-row justify-content-between">
                <p className='title-text txt-color' style={{ fontSize: '22px', fontFamily: 'Arial, sans-serif' }}>Paquete de {DetallePaquete.TotalPersonas} persona/s</p>
                <p className='h3 fw-bold' style={{ color: 'white', fontFamily: 'Arial, sans-serif' }}> CLP ${basePrice.toLocaleString()}</p>
            </div>
            <div className="serviciosAdicionales text-start px-3 h4 d-flex flex-column"
                style={{ visibility: selectedServices.length > 0 ? 'visible' : 'hidden' }}>
                <p className='h5 fw-bold text-nowrap text-truncate' style={{ color: 'white', fontSize: '22px', fontFamily: 'Arial, sans-serif' }} >Servicios adicionales:</p>
                {selectedServices.map((servicio) => (
                    <div key={servicio.id} className="d-flex text-start flex-row justify-content-between align-items-center">
                        <ul>
                            <li className='h5 fw-bold'style={{ color: 'white', fontSize: '20px', fontFamily: 'Arial, sans-serif' }}>{servicio.nombre}</li>
                        </ul>
                        <p className='fw-bold' style={{ color: 'white', fontSize: '24px', fontFamily: 'Arial, sans-serif' }}>CLP ${servicio.precio.toLocaleString()}</p>
                    </div>
                ))}
            </div>
            <div className="mx-3 my-2 d-flex flex-row justify-content-between"
                style={{ visibility: selectedServices.length > 0 ? 'visible' : 'hidden' }}>
                <p className='h6 fw-bold text-nowrap text-truncate' style={{ color: 'white', fontSize: '18px', fontFamily: 'Arial, sans-serif'}}>Total Servicios Adicionales</p>
                <p className='h3 fw-bold' style={{ color: 'white', fontFamily: 'Arial, sans-serif' }}> CLP ${initialTotalServicios.toLocaleString()}</p>
            </div>

            {/* Placeholder text is always rendered, but its visibility is toggled */}
            <div className="mx-3 my-2" style={{ visibility: selectedServices.length === 0 ? 'visible' : 'hidden' }}>
                <p className="fw-bold" style={{ color: 'white', fontFamily: 'Arial, sans-serif', fontSize: '18px'}}>No se han agregado servicios adicionales</p>
            </div>
            <div className="d-flex flex-row gap-1 totalVueloTitulo px-2 py-2 justify-content-between">
                <div className="d-flex flex-column">
                    <div className="d-flex flex-row">
                        <FaFileInvoiceDollar className="mx-2" style={{ width: '2em', height: '2em' }} />
                        <p className='txt select h2 fw-bold' style={{ color: 'white' }}>Total de Vuelo</p>
                    </div>
                    <p className='h3 fw-bold mx-2' style={{ color: 'white' }}>CLP ${totalPrice.toLocaleString()}</p>
                </div>
                <GiCommercialAirplane size={48} />
            </div>
        </div>
    );
}
