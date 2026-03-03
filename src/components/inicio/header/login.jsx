import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { API_URL } from "../../../config";
import Beneficios from "./beneficios";
import Termos from "./termos";
import "./Login.css";

export default function Login({ setLogado, setLoading }) {

    const [mostrarTermos, setMostrarTermos] = useState(false);
    const [dadosUsuario, setDadosUsuario] = useState(null);

    const navigate = useNavigate();

    async function handleGoogleSuccess(credentialResponse) {
        try {

            const response = await fetch(`${API_URL}/auth/google`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    token: credentialResponse.credential
                })
            });

            const data = await response.json();

            if (data.novo_usuario || data.precisa_aceitar_termos) {

                setDadosUsuario({
                    ...data,
                    token: credentialResponse.credential
                });

                setMostrarTermos(true);
                return;
            }

            // 🔹 LOGIN NORMAL
            localStorage.setItem("token", data.token);

            setLoading(true);

            if (data.funcao === "cliente") {

                navigate("/", { replace: true });

                // 🔹 Aguarda rota montar e depois atualiza
                setTimeout(() => {
                    window.location.reload();
                }, 300);

            } else {

                setLogado(true);

                setTimeout(() => {
                    navigate("/painel", { replace: true });
                    setLoading(false);
                }, 800);
            }

        } catch (error) {
            console.error("Erro no login:", error);
        }
    }

    if (mostrarTermos) {
        return (
            <Termos
                dadosUsuario={dadosUsuario}
                onSucesso={(resultado) => {

                    localStorage.setItem("token", resultado.token);

                    setLoading(true);

                    if (resultado.funcao === "cliente") {

                        navigate("/", { replace: true });

                        setTimeout(() => {
                            window.location.reload();
                        }, 300);

                    } else {

                        setLogado(true);

                        setTimeout(() => {
                            navigate("/painel", { replace: true });
                            setLoading(false);
                        }, 800);
                    }
                }}
            />
        );
    }

    return (
        <div className="qa-login-wrapper">

            <Beneficios />

            <div className="qa-login-right">
                <div className="qa-login-container">

                    <h2 className="qa-login-title">
                        Entrar com Google
                    </h2>

                    <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={() => console.log("Erro no login Google")}
                    />

                </div>
            </div>

        </div>
    );
}