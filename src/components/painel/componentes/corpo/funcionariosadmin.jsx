import React, { useEffect, useState } from "react";
import { API_URL } from "../../../../config";
import "./funcionariosadmin.css";

export default function FuncionariosAdmin() {

    const [usuarios, setUsuarios] = useState([]);
    const [usuarioExpandido, setUsuarioExpandido] = useState(null);

    const [busca, setBusca] = useState("");
    const [resultados, setResultados] = useState([]);

    const [filtroLista, setFiltroLista] = useState("");

    const [acaoConfirmacao, setAcaoConfirmacao] = useState(null);
    const [usuarioAlvo, setUsuarioAlvo] = useState(null);

    const [mostrarPromocao, setMostrarPromocao] = useState(false);

    async function carregarUsuarios() {
        const res = await fetch(`${API_URL}/usuarios/administradores`);
        const data = await res.json();
        setUsuarios(data);
    }

    useEffect(() => {
        carregarUsuarios();
    }, []);

    function toggleExpand(id) {
        setUsuarioExpandido(usuarioExpandido === id ? null : id);
    }

    function montarFoto(user) {
        if (!user.foto_perfil) return "/perfil-placeholder.png";
        if (user.foto_perfil.startsWith("http")) return user.foto_perfil;
        return `${API_URL}${user.foto_perfil}`;
    }

    async function buscarUsuarios(valor) {
        setBusca(valor);

        if (valor.length < 2) {
            setResultados([]);
            return;
        }

        const res = await fetch(`${API_URL}/usuarios/buscar-nao-admin?q=${valor}`);
        const data = await res.json();
        setResultados(data);
    }

    async function promoverUsuario(id) {
        await fetch(`${API_URL}/usuarios/tornar-admin/${id}`, {
            method: "PUT"
        });

        setBusca("");
        setResultados([]);
        setMostrarPromocao(false);
        carregarUsuarios();
    }

    function pedirConfirmacao(tipo, user) {
        setAcaoConfirmacao(tipo);
        setUsuarioAlvo(user);
    }

    async function executarAcaoConfirmada() {

        if (!usuarioAlvo || !acaoConfirmacao) return;

        if (acaoConfirmacao === "cliente") {
            await fetch(`${API_URL}/usuarios/tornar-cliente/${usuarioAlvo.id}`, {
                method: "PUT"
            });
        }

        if (acaoConfirmacao === "deletar") {
            await fetch(`${API_URL}/usuarios/deletar/${usuarioAlvo.id}`, {
                method: "DELETE"
            });
        }

        setAcaoConfirmacao(null);
        setUsuarioAlvo(null);
        carregarUsuarios();
    }

    const usuariosFiltrados = usuarios.filter(user =>
        `${user.nome} ${user.sobrenome}`
            .toLowerCase()
            .includes(filtroLista.toLowerCase())
    );
    async function aumentarNivel(id) {
        await fetch(`${API_URL}/usuarios/aumentar-nivel/${id}`, {
            method: "PUT"
        });

        carregarUsuarios();
    }

    async function diminuirNivel(id) {
        await fetch(`${API_URL}/usuarios/diminuir-nivel/${id}`, {
            method: "PUT"
        });

        carregarUsuarios();
    }
    return (
        <div className="funcadmin-container">

            <h2 className="funcadmin-title">Lista de Administradores</h2>

            {/* 🔎 FILTRO NA LISTA */}
            <input
                type="text"
                placeholder="Filtrar administrador por nome"
                value={filtroLista}
                onChange={(e) => setFiltroLista(e.target.value)}
                className="funcadmin-input"
            />

            {/* 🔘 BOTÃO MOSTRAR PROMOÇÃO */}
            <div style={{ marginBottom: "20px" }}>
                <button
                    className="funcadmin-btn-confirm"
                    onClick={() => setMostrarPromocao(prev => !prev)}
                >
                    {mostrarPromocao ? "Fechar Promoção" : "Promover Cliente a administrador"}
                </button>
            </div>

            {/* 🔎 BUSCA PARA PROMOVER */}
            {mostrarPromocao && (
                <div className="funcadmin-busca-area">
                    <input
                        type="text"
                        placeholder="Buscar cliente para promover"
                        value={busca}
                        onChange={(e) => buscarUsuarios(e.target.value)}
                        className="funcadmin-input"
                    />

                    {resultados.length > 0 && (
                        <div className="funcadmin-resultados">
                            {resultados.map(user => (
                                <div
                                    key={user.id}
                                    className="funcadmin-result-card"
                                    onClick={() => promoverUsuario(user.id)}
                                >
                                    {user.nome} {user.sobrenome} - {user.email}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* 📋 LISTA */}
            <div className="funcadmin-list">

                {usuariosFiltrados.map(user => (
                    <div key={user.id} className="funcadmin-wrapper">

                        <div
                            className="funcadmin-card"
                            onClick={() => toggleExpand(user.id)}
                        >
                            <span>{user.nome} {user.sobrenome}</span>
                            <span className="funcadmin-email">{user.email}</span>
                        </div>

                        {usuarioExpandido === user.id && (
                            <div className="funcadmin-detalhes">

                                <div className="funcadmin-foto-area">
                                    <img
                                        src={montarFoto(user)}
                                        alt="Foto Perfil"
                                        className="funcadmin-avatar"
                                    />
                                </div>

                                <div><strong>ID:</strong> {user.id}</div>
                                <div><strong>Email:</strong> {user.email}</div>
                                <div className="funcadmin-nivel-area">
                                    <strong>Nível:</strong>

                                    <div className="funcadmin-nivel-botoes">

                                        <button
                                            className="funcadmin-btn-nivel-up"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                aumentarNivel(user.id);
                                            }}
                                        >
                                            +
                                        </button>
                                        <span className="funcadmin-nivel-valor">
                                            {user.funcao_nivel}
                                        </span>
                                        <button
                                            className="funcadmin-btn-nivel-down"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                diminuirNivel(user.id);
                                            }}
                                        >
                                            -
                                        </button>

                                    </div>
                                </div>
                                <div><strong>Termos:</strong> {user.termos === 1 ? "Aceito" : "Não aceito"}</div>

                                <div className="funcadmin-actions">

                                    <button
                                        className="funcadmin-btn-rebaixar"
                                        onClick={() => pedirConfirmacao("cliente", user)}
                                    >
                                        Tornar Cliente
                                    </button>

                                    <button
                                        className="funcadmin-btn-delete"
                                        onClick={() => pedirConfirmacao("deletar", user)}
                                    >
                                        Apagar Registro
                                    </button>

                                </div>

                            </div>
                        )}

                    </div>
                ))}

            </div>

            {/* 🔒 MODAL CONFIRMAÇÃO */}
            {acaoConfirmacao && usuarioAlvo && (
                <div className="funcadmin-modal">

                    <div className="funcadmin-modal-box">

                        <h3>Confirmação</h3>

                        <p>
                            Tem certeza que deseja{" "}
                            <strong>
                                {acaoConfirmacao === "deletar"
                                    ? "apagar"
                                    : "rebaixar para cliente"}
                            </strong>{" "}
                            o usuário{" "}
                            <strong>
                                {usuarioAlvo.nome} {usuarioAlvo.sobrenome}
                            </strong>?
                        </p>

                        <div className="funcadmin-modal-buttons">

                            <button
                                className="funcadmin-btn-cancel"
                                onClick={() => {
                                    setAcaoConfirmacao(null);
                                    setUsuarioAlvo(null);
                                }}
                            >
                                Cancelar
                            </button>

                            <button
                                className="funcadmin-btn-confirm"
                                onClick={executarAcaoConfirmada}
                            >
                                Sim
                            </button>

                        </div>

                    </div>

                </div>
            )}

        </div>
    );
}