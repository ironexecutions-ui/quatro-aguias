import React from "react";
import { API_URL } from "../../../config";
import "./termos.css";
export default function Termos({ dadosUsuario, onSucesso }) {

    async function aceitar() {
        try {

            if (dadosUsuario.novo_usuario) {
                await fetch(`${API_URL}/auth/cadastrar-google`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        nome: dadosUsuario.nome,
                        sobrenome: dadosUsuario.sobrenome,
                        email: dadosUsuario.email,
                        foto: dadosUsuario.foto
                    })
                });
            }

            await fetch(`${API_URL}/auth/aceitar-termos`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: dadosUsuario.email
                })
            });

            const login = await fetch(`${API_URL}/auth/google`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    token: dadosUsuario.token
                })
            });

            const resultado = await login.json();

            onSucesso(resultado);

        } catch (error) {
            console.error("Erro ao aceitar termos:", error);
        }
    }

    return (
        <div className="qa-termos-wrapper">
            <div className="qa-termos-container">
                <h1 className="qa-termos-title">Termos de Uso</h1>
                <p className="qa-termos-text">
                    Aqui você coloca seus termos completos.
                </p>
                <button
                    className="qa-termos-button"
                    onClick={aceitar}
                >
                    Aceito os Termos
                </button>
            </div>
        </div>
    );
}