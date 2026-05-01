import React, { useState, useEffect } from "react";
import { API_URL } from "../../config";
import "./caixas.css";
import Posicionar from "./posicionar";
import Lista from "./lista";

export default function Caixas() {

    const [chave, setChave] = useState("");
    const [usuario, setUsuario] = useState(null);
    const [erro, setErro] = useState("");
    const [tela, setTela] = useState("lista"); // 🔥 controle de tela

    useEffect(() => {
        const salvo = localStorage.getItem("funcionario");
        if (salvo) {
            setUsuario(JSON.parse(salvo));
        }
    }, []);

    const verificarChave = async () => {
        try {
            setErro("");

            const res = await fetch(`${API_URL}/funcionarios/verificar/${chave}`);
            const data = await res.json();

            if (!res.ok) {
                setErro(data.detail || "Chave inválida");
                return;
            }

            const user = {
                id: data.id,
                nome: data.nome,
                chave: chave
            };

            localStorage.setItem("funcionario", JSON.stringify(user));
            setUsuario(user);

        } catch {
            setErro("Erro ao conectar com servidor");
        }
    };

    const sair = () => {
        localStorage.removeItem("funcionario");
        setUsuario(null);
        setChave("");
    };

    // 🔥 LOGIN
    if (!usuario) {
        return (
            <div className="caixas-container">

                <h1 className="caixas-titulo">Acesso por Chave</h1>

                <input
                    type="text"
                    placeholder="Digite sua chave"
                    value={chave}
                    onChange={(e) => setChave(e.target.value)}
                    className="caixas-input"
                />

                <button onClick={verificarChave} className="caixas-botao">
                    Entrar
                </button>

                {erro && <p className="caixas-erro">{erro}</p>}
            </div>
        );
    }

    // 🔥 LOGADO
    return (
        <div className="caixas-container">
            <img src="../../qat.avif" alt="" />

            <p className="caixas-sucesso">
                <strong>
                    {usuario.nome?.charAt(0).toUpperCase() + usuario.nome?.slice(1).toLowerCase()}
                </strong>
            </p>

            <button onClick={sair} className="caixas-botao-sair">
                Sair
            </button>

            {/* 🔥 BOTÕES STICKY */}
            <div className="menu-sticky">

                <button
                    className={tela === "lista" ? "ativo" : ""}
                    onClick={() => setTela("lista")}
                >
                    Lista
                </button>

                <button
                    className={tela === "posicionar" ? "ativo" : ""}
                    onClick={() => setTela("posicionar")}
                >
                    Posicionar
                </button>

            </div>

            {/* 🔥 CONTEÚDO */}
            <div className="conteudo">
                {tela === "lista" && <Lista />}
                {tela === "posicionar" && <Posicionar />}
            </div>

        </div>
    );
}