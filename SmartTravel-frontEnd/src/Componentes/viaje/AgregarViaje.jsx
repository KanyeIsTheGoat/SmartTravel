import { NavLink, Route, Routes, useNavigate } from "react-router-dom"
import React, { useEffect, useState } from "react"
import axios from "axios";
import '../../Styles/home.css';

export const AgregarViaje = () => {
    const [nombre, setNombre] = useState('')
    const nav = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8080/viaje",{nombreViaje:nombre, idUsuario:sessionStorage.getItem("usuarioId")})
            nav("/Viaje")   
            console.log("Se creo nuevo viaje")
        } catch (error) {
            console.log("Error al crear viaje")
        }
    }

    return (

        <div>
          
            <header className="viaje-header2">
              <NavLink to="/Viaje">
                <a href="/" className="viaje3">SmartTravel</a>
              </NavLink>
            </header>

            <section className="lista-miembros2" id="section-a">
                <div className="form1-destinos">
                    <form onSubmit={handleSubmit}>
                        <p className="p-style2">Nombre del Viaje</p>
                        <input type="text" id="nombre" name="nombre" placeholder=""  value={nombre} onChange={(e) => setNombre(e.target.value)} required></input>
                        
                        <button type='submit' className='add-actividad'>Crear viaje</button>
                    </form>
                </div>
            </section>

        </div>
    )
}
