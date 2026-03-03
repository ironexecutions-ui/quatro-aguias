import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config";
import Painelacesso from "./paineledicao";
import './paineledicao.css'
export default function Painel() {

    const navigate = useNavigate();
    const [carregando, setCarregando] = useState(true);
    const [autorizado, setAutorizado] = useState(false);

    useEffect(() => {
        async function verificarAcesso() {

            const token = localStorage.getItem("token");

            if (!token) {
                navigate("/");
                return;
            }

            try {
                const response = await fetch(`${API_URL}/painel`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    navigate("/");
                    return;
                }

                setAutorizado(true);

            } catch (error) {
                navigate("/");
            } finally {
                setCarregando(false);
            }
        }

        verificarAcesso();
    }, []);

    if (carregando) {
        return <h1 className="painel-verificando">Verificando acesso...</h1>;
    }

    if (!autorizado) {
        return <h1>Acesso não autorizado</h1>;
    }
    {/* APENAS ADICIONA SEMPRE NO RETUNR NAO TOCAR AREA DE ACIMA QUE É MUITO IMPORTANTE */ }
    return (
        <div>
            <Painelacesso />
        </div>
    );
}