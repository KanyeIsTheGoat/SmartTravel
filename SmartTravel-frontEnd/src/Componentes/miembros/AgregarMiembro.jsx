import { useState } from "react"
import { Link } from 'react-router-dom';
import axios from "axios";
import '../../Styles/agregarMiembro.css';



export const AgregarMiembro = () => {

    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [usuarios, setUsuarios] = useState([]);
    const [mensaje, setMensaje] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const nuevoUsuario = { nombre, email };
        setUsuarios([...usuarios, nuevoUsuario]);
        setNombre('');
        setEmail('');
        setMensaje('');
       
        if (!nombre || !email) {
            alert('Por favor, completa todos los campos');
            return;
        } 
        try {
                     
            await axios.post('http://localhost:8080/miembro', {nombre,email, idViaje:sessionStorage.getItem("viajeId") });
            console.log('Datos enviados correctamente');
            setMensaje('Miembro agregado correctamente');
            window.alert('Miembro agregado correctamente!');
        } catch (error) {
            console.error('Error al enviar datos:', error);
            setMensaje('Error al agregar miembro');
        }


      };
    
  return (
    <div>
      <header className="header-miembros">
        <Link to="/Miembros">
            <a href="/" className="go-back"><i className='bx bx-chevron-left'></i></a>
        </Link>
        <a href="/Home" className="miembros">Miembros</a>
        <a href="/Home" className="icon"></a>
      </header>

      <section className="lista-miembros2" id="section-a">
        <div className="form1-destinos">
          <form onSubmit={handleSubmit}>
            <p className="p-style1">Nombre de Usuario</p>

            <input type="text" placeholder="" value={nombre} onChange={(e) => setNombre(e.target.value)}/>
              <p className="p-style">Email</p>
            <input type="text" placeholder=""  value={email} onChange={(e) => setEmail(e.target.value)}/>

            <button type="submit" className='add-destino'>Confirmar Miembro</button>
          </form>
        </div>
      </section>  
    </div>
  )
}
