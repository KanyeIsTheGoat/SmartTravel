import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export const AgregarDocumentos = () => {
  const [tipoDocumento, setTipoDocumento] = useState("");

  const [documento, setDocumento] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setDocumento(selectedFile);
  };

  const guardarDocumento = async () => {
    if (!tipoDocumento || !documento) {
      alert(
        "Por favor, completa todos los campos antes de guardar el documento."
      );
      return;
    }

    const formData = new FormData();
    formData.append("file", documento);
    
    await axios.post(`http://localhost:8080/documento/${sessionStorage.getItem("viajeId")}/`+tipoDocumento, formData);
    console.log("Datos enviados correctamente");

    setDocumento(null);
    setTipoDocumento("");

    navigate("/Documentos");
  };


  return (
    <>
      <header className="header-documentos">
      <Link to="/Documentos">
        <a href="/" className="go-back"><i className='bx bx-chevron-left'></i></a>
      </Link>
      <a href="/Home" className="documentos">Documentos</a>
      <a href="/Home" className="icon"></a>
    </header>



    <section className="lista-documentos" id="section-a">
      
      <div className="container-docs">
      <div className="container-label">
        <label className="label-style">Tipo de Documento</label>
        <select
          value={tipoDocumento}
          onChange={(e) => setTipoDocumento(e.target.value)}
        >
          <option value="">Selecciona tipo de Documento</option>
          <option value="Transporte">Transporte</option>
          <option value="Alojamiento">Alojamiento</option>
          <option value="Otros">Otros</option>
        </select>
      </div>
      
      <div>
        {/*<label>Titulo del Documento</label>*/}
        {/*<input type="text" value={tituloDocumento} onChange={(e) => setTituloDocumento(e.target.value)}></input>*/}
      </div>
      
      <div className="container-label">
        
        <label>Adjunta el Archivo</label>
        <input
          type="file"
          onChange={handleFileChange}
          accept="application/pdf"
        />
        {documento ? (
          <p>Archivo seleccionado: {documento.name}</p>
        ) : (
          <p></p>
        )}
      </div>
      
      <button onClick={guardarDocumento} className='add-destino'>Guardar Documento</button>
      
      </div>

      {/* <Link to="/Documentos">
        <button>Volver</button>
      </Link> */}
      </section>
      
    </>
  );
};
