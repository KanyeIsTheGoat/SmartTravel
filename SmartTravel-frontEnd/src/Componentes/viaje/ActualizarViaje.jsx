import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const ActualizarViaje = () => {
    const [nombre, setNombre] = useState('')
    const [viaje, setViaje] = useState()
    const nav = useNavigate()

    useEffect(() => {
        getViaje();
    },[])

    const getViaje = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/viaje/${sessionStorage.getItem("viajeId")}`)
            setViaje(response.data)
            setNombre(response.data.nombreViaje)
        } catch (error) {
            console.log("Error", error)
        }
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            const body = {
                nombreViaje:nombre,
                idUsuario:sessionStorage.getItem("usuarioId"),
                viajeId:sessionStorage.getItem("viajeId")
            }
            const response = await axios.put(`http://localhost:8080/viaje/${sessionStorage.getItem("viajeId")}`, body)
            console.log("Se actualizo", response.data)
            nav("/Home")
        } catch (error) {
            console.log("Error al actualizar", error)            
        }
    }

    return ( 
        <div>
            <header className="home-header">
                <a href="/Home" className="go-back-home"><i className='bx bx-chevron-left'></i></a>
                <a className="viaje">SmartTravel</a>
                <a className="icon"></a>
            </header>

            <section className="lista-miembros2" id="section-a">
                <div className="form1-destinos">
                    <form onSubmit={handleSubmit}>
                        <p className="p-style2">Nombre del Viaje</p>
                        <input type="text" id="nombre" name="nombre" placeholder=""  value={nombre} onChange={(e) => setNombre(e.target.value)} required></input>
                        
                        <button type='submit' className='add-actividad'>Actualizar Viaje</button>
                    </form>
                </div>
            </section>
        </div>
    );
}
 
