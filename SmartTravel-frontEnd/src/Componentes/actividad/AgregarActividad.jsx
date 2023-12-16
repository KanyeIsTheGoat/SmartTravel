import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";




export const AgregarActividad = () => {

    const [nombre_actividad, setNombreAct] = useState('')
    const [fecha, setFecha] = useState('')
    const [lugar, setLugar] = useState('')
    const [actividades, setActividades] = useState([])
    const viajeId = sessionStorage.getItem("viajeId")

    const navigate = useNavigate();
    const location = useLocation(); 


    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!nombre_actividad || !fecha || !lugar ) {
          alert('Por favor, completa todos los campos');
          return;
        }
      
        const nuevaActividad = { nombreActividad:nombre_actividad, fecha, lugar, viajeId};
        setActividades([...actividades, nuevaActividad]);
        setNombreAct('');
        setFecha('');
        setLugar('');
        
        console.log(nuevaActividad)

        

        try {         
            await axios.post('http://localhost:8080/actividad', nuevaActividad);
            console.log('Datos enviados correctamente');
        } catch (error) {
            console.error('Error al enviar datos:', error);
        }

        navigate("/Actividades", { state: location.state })
      };

  return (
    <div>

<header className="header-actividades">
      <Link to="/Actividades">
        <a href="/" className="go-back"><i className='bx bx-chevron-left'></i></a>
      </Link>
      <a href="/Home" className="miembros">Actividades</a>
      <a href="/Home" className="icon"></a>
    </header>

    <section className="lista-documentos" id="section-a">

    <div className="container-docs">
      <div className="container-label">
        
        

        <form onSubmit={handleSubmit}>
            
        <div className="container-label">

            <label>Nombre de la Actividad</label>

            <input type="text" placeholder="" value={nombre_actividad} onChange={(e) => setNombreAct(e.target.value)}/>

            </div>

            <div className="container-label">

            <label>Fecha de la Actividad</label>

            <input type="date" placeholder="yyyy-mm-dd"  value={fecha} onChange={(e) => setFecha(e.target.value)}/>

            </div>
            <div className="container-label">
            
            <label>Lugar de la Actividad</label>

            <input type="text" placeholder=""  value={lugar} onChange={(e) => setLugar(e.target.value)}/>

            </div>

            

            <button type="submit" className='add-actividad-btn'>Agregar Actividad</button>

            
        </form>

</div>
</div>
        
        </section>
    </div>
    
  )
}
