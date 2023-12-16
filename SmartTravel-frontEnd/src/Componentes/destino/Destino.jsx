import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../Styles/destino.css';

export const Destino = () => {
  const [ciudadDestino, setCiudadDestino] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');

  const [viaje, setViaje] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar campos
    if (!ciudadDestino || !fechaInicio || !fechaFin) {
      alert('Por favor, completa todos los campos');
      return;
    }

    const nuevoViaje = { ciudadDestino, fechaInicio, fechaFin };
    setViaje([...viaje, nuevoViaje]);

    try {
      await axios.post('http://localhost:8080/destino', {
        ciudadDestino,
        fechaInicio,
        fechaFin,
        viajeId: sessionStorage.getItem('viajeId'),
      });
      console.log('Datos enviados correctamente');
    } catch (error) {
      console.error('Error al enviar datos:', error);
    }

    // Limpiar campos después del envío exitoso
    setCiudadDestino('');
    setFechaInicio('');
    setFechaFin('');
  };

  return (
    <div>
      <header className="header-documentos">
      <Link to="/Destino">
        <a href="/" className="go-back"><i className='bx bx-chevron-left'></i></a>
      </Link>
      <a href="/Home" className="documentos">Destinos</a>
      <a href="/Home" className="icon"></a>
    </header>

      <section className="lista-miembros2" id="section-a">
        <div className="form1-destinos">
          <form onSubmit={handleSubmit}>
            <p className="p-style1">Ciudad Destino</p>
            <input
              type="text"
              placeholder=""
              value={ciudadDestino}
              onChange={(e) => setCiudadDestino(e.target.value)}
            />

            <p className="p-style">Fecha de Inicio</p>
            <input
              type="date"
              placeholder="yyyy-mm-dd"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
            />

            <p className="p-style">Fecha de Finalizacion</p>
            <input
              type="date"
              placeholder="yyyy-mm-dd"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
            />

            <br></br>

            <button type="submit" className='add-destino'>
              Confirmar destino
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};
