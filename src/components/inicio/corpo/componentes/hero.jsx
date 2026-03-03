import React from "react";
import "./hero.css";

export default function Hero() {

    function abrirWhatsApp() {
        window.open(
            "https://wa.me/5511957934372?text=Olá,%20gostaria%20de%20solicitar%20uma%20cotação.",
            "_blank"
        );
    }

    return (
        <section className="qa-hero">
            <div className="qa-hero-container">
                <h1 className="qa-hero-title">
                    Ajuste sua logística com precisão e segurança
                </h1>

                <p className="qa-hero-description">
                    Transporte rodoviário especializado no eixo São Paulo x Rio de Janeiro.
                    Coletas diárias, entrega ágil e cobertura total da carga.
                </p>

                <button
                    className="qa-hero-cta"
                    onClick={abrirWhatsApp}
                >
                    Solicitar Cotação
                </button>
            </div>
        </section>
    );
}