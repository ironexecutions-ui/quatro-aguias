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
    // 🔥 LOGADO
    return (
        <div className="caixas-container">

            {/* 🔥 FUNDO DECORATIVO */}
            <div className="caixas-fundo-bolha caixas-fundo-bolha-1"></div>
            <div className="caixas-fundo-bolha caixas-fundo-bolha-2"></div>

            {/* 🔥 HEADER */}
            <div className="caixas-header-unico">

                <div className="caixas-logo-area-unica">

                    <img
                        src="../../qat.avif"
                        alt="Logo"
                        className="caixas-logo-unica"
                    />

                </div>

                <div className="caixas-usuario-area-unica">

                    <div className="caixas-status-online-unico">
                        Online
                    </div>

                    <h2 className="caixas-nome-unico">
                        {
                            usuario.nome?.charAt(0).toUpperCase() +
                            usuario.nome?.slice(1).toLowerCase()
                        }
                    </h2>

                    <p className="caixas-subtexto-unico">
                        Sistema de gerenciamento de galpões
                    </p>

                </div>

                <button
                    onClick={sair}
                    className="caixas-botao-sair"
                >
                    Sair
                </button>

            </div>

            {/* 🔥 MENU */}
            <div className="menu-sticky">

                <button
                    className={`
                    menu-btn-unico
                    ${tela === "lista"
                            ? "ativo"
                            : ""
                        }
                `}
                    onClick={() => setTela("lista")}
                >

                    <span className="menu-mini-texto-unico">
                        Visualização
                    </span>

                    <strong>
                        Lista
                    </strong>

                </button>

                <button
                    className={`
                    menu-btn-unico
                    ${tela === "posicionar"
                            ? "ativo"
                            : ""
                        }
                `}
                    onClick={() => setTela("posicionar")}
                >

                    <span className="menu-mini-texto-unico">
                        Controle
                    </span>

                    <strong>
                        Posicionar
                    </strong>

                </button>

            </div>

            {/* 🔥 CONTEÚDO */}
            <div className="conteudo caixas-conteudo-unico">

                <div className="caixas-conteudo-card-unico">

                    {tela === "lista" && <Lista />}

                    {tela === "posicionar" && <Posicionar />}

                </div>

            </div>

        </div>
    );
}