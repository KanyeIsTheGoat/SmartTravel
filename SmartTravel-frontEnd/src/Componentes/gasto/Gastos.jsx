import '../../Styles/gastos.css'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';



export const Gastos = () => {

  const [gastos, setGastos] = useState([]);

  useEffect(() => {
    obtenerGastos();
  }, []);

  const obtenerGastos = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/gasto/viaje/${sessionStorage.getItem("viajeId")}`);
      setGastos(response.data);
      console.log('Gastos obtenidos correctamente:', response.data);
    } catch (error) {
      console.error('Error al obtener gastos:', error);
    }

  };

  const handleEliminarGasto = async (id) =>{
    try {
      const response = await axios.delete(`http://localhost:8080/gasto/${id}`);
      console.log('Gasto eliminado correctamente:', response.data);
      window.location.reload(true)
    } catch (error) {
      console.error('Error al eliminar gasto:', error);
    }
  }

  return (
    <div>
    <header className="header-miembros">
      <a href="/Home" className="go-back"><i className='bx bx-chevron-left'></i></a>
      <a href="/Home" className="miembros">Gastos</a>
      <a href="/Home" className="icon"></a>
    </header>

    <section className="lista-miembros" id="section-a">
      <h1 className="title-miembros">Lista de gastos</h1>
      {gastos.map((gasto) => (
          <div className="container-miembros" key={gasto.id}>
            <p className="user-icon-miembros"><i class='bx bx-money'></i></p>
            <p className="member-miembros">{gasto.nombreGasto}</p>
            <p className="member-balance">{gasto.monto}$</p>
            <button className="eliminar-miembro" onClick={() => handleEliminarGasto(gasto.gastoID)}>Eliminar</button>
          </div>
        ))}

      

    <Link to="/AgregarGasto" className="link-miembros">
    <div className="add-miembro">

        <p>Añadir Gasto</p>

    </div>
    </Link>

    </section>

  </div>
  )
}

