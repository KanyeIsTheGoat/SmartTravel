import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";


export const AgregarGasto = () => {

    const [miembro, setMiembro] = useState('')
    const [motivo, setMotivo] = useState('')
    const [importe, setImporte] = useState('')
    const [gastos, setGastos] = useState([])

    const nav = useNavigate()

    const [usuarios, setUsuarios] = useState([]);

useEffect(() => {
  async function fetchUsuarios() {
    console.log(usuarios);
    try {
      const response = await axios.get(`http://localhost:8080/miembro/viaje/${sessionStorage.getItem("viajeId")}`);
      setUsuarios(response.data);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  }
  fetchUsuarios();
}, []);




const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!miembro || !motivo || !importe) {
      alert('Por favor, completa todos los campos');
      return;
    }    

    const nuevoGasto = { idComprador:miembro, nombreGasto:motivo, monto:importe, idViaje:sessionStorage.getItem("viajeId") };
    setGastos([...gastos, nuevoGasto]);
    setMiembro('');
    setMotivo('');
    setImporte('');
    
    try {
      await axios.post('http://localhost:8080/gasto', nuevoGasto);
      console.log('Datos enviados correctamente');
      nav("/Gastos")

    } catch (error) {
      console.error('Error al enviar datos:', error);
    }
  };
  



  return (
    <div>
        <header className="header-miembros">
      <Link to="/Gastos">
      <a href="/" className="go-back"><i className='bx bx-chevron-left'></i></a>
      </Link>
      <a href="/Home" className="miembros">Gastos</a>
      <a href="/Home" className="icon"></a>
    </header>
        
    <div className="container-docs">
      <div className="container-label">

        <form onSubmit={handleSubmit}>

        <div className="container-label">

            <label>Nombre del Miembro</label>
            

            <select className="select-miembro" name="miembro" placeholder="elegir.." value={miembro} onChange={(e) => setMiembro(e.target.value)}>
                <option value=''></option>
                {usuarios.map((usuario) => (
                  <option key={usuario.miembroId} value={usuario.miembroId}>
                    {usuario.nombre}
                  </option>
                ))}
            </select>




        </div>

        <div className="container-label">

            <label>Motivo</label>

            <input type="text" placeholder="Ingrese motivo"  value={motivo} onChange={(e) => setMotivo(e.target.value)}/>

        </div>

        <div className="container-label">

            <label>Importe</label>

            <input type="text" placeholder="Ingresa importe"  value={importe} onChange={(e) => setImporte(e.target.value)}/>

        </div>

            <button type="submit" className='add-destino '>Confirmar gasto</button>

        </form>

        </div>
        </div>

        

    </div>
  )
}
