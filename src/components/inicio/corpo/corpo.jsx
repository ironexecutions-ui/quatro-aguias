import React from "react";
import Hero from "./componentes/hero";
import Sobre from "./componentes/sobre";
import Servicos from "./componentes/servicos";
import Diferenciais from "./componentes/diferenciais";
import Pracas from "./componentes/pracas";
import CotacaoCTA from "./componentes/cotacao";
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