import React, { useState } from 'react';
import './detalleHospedaje.css';
import { LuHotel } from 'react-icons/lu';

import { renderStars, renderServiceIcons, formatearFecha, calcularDiasEntreFechas } from '../../utils';

export default function DetalleHospedaje({ detalleJson }) {
  const {
    DetalleHotel,
    DetallePaquete,
    DetalleReserva,
    DetalleHabitacion
  } = detalleJson;

  const cantDias = calcularDiasEntreFechas(DetallePaquete.FechaInicio, DetallePaquete.FechaFin);
  const cantNoches = cantDias - 1;

  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className={`box ${isChecked ? 'boxReady' : ''}`}>
      <div className="checked">
        <img src="/checked.svg" alt="" />
      </div>
      <div className="d-flex flex-row gap-1 detallePasajeroTitle mt-3 mx-3">
        <LuHotel className="" style={{ width: '3em', height: '3em' }} />
        <p
          className='text-center d-flex justify-content-center align-items-center title-text'
          style={{ fontSize: '24px', fontFamily: 'Arial, sans-serif' }}
        >
          Detalles del Hospedaje
        </p>
      </div>
      <div className="detalleHotelContent d-flex flex-column mt-3 mx-4 text-light">
        <p className='h3 fw-bold title-text'  style={{ fontSize: '24px', fontFamily: 'Arial, sans-serif' }} > {DetalleHotel.NombreHotel} </p>
        <div className="Estrellas h2 d-flex justify-content-start title-text">
          {renderStars(DetalleHotel.ValoracionHotel)}
        </div>
        <div className="h2 d-flex justify-content-start -flex-row gap-2">
          <p className='h2 fw-bold title-text'  style={{ fontSize: '24px', fontFamily: 'Arial, sans-serif' }}>Servicios del Hotel</p>
          <div style={{ marginLeft: 'auto' }}></div>
          {renderServiceIcons(DetalleHotel.ServiciosHotel)}
        </div>
        <div className="h3 d-flex flex-row gap-2 py-1 justify-content-between">
          <p className='py-1 fw-bold'  style={{ fontSize: '24px', fontFamily: 'Arial, sans-serif' }}> Check-in </p>
          <p className='text-dark hotel__field py-1 px-3' style={{ fontSize: '24px', fontFamily: 'Arial, sans-serif' }} > {formatearFecha(DetallePaquete.FechaInicio)}</p>
        </div>
        <div className="h3 d-flex flex-row gap-2 py-1 justify-content-between">
          <p className='py-1 fw-bold'style={{ fontSize: '24px', fontFamily: 'Arial, sans-serif' }} > Check-out </p>
          <p className='text-dark hotel__field py-1 px-3' style={{ fontSize: '24px', fontFamily: 'Arial, sans-serif' }} > {formatearFecha(DetallePaquete.FechaFin)}</p>
        </div>
        <div className="text-dark hotel__field d-flex justify-content-center h3 fw-bold" style={{ fontSize: '24px', fontFamily: 'Arial, sans-serif' }} >
          <p> {cantDias} días /</p>
          <p> {cantNoches} noches</p>
        </div>
        <div className="text-dark hotel__field px-3 pt-3 h3 d-flex flex-row gap-2 py-1 justify-content-around fw-bold" style={{ fontSize: '24px', fontFamily: 'Arial, sans-serif' }} >
          <p> Cant. Personas </p>
          <p> {DetallePaquete.TotalPersonas} </p>
        </div>
      </div>
    </div>
  );
}
