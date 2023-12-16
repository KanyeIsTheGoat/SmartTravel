// Documentos.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
 // Asegúrate de tener un archivo CSS asociado (Documentos.css) con los estilos proporcionados a continuación.

export const Documentos = () => {
  const [documentosGuardados, setDocumentosGuardados] = useState([]);
  const [visibilidadListas, setVisibilidadListas] = useState({
    transporte: false,
    alojamiento: false,
    otros: false,
  });

  useEffect(() => {
    obtenerDocumentos();
  }, []);

  const obtenerDocumentos = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/documento/viaje/${sessionStorage.getItem("viajeId")}`);
      setDocumentosGuardados(response.data);
      console.log("Documentos obtenidos correctamente:", response.data);
    } catch (error) {
      console.error("Error al obtener documentos:", error);
    }
  };

  const eliminarDocumentos = async (idDocumento) => {
    await axios.delete("http://localhost:8080/documento/" + idDocumento, { responseType: "arraybuffer" });

    setDocumentosGuardados((prevDocumentos) =>
      prevDocumentos.filter((doc) => doc.id !== idDocumento)
    );
  };

  const descargarDocumento = async (idDocumento, nombreDocumento) => {
    const response = await axios.get("http://localhost:8080/documento/" + idDocumento + "/descargar");
    console.log(response.data);

    const blob = new Blob([response.data], { type: "application/pdf" });

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = nombreDocumento;
    document.body.appendChild(a);
    a.click();

    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const toggleVisibilidadLista = (tipo) => {
    setVisibilidadListas((prevVisibilidadListas) => ({
      ...Object.fromEntries(Object.keys(prevVisibilidadListas).map((key) => [key, false])),
      [tipo]: !prevVisibilidadListas[tipo],
    }));
  };

  const ListaDesplegable = ({ tipo, documentos }) => (
    <div className={`lista-desplegable ${visibilidadListas[tipo] ? "visible" : ""}`}>
      <h2 onClick={() => toggleVisibilidadLista(tipo)} style={{ cursor: "pointer" }}>
        {tipo} {visibilidadListas[tipo] ? "▼" : "►"}
      </h2>
      {visibilidadListas[tipo] && (
        <ul>
          {documentos
            .filter((doc) => doc.tipo === tipo)
            .map((doc, index) => (
              <li key={index}>
                <div>
                  <strong>Título:</strong> {doc.nombreDocumento}
                  <button className="button-list" onClick={() => descargarDocumento(doc.id, doc.nombreDocumento)}>Descargar</button>
                  <button className="button-list" onClick={() => eliminarDocumentos(doc.id)}>Eliminar</button>
                </div>
              </li>
            ))}
        </ul>
      )}
    </div>
  );

  return (
    <>
      <header className="header-documentos">
        <a href="/Home" className="go-back">
          <i className="bx bx-chevron-left"></i>
        </a>
        <a href="/Home" className="documentos2">
          Documentos
        </a>
        <a href="/Home" className="icon"></a>
      </header>
      <section className="lista-miembros" id="section-a">
        <h1 className="title-miembros">Documentos</h1>

        <div className="navbar">
          <div className="container-miembros">
            <ListaDesplegable tipo="Transporte" className="lista-doc" documentos={documentosGuardados} />
          </div>
          <div className="container-miembros">
            <ListaDesplegable tipo="Alojamiento" className="lista-doc" documentos={documentosGuardados} />
          </div>
          <div className="container-miembros">
            <ListaDesplegable tipo="Otros" className="lista-doc" documentos={documentosGuardados} />
          </div>
        </div>

        <Link to="/Documentos/AgregarDocumentos">
          <button className="add-documentos">Agregar Documento</button>
        </Link>
      </section>
    </>
  );
};
