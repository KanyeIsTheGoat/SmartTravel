import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FadeLoader from "react-spinners/FadeLoader";
import axios from 'axios';

export const CrearEncuesta = () => {
  const [pregunta, setPregunta] = useState('');
  const [respuestas, setRespuestas] = useState(['', '']);
  let [loading, setLoading] = useState(false);

  const handleRespuestaChange = (index, value) => {
    const nuevasRespuestas = [...respuestas];
    nuevasRespuestas[index] = value;
    setRespuestas(nuevasRespuestas);
  };

  const agregarRespuesta = () => {
    setRespuestas([...respuestas, '']);
  };

  const crearEncuesta = async () => {    
    setLoading(true);
    try {
      const response = await axios.post(`http://localhost:8080/encuestas/hacerEncuestaPy/${sessionStorage.getItem("viajeId")}/?pregunta=${pregunta}&posiblesRespuestas=${respuestas.join(',')}`)
      const url = response.data.url
      setLoading(false)
      window.alert(url)
    } catch (error) {
      setLoading(false)
      window.alert("ERROR NO ESTA PRENDIDA LA API ")
    }
  };

  return (

    
    <div>

      <header className="header-encuestas">
      <Link to="/Miembros/Encuestas">
        <a href="/" className="go-back"><i className='bx bx-chevron-left'></i></a>
      </Link>
      <a href="/Home" className="encuestas">Encuestas</a>
      <a href="/Home" className="icon"></a>
      </header>
      {loading && <div className='loader'><FadeLoader color="#D0CBFF" /></div>}
      {!loading &&
      <section className="lista-documentos" id="section-a">    

        <div className="container-docs">
          <div className="container-label">
            <label>Pregunta:</label>
            <input
              type="text"
              value={pregunta}
              onChange={(e) => setPregunta(e.target.value)}
            />
          </div>
          <div className='container-label'>
            <div>
              <label>Respuestas:</label>
              {respuestas.map((respuesta, index) => (
                <div key={index}>
                <input
                    type="text"
                    value={respuesta}
                    onChange={(e) => handleRespuestaChange(index, e.target.value)}
                  />
                </div>
              ))}
              <button onClick={agregarRespuesta} className='add-respuesta'>Agregar Respuesta</button>
            </div>
          </div>
        </div>
        
        <button onClick={crearEncuesta} className='add-miembro'>Crear Encuesta</button>
      </section>}
    </div>
  );
};

export default CrearEncuesta;