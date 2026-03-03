import React from "react";
import "./servicos.css";

export default function Servicos() {
    return (
        <section className="saqa-servicos">
            <div className="saqa-servicos-container">
                <h2 className="saqa-section-heading">Serviços</h2>

                <div className="saqa-servicos-grid">

                    <div className="saqa-servico-card">
                        <h3 className="saqa-card-title">Carga Fracionada</h3>
                        <p className="saqa-card-text">
                            Ideal para envios no eixo SP x RJ com prazos reduzidos.
                        </p>
                    </div>

                    <div className="saqa-servico-card">
                        <h3 className="saqa-card-title">Carga Dedicada</h3>
                        <p className="saqa-card-text">
                            Projeto logístico exclusivo conforme necessidade.
                        </p>
                    </div>

                    <div className="saqa-servico-card">
                        <h3 className="saqa-card-title">Carga Lotação</h3>
                        <p className="saqa-card-text">
                            Veículo exclusivo para transporte integral da carga.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}