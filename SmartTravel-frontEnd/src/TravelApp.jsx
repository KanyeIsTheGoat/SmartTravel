import { Route, Routes } from "react-router-dom"
import { Home } from "./Componentes/Home"
import { Destino } from "./Componentes/destino/Destino"
import { Miembros } from "./Componentes/miembros/Miembros"
import { Documentos } from "./Componentes/documento/Documentos"
import { Actividades } from "./Componentes/actividad/Actividades"
import { Gastos } from "./Componentes/gasto/Gastos"
import { AgregarMiembro } from "./Componentes/miembros/AgregarMiembro"
import { AgregarActividad } from "./Componentes/actividad/AgregarActividad"
import { AgregarGasto } from "./Componentes/gasto/AgregarGasto"
import { AgregarDocumentos } from "./Componentes/documento/AgregarDocumentos"
import { CrearEncuesta } from "./Componentes/encuestas/CrearEncuesta"
import { Viaje } from "./Componentes/viaje/Viaje"
import { AgregarViaje } from "./Componentes/viaje/AgregarViaje"
import { VerEncuestas } from "./Componentes/encuestas/VerEncuestas"
import Login from "./Componentes/Log/Login"
import App from "./Componentes/Log/PreHome"
import Destino2 from "./Componentes/destino/Destino2"
import { ActualizarViaje } from "./Componentes/viaje/ActualizarViaje"



export const TravelApp = () => {

  return (
    <>
    <div>
        
      
      <Routes>
        <Route path="/Home" element={<Home></Home>}> </Route>
        <Route path="/AgregarDestino" element={<Destino></Destino>}></Route>
        <Route path="/Miembros" element={<Miembros></Miembros>}></Route>
        <Route path="/Documentos" element={<Documentos></Documentos>}></Route>
        <Route path="/AgregarMiembro" element={<AgregarMiembro></AgregarMiembro>}></Route>
        <Route path="/Actividades" element={<Actividades></Actividades>}></Route>
        <Route path="/Gastos" element={<Gastos></Gastos>}></Route>
        <Route path="/AgregarActividad" element={<AgregarActividad></AgregarActividad>}></Route>
        <Route path="/AgregarGasto" element={<AgregarGasto></AgregarGasto>}></Route>
        <Route path="/Documentos/AgregarDocumentos" element={<AgregarDocumentos></AgregarDocumentos>}></Route>
        <Route path="/Miembros/CrearEncuesta" element={<CrearEncuesta></CrearEncuesta>}></Route>
        <Route path="/Miembros/Encuestas" element={<VerEncuestas></VerEncuestas>}></Route>
        
        <Route path="/*" element={<App></App>}> </Route>
        
        <Route path="/Viaje" element={<Viaje></Viaje>}></Route>
        <Route path="/AgregarViaje" element={<AgregarViaje></AgregarViaje>}></Route>
        <Route path="/ActualizarViaje" element={<ActualizarViaje></ActualizarViaje>}></Route>

        <Route path="/Destino" element={<Destino2></Destino2>}></Route>
      </Routes>
    </div>

    </>
  )
}