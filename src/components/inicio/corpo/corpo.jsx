import React from "react";
import Hero from "./componentes/Hero";
import Sobre from "./componentes/Sobre";
import Servicos from "./componentes/Servicos";
import Diferenciais from "./componentes/Diferenciais";
import Pracas from "./componentes/Pracas";
import CotacaoCTA from "./componentes/Cotacao";
import "./corpo.css";

export default function Corpo() {
    return (
        <main className="qa-main">
            <Hero />
            <Sobre />
            <Servicos />
            <Diferenciais />
            <Pracas />
            <CotacaoCTA />
        </main>
    );
}