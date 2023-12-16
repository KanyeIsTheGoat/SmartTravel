import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../Styles/miembros.css';

export const Miembros = () => {
  const [miembros, setMiembros] = useState([]);

  useEffect(() => {
    obtenerMiembros();
  }, []); 

  const obtenerMiembros = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/miembro/viaje/${sessionStorage.getItem("viajeId")}`);
      setMiembros(response.data);
      console.log('Miembros obtenidos correctamente:', response.data);
    } catch (error) {
      console.error('Error al obtener miembros:', error);
    }
  };

  const handleEliminarMiembro = async (miembroId) => {
    console.log(miembroId);
    try {
      await axios.delete(`http://localhost:8080/miembro/${miembroId}`);
      console.log('Miembro eliminado correctamente');
      // Actualiza el estado después de la eliminación
      obtenerMiembros();
    } catch (error) {
      console.error('Error al eliminar miembro:', error);
    }
  };

  return (
    <div>
      <header className="header-miembros">
        <Link to="/Home">
            <a href="/" className="go-back"><i className='bx bx-chevron-left'></i></a>
        </Link>
        <a href="/Home" className="miembros">Miembros</a>
        <a href="/Home" className="icon"></a>
      </header>

      <section className="lista-miembros" id="section-a">
        <h1 className="title-miembros">Lista de miembros</h1>
        <table className="tablaMiembros">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Balance</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {miembros.map((miembro) => (
              <tr key={miembro.miembroId}>
                <td>{miembro.nombre}</td>
                <td>{miembro.balance}$</td>
                <td>
                  <button className="eliminar-miembro" onClick={() => handleEliminarMiembro(miembro.miembroId)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Link to="/AgregarMiembro" className="link-miembros">
          <div className="add-miembro">
            <p>Añadir Miembro</p>
          </div>
        </Link>

        <Link to="/Miembros/Encuestas">
          <button className="add-miembro">Ver Encuestas</button>
        </Link>
      </section>
    </div>
  );
};