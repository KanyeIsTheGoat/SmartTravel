import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../Styles/actividades.css';

export const Actividades = () => {

  const [actividades, setActividades] = useState([]);

  useEffect(() => {
    obtenerActividades();
  }, []); 

  const obtenerActividades = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/actividad/viaje/${sessionStorage.getItem("viajeId")}`);
      setActividades(response.data);
      console.log('Actividades obtenidos correctamente:', response.data);
    } catch (error) {
      console.error('Error al obtener Actividades:', error);
    }
  };

  const buscarFecha = (fecha) =>{
    const date = new Date(fecha + (1 * 24 * 60 * 60 * 1000))
    
    return date.toLocaleDateString();
  }

  const eliminar = async (id) =>{
    try {
      const response = await axios.delete(`http://localhost:8080/actividad/${id}`);
      console.log('Se borro correctamente:', response.data);
      window.location.reload(true)
    } catch (error) {
      console.error('Error al borrar actividades:', error);
    }
};
  

  return (
    <div>
      <header className="header-actividades">
      <a href="/Home" className="go-back"><i className='bx bx-chevron-left'></i></a>
      <a href="/Home" className="miembros">Actividades</a>
      <a href="/Home" className="icon"></a>
    </header>

    <div className="fila">

      <table className="tablaActividades">

        <thead>
          <tr>
            <th>Actividad</th>
            <th>Fecha</th>
            <th>Lugar</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

        {actividades.map(actividad => (
          <tr key={actividad.actividadId}>
            <td>{actividad.nombreActividad}</td>
            <td>{buscarFecha(actividad.fecha)}</td>
            <td>{actividad.lugar}</td>

            <td>
              <button  className='eliminar-actividad' onClick={() => eliminar(actividad.actividadId)}>
                Eliminar
              </button>
            </td>
          </tr>
        ))}

        </tbody>

      </table>

    </div>


    <Link to="/AgregarActividad">
            <button className='add-actividad'>Agregar Actividad</button>
    </Link>
    </div>
  )
}
