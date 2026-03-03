import React from "react";
import "./diferenciais.css";

export default function Diferenciais() {
    return (
        <section className="diqa-diferenciais">
            <div className="diqa-diferenciais-container">
                <h2 className="diqa-section-heading">Diferenciais</h2>

                <div className="diqa-diferenciais-grid">

                    <div className="diqa-diferencial-card">
                        Coletas Diárias
                    </div>

                    <div className="diqa-diferencial-card">
                        Entrega em até 3 dias úteis
                    </div>

                    <div className="diqa-diferencial-card">
                        Seguro contra roubo e acidente
                    </div>

                    <div className="diqa-diferencial-card">
                        Rastreamento 24h
                    </div>

                </div>
            </div>
        </section>
    );
}