import React from "react";
import "./sobre.css";
import imagemSobrea from "./imagens/a.avif";
import imagemSobreb from "./imagens/b.avif";

export default function Sobre() {
    return (
        <section className="soqa-sobre">
            <div className="soqa-sobre-container">
                <h2 className="soqa-section-heading">Sobre a Empresa</h2>

                <p className="soqa-section-paragraph">
                    Desde 2010, a Quatro Águias atua no transporte de cargas
                    fracionadas, dedicadas e lotação. Trabalhamos com frota
                    própria e terceirizada, garantindo eficiência, segurança
                    e responsabilidade operacional.
                </p>
                <div className="soqa-imagens">
                    <img src={imagemSobrea} alt="Frota da empresa" />
                    <img src={imagemSobreb} alt="Operação logística" />
                </div>

            </div>
        </section>
    );
}