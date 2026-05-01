import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/inicio/header/header";
import Corpo from "./components/inicio/corpo/corpo";
import Rodape from "./components/inicio/rodape/rodape";
import Apresentacao from "./components/apresentacao/apresentacao";
import Login from "./components/inicio/header/login";
import Corpologado from "./components/inicio/logado/corpologado";
import Nota from "../public/nota";
import Loading from "./others/loading";
import NotFound from "./others/notfound";
import Caixas from "./components/caixas/caixas";
import Painel from "./components/painel/painel";
import "./app.css";
export default function App() {

  const [loading, setLoading] = useState(false);
  const [logado, setLogado] = useState(null); // começa null
  const [verificando, setVerificando] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setLogado(true);
    } else {
      setLogado(false);
    }

    setVerificando(false);
  }, []);

  const ativarLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  if (verificando) {
    return <Loading />;
  }
  return (
    <BrowserRouter>

      {loading && <Loading />}

      <Routes>

        {/* ROTA RAIZ */}
        <Route
          path="/"
          element={
            logado ? (
              <Navigate to="/inicio" replace />
            ) : (
              <>
                <Header />
                <Corpo ativarLoading={ativarLoading} />
                <Rodape />
              </>
            )
          }
        />

        {/* ÁREA LOGADA */}
        <Route
          path="/inicio"
          element={
            logado ? (
              <>
                <Header />
                <Corpologado />
                <Rodape />
              </>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        {/* LOGIN */}
        <Route
          path="/login"
          element={
            logado ? (
              <Navigate to="/inicio" replace />
            ) : (
              <>
                <Header />
                <Login
                  setLogado={setLogado}
                  setLoading={setLoading}
                />
                <Rodape />
              </>
            )
          }
        />
        {/* NOTA */}
        <Route
          path="/nota"
          element={
            <>
              <Header />
              <Nota />
              <Rodape />
            </>
          }
        />
        {/* APRESENTAÇÃO */}
        <Route
          path="/apresentacao/:idioma?"
          element={<Apresentacao />}
        />
        {/* PAINEL */}
        <Route
          path="/painel/*"
          element={
            logado ? (
              <Painel />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
        <Route path="/areas" element={<Caixas />} />

      </Routes>

    </BrowserRouter>
  );
}