import React from "react";
import { Link } from "react-router-dom";
import "./notfound.css";

export default function NotFound() {
    return (
        <div className="nf-page-wrapper">

            {/* Topo com identidade da loja */}
            <div className="nf-brand-area">
                <img
                    src="././qat.avif"
                    alt="Quatro Águias Transportes"
                    className="nf-brand-logo"
                />
                <div className="nf-brand-text">
                    <h1 className="nf-brand-title">Quatro Águias</h1>
                    <span className="nf-brand-subtitle">
                        Transporte e Logística
                    </span>
                </div>
            </div>

            {/* Conteúdo principal */}
            <div className="nf-card-container">

                <div className="nf-error-code">404</div>

                <h2 className="nf-error-title">
                    Página não encontrada
                </h2>

                <p className="nf-error-description">
                    O endereço acessado não foi localizado em nosso sistema.
                    Verifique se o link está correto ou retorne para a página inicial.
                </p>

                <div className="nf-actions-area">
                    <Link to="/" className="nf-primary-button">
                        Retornar ao início
                    </Link>


                </div>

            </div>

        </div>
    );
}