import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../../Styles/agregarMiembro.css';
import axios from "axios";


export const VerEncuestas = () => {
    const [encuestas, setEncuestas] = useState([])

    useEffect(() => {
        obtenerEncuestas()
    },[])

    const obtenerEncuestas = async () => {
        try{
            const response = await axios.get(`http://localhost:8080/encuestas/viaje/${sessionStorage.getItem("viajeId")}`)
            setEncuestas(response.data)
        }
        catch(error){
            console.log(error)
        }
    }   

    const handleEliminarEncuesta = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8080/encuestas/${id}`)
            window.location.reload(true)
        } catch (error) {
            
        }
    }

    const handleUrlEncuesta = async (formsId) => {
        try {
            const response = await axios.get(`http://localhost:8080/encuestas/url/${formsId}`)
            window.alert(response.data)
        } catch (error) {
            console.log("Error buscando el url", error)
        }
    }

    const handleRespuestasEncuesta = async (formsId) => {
        try {
            const response = await axios.get(`http://localhost:8080/encuestas/rtas/${formsId}`)
            console.log(response.status)
            var final = ''

            if(response.status === 200){
                const dic = response.data
                const llaves =  Object.keys(dic)
                final = []
                var respuesta

                llaves.map((llave) => {
                    respuesta = llave.slice(3)    
                    final.push(respuesta + " : " + dic[llave] + "\n") 
                })
                
                window.alert(final)
            }
            if(response.status === 204){
                window.alert("No hay respuestas todavia") 
            }
        } catch (error) {
            console.log("Error buscando el url", error)
        }
    }
    
    return ( 
        <div>
            <header className="header-encuestas">
                <a href="/Miembros" className="go-back"><i className='bx bx-chevron-left'></i></a>
                <a href="/Home" className="encuestas">Encuestas</a>
                <a href="/Home" className="icon"></a>
            </header>

            <section className="lista-miembros" id="section-a">
                <h1 className="title-miembros">Lista de Encuestas</h1>
                {encuestas.map((encuesta) => (
                <div className="container-miembros" key={encuesta.encuestaId}>
                    <p className="member-miembros">{encuesta.pregunta}</p>
                    <button className="eliminar-miembro"  onClick={() => handleUrlEncuesta(encuesta.fomsId)}><i class='bx bx-link'></i></button>
                    <button className="eliminar-miembro"  onClick={() => handleRespuestasEncuesta(encuesta.fomsId)}>Respuestas</button>
                    <button className="eliminar-miembro"  onClick={() => handleEliminarEncuesta(encuesta.encuestaId)}>Eliminar</button>
                </div>
                ))}

                <Link to="/Miembros/CrearEncuesta">
                    <button className="add-miembro">Crear Encuesta</button>
                </Link>

            </section>
        </div>
    );
};
 
