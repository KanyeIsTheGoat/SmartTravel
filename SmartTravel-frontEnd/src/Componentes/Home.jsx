import { NavLink, Route, Routes, useNavigate } from "react-router-dom"
import React, { useEffect, useState } from "react"
import FadeLoader from "react-spinners/FadeLoader";
import axios from "axios";
import '../Styles/home.css';

export const Home = () => {
  const [destino, setDestino] = useState('')
  const [fecha, setFecha] = useState('')
  const [nombreViaje, setNombreViaje] = useState('')
  const [url, setUrl] = useState();
  let [loading, setLoading] = useState(true);

  const nav = useNavigate()

  useEffect(() => {
    getNombreViaje();
    getDestinoFinal();
    getDiasFinal();
  },[])

  const getDestinoFinal = async () =>{
    try{
      const response = await axios.get(`http://localhost:8080/destino/destinoFinal/${sessionStorage.getItem("viajeId")}`);
      setDestino(response.data)
    }
    catch (error) {
      console.error('Error al obtener Actividades:', error);
    }
  }

  const getDiasFinal = async () => {
    try{
      const response = await axios.get(`http://localhost:8080/destino/diasFinal/${sessionStorage.getItem("viajeId")}`);
      setFecha(response.data);
    }catch (error) {
      console.error('Error al obtener Actividades:', error);
    }
  }

  const getNombreViaje = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/viaje/${sessionStorage.getItem("viajeId")}`)
      setNombreViaje(response.data.nombreViaje)
      getUrlFoto(response.data.nombreViaje)
    } catch (error) {
      console.error('Error al obtener Viaje:', error);
    }
  }

  const getFecha = (fecha) =>{
      if(fecha === null || fecha === 0 || fecha === undefined){
          return null
      }

      const date = new Date(fecha + (1 * 24 * 60 * 60 * 1000))
      
      return date.toLocaleDateString();
  }

  const getUrlFoto = async (nombreViaje) => {
    setLoading(true)
    try {   
        const response = await axios.get(`https://api.unsplash.com/search/photos/?client_id=MF1mlcyitmooD3KORl1zF4Iq08nU7m5ZgREzYyK_beQ&query=${nombreViaje}`)
        setUrl(response.data.results[0].urls.small_s3)
        setLoading(false)
    } catch (error) {
        console.log("ERROR AL BUSCAR LA IMG", error)
        setUrl("/public/photo4jpg.jpg")
        setLoading(false)
    }
  }

  const handleCambiarViaje = () => {
      nav("/ActualizarViaje")
  }

  return (

    <div>
      <section className="second-section" id="section-b">
        <header className="home-header">
          <NavLink to="/Viaje">
            <a href="/Viaje" className="go-back-home"><i className='bx bx-chevron-left'></i></a>
          </NavLink>
          <a className="viaje">SmartTravel</a>
          <a className="icon"></a>
        </header>
        <div type="button" onClick={handleCambiarViaje}>
          {loading && <div className='loader-home'><FadeLoader color="#D0CBFF" /></div>}
          {!loading && <img src={url} alt="Imagen"/>}
        </div>
      </section> 


      <section className="first-section" id="section-a">
        <div className="container-section1">
          <p className="resumen">Resumen</p>
        
          <h1 className="h1">{nombreViaje}</h1>
          <div className="flex">
            <p className="destino">Destino: {destino}</p>
            <p className="fecha">Fecha: {getFecha(fecha.fechaInicio)} - {getFecha(fecha.fechaFin)}</p>
          </div>

  
          <div className="container-box">
            
            <div className="box" type="button" onClick={() => nav("/Destino")}>
              <img src="public/sonar-montanasjpg.webp" alt="Imagen" />
              <p>Destinos</p>
            </div>
            
            <div className="box" type="button" onClick={() => nav("/Documentos")}>
              <img src="public/project-documents.jpg" alt="Imagen" />
              <p>Documentos</p>
            </div>

            <div className="box" type="button" onClick={() => nav("/Actividades")}>
              <img src="public/descarga (1).jpeg" alt="Imagen" />
              <p>Actividades</p>
            </div>
          
          </div>

          <NavLink to="/Miembros">
            <div className="usuarios">
                <p>Miembros</p>
            </div>
          </NavLink>
          <NavLink to="/Gastos">
            <div className="gastos">
              <p>Gastos</p>
            </div>
          </NavLink>
        </div>
      </section>
    </div>
  )
}
