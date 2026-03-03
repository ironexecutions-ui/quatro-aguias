import React from "react";
import "./cotacao.css";

export default function CotacaoCTA() {

    function abrirWhatsApp() {
        window.open(
            "https://wa.me/5511957934372?text=Olá,%20gostaria%20de%20falar%20com%20um%20especialista%20para%20cotação.",
            "_blank"
        );
    }

    return (
        <section className="qa-cta">
            <div className="qa-cta-container">
                <h2 className="qa-cta-title">
                    Faça sua Cotação
                </h2>

                <p className="qa-cta-text">
                    Entre em contato agora mesmo e otimize sua logística.
                </p>

                <button
                    className="qa-cta-button"
                    onClick={abrirWhatsApp}
                >
                    Falar com Especialista
                </button>
            </div>
        </section>
    );
}