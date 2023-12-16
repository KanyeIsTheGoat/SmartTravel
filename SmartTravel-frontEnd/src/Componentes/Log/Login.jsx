import { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { BiUser } from 'react-icons/bi';
import { AiOutlineUnlock } from 'react-icons/ai';
import axios from 'axios';

const Login = () => {
  const [nombreUs, setNombreUs] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate()


  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      const response = await axios.get('http://localhost:8080/usuario/'+nombreUs+'/'+contraseña);
        
      if (response.status == 200) {
        sessionStorage.setItem("usuarioId", response.data.usuarioId)
        navigate('/Viaje');
      } else { 
        alert("El usuario y/o la contraseña son incorrectos.");
        console.log('Autenticación fallida');
        console.log(response.status)
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert("El usuario y/o la contraseña son incorrectos.");
    }
  };

  return (
    <div>
      <div className="bg-slate-600 border-slate-600 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-30 relative transition-all duration-200">
        <h1 className="text-4xl text-white font-bold text-center mb-6">Inicia Sesión</h1>
        <form onSubmit={handleLogin}>
          <div className="relative my-4">
            <input
              type="nombreUs"
              value={nombreUs}
              onChange={(e) => setNombreUs(e.target.value)}
              className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
            />
            <label
              htmlFor=""
              className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Tu Usuario
            </label>
            <BiUser className="absolute top-4 right-4" />
          </div>
          <div className="relative my-4">
            <input
              type="password"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"

            />
            <label
              htmlFor=""
              className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Tu Contraseña
            </label>
            <AiOutlineUnlock className="absolute top-4 right-4" />
          </div>
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                name="rememberMe"
                id="rememberMe"
              />
              <label htmlFor="rememberMe">Recuérdame</label>
            </div>
            {/* <Link to="/ForgotPassword" className="text-blue-500 ml-2"> despues vemos
              Recuperar Contraseña
            </Link> */}
          </div>
          <button
            type="submit"
            className="w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-emerald-800 hover:bg-emerald-600 hover:text-white py-2 transition-colors duration-300"
          >
            Iniciar Sesión
          </button>
          <div>
            <span className="m-4">
              ¿No tienes cuenta?{' '}
              <Link className="text-blue-500 ml-2" to="/Register">
                ¡Crea una ahora!
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;