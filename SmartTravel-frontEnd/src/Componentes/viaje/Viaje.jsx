import { NavLink, Route, Routes, useNavigate } from "react-router-dom"
import React, { useEffect, useState } from "react"
import axios from "axios";
import '../../Styles/home.css';

export const Viaje = () => {
    const [viajes, setViaje] = useState([])
    const nav = useNavigate()

    useEffect(()=>{
        obtenerViaje();
    },[])

    const obtenerViaje = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/viaje/usuario/${sessionStorage.getItem("usuarioId")}`)
            setViaje(response.data)
            console.log("Se buscaron los viajes", response.data)
        } catch (error) {
            console.log("ERROR AL BUSCAR LOS VIAJES")            
        }        
    }

    const handleClick = (id) => {
        sessionStorage.setItem("viajeId", id)    
        nav("/Home")
    }

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8080/viaje/${id}`)
            window.location.reload(true)
        } catch (error) {
            console.log("ERROR", error)
        }
    }

    const handleLogout = () => {
        sessionStorage.removeItem("viajeId");
        sessionStorage.removeItem("usuarioId");
        nav("/Login");
    }

    return (

        <div>
          
            <header className="viaje-header">
              <a href="/Viaje" className="viaje2">SmartTravel</a>
              <button className="logout-button" onClick={handleLogout}>
                    <i className='bx bx-log-out'></i>
                </button>
            </header>

            <div className="container-content">
                <p>Mis viajes</p>
            </div>

            <div className="container-box-viaje">

                {viajes.map((viaje) => (  
                    <div className="box-viaje" key={viaje.viajeId} >
                        <img src="public/sonar-montanasjpg.webp" alt="Imagen" type="button" onClick={() => handleClick(viaje.viajeId)}/>
                        <table className="tableViaje">
                            <tr className="trViaje">
                                <td><p className="tituloViaje" type="button" onClick={() => handleClick(viaje.viajeId)}>{viaje.nombreViaje}</p></td>
                                <td><button className="delete" type="button" onClick={() => handleDelete(viaje.viajeId)}><i class='bx bx-trash-alt'></i></button></td>
                            </tr>
                        </table>
                        {/* <p>{viaje.nombreViaje}</p> */}
                    </div> 
                ))} 

                <NavLink to="/AgregarViaje">
                <div className="agregar-viaje">
                    <p className="letra-viaje">Agregar Viaje </p>
                </div>
                </NavLink>
            </div>
        </div>
    )
}
