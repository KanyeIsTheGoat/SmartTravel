import { Link } from "react-router-dom";
import {BiUser} from "react-icons/bi";
import {AiOutlineUnlock} from "react-icons/ai";

const Home = () => {
    return (
        <div>
            <div className="bg-slate-800 border border-slate-600 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-30 relative transition-all duration-200">
                <h1  className="text-4xl text-white font-bold  text-center mb-6"><a href="/Login">Inicio</a></h1>
            </div>
        </div>
    );
};

export default Home;