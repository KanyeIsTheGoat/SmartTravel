import { useState } from "react";
import { AiOutlineUnlock } from "react-icons/ai";
import { BiUser } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


  const Register = () => {
  //const history = useHistory();
  const [userData, setUserData] = useState({
    nombreUs: "",
    contraseña: "",
    email: ""
  });
  const navigate= useNavigate("")
  const [confirmPassword, setConfirmPassword] = useState("");


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userData.nombreUs || !userData.email || !userData.contraseña || !confirmPassword) {
      alert("Por favor, complete todos los campos.");
      return;
    }

  
    if (userData.contraseña !== confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }


    try {
      const response = await axios.post("http://localhost:8080/usuario", userData);


      if (response.data) {
        alert("Registro exitoso. Ahora puedes iniciar sesión.");
        navigate("/Login");
      } else {
        alert("Error al registrar. Inténtalo de nuevo.");
      }
    } catch (error) {
      console.error("Error en la solicitud de registro:", error);
      alert("Error al registrar. Inténtalo de nuevo.");
    }
  };

  return (
    <div>
      <div className="bg-slate-800 border border-slate-600 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-30 relative transition-all duration-200">
        <h1 className="text-4xl font-bold text-center mb-8">Registrate</h1>
        <form onSubmit={handleSubmit}>
          <div className="relative my-4">
            <input
              type="text"
              name="nombreUs"
              value={userData.nombreUs}
              onChange={handleChange}
              className="block w-72 py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
              placeholder=" "
            />
            <label className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Nombre de Usuario
            </label>
            <BiUser className="absolute top-4 right-4 text-slate-600" />
          </div>
          <div className="relative my-4">
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              className="block w-72 py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
              placeholder=" "
            />
            <label className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Correo Electrónico
              </label>
            <BiUser className="absolute top-4 right-4 text-slate-400" />
          </div>
          <div className="relative my-4">
            <input
              type="password"
              name="contraseña"
              value={userData.contraseña}
              onChange={handleChange}
              className="block w-72 py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
              placeholder=" "
            />
            <label className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Contraseña
            </label>
            <AiOutlineUnlock className="absolute top-4 right-4 text-slate-400" />
          </div>
          <div className="relative my-4">
            <input
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className="block w-72 py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
              placeholder=" "
            />
            <label className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Confirmar Contraseña
            </label>
            <AiOutlineUnlock className="absolute top-4 right-4 text-slate-400" />
          </div>
          <div>
              <button className="w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-emerald-800 hover:bg-emerald-600 hover:text-white py-2 transition-colors duration-300" type="submit">
                Registrarse
              </button>
          </div>
          <div className="mt-2 items-center">
            <div className="my-4">
              <span>
                Ya tienes una cuenta?{' '}
                <span className="text-blue-500">
                  {' '}
                  <Link to="/Login">Inicia Sesión</Link>
                </span>
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
