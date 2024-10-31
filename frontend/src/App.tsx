import React, { useContext} from "react"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthProvider from './contexts/AuthContext';

import "./app.css"

import '@govbr-ds/core/dist/core-init.js'
import '@govbr-ds/core/dist/core.min.css'
import '@govbr-ds/webcomponents/dist/webcomponents.umd.min.js'

import Header from "./components/Header"
import FooterSmall from "./components/FooterSmall"
import ImportDsGovBr from "./components/importDsGovBr"

import NotFound from "./routes/NotFound"
import Home from "./routes/Home"
import Login from "./routes/Login"
import SiglaList from "./routes/SiglaList"
import SiglaEdit from "./routes/SiglaEdit"
import PainelPessoas from "./routes/PainelPessoas"
import UsuarioList from "./routes/UsuarioList";
import UsuarioEdit from "./routes/usuarioEdit";
import AreaResponsavelList from "./routes/AreaResponsavelList";
import AreaResponsavelEdit from "./routes/AreaResponsavelEdit";
import TecnologiaSiglaEdit from "./routes/TecnologiaSiglaEdit";
import TecnologiaSiglaList from "./routes/TecnologiaSiglaList";

export default function App() {

  //Informe aqui o nome e uma breve descrição sobre o Sistema. Essas informações aparecerão no Header e Menu do sistema.
  const title = "SIGLAS" 
  const subtitle ="Informações sobre o portifólio de soluções e equipes do MEC."

  return (
  <AuthProvider>
    <BrowserRouter>
      <Header title={title} subtitle={subtitle}/>
      <ImportDsGovBr/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound/>} />
            <Route path="Login" element={<Login title={title}/>} />
            <Route path="Sigla" element={<SiglaList />} />
            <Route path="Sigla/:id" element={<SiglaEdit />}>
              <Route path="tecnologia" element={<TecnologiaSiglaList title={title} />} />
            </Route>

            <Route path="TecnologiaSigla/:id" element={<TecnologiaSiglaEdit />} />
            <Route path="Usuario" element={<UsuarioList />} />
            <Route path="Usuario/:id" element={<UsuarioEdit />} />
            <Route path="PainelPessoas" element={<PainelPessoas />} />
            <Route path="AreaResponsavel" element={<AreaResponsavelList />} /> 
            <Route path="AreaResponsavel/:id" element={<AreaResponsavelEdit />} /> 
        </Routes>
      <FooterSmall />
    </BrowserRouter>
  </AuthProvider>
  );
}
