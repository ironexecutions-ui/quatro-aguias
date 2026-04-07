import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../../config";
import "./header.css";

export default function Header() {

    const [usuario, setUsuario] = useState(null);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [mostrarBotaoTopo, setMostrarBotaoTopo] = useState(false);
    const [menuMobileAberto, setMenuMobileAberto] = useState(false);
    useEffect(() => {

        const token = localStorage.getItem("token");
        if (!token) return;

        async function buscarUsuario() {
            try {

                const response = await fetch(`${API_URL}/usuario/me`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    localStorage.removeItem("token");
                    setUsuario(null);
                    return;
                }

                const data = await response.json();
                setUsuario(data);

            } catch (error) {
                console.error("Erro ao buscar usuário:", error);
                localStorage.removeItem("token");
                setUsuario(null);
            }
        }

        buscarUsuario();

    }, []);

    /* =========================
       CONTROLE DE SCROLL
    ========================== */
    useEffect(() => {

        function handleScroll() {
            if (window.scrollY > 120) {
                setMostrarBotaoTopo(true);
            } else {
                setMostrarBotaoTopo(false);
            }
        }

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);

    }, []);

    function confirmarLogout() {
        localStorage.removeItem("token");
        setUsuario(null);
        window.location.reload();
    }

    function subirTopo() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    return (
        <>
            <header className={`qa-header-container ${mostrarBotaoTopo ? "qa-header-hide" : ""}`}>
                <div className="qa-header-content">

                    <div className="qa-header-logo-area">
                        <img
                            src="../../../qat.avif"
                            alt="Quatro Águias Transportes"
                            className="qa-header-logo-img"
                        />
                        <div className="qa-header-text-area">
                            <h1 className="qa-header-title">
                                Quatro Águias
                            </h1>
                            <span className="qa-header-subtitle">
                                Transporte e Logística
                            </span>
                        </div>
                    </div>

                    <nav className="qa-header-nav-area">

                        <Link
                            to="/apresentacao"
                            className="qa-header-nav-link"
                        >
                            Ver Apresentação
                        </Link>

                        {!usuario && (
                            <Link
                                to="/login"
                                className="qa-header-nav-link"
                            >
                                Login
                            </Link>
                        )}

                        {usuario && (
                            <div className="qa-header-user-area">

                                {usuario.foto_perfil && (
                                    <img
                                        src={
                                            usuario.foto_perfil.startsWith("http")
                                                ? usuario.foto_perfil
                                                : `${API_URL}${usuario.foto_perfil}`
                                        }
                                        alt="Foto"
                                        className="qa-header-user-photo"
                                    />
                                )}

                                <span className="qa-header-user-name">
                                    {usuario.nome} {usuario.sobrenome}
                                </span>

                                <button
                                    onClick={() => setMostrarModal(true)}
                                    className="qa-header-logout-btn"
                                >
                                    Sair
                                </button>

                            </div>
                        )}

                    </nav>

                </div>
            </header>

            {/* BOTÃO FLUTUANTE */}
            {mostrarBotaoTopo && (
                <div
                    className="qa-scroll-top-button"
                    onClick={subirTopo}
                >
                    {!usuario ? (
                        <img
                            src="././qat.avif"
                            alt="Topo"
                            className="qa-scroll-img qa-scroll-img-default"
                        />
                    ) : (
                        <img
                            src={
                                usuario.foto_perfil.startsWith("http")
                                    ? usuario.foto_perfil
                                    : `${API_URL}${usuario.foto_perfil}`
                            }
                            alt="Topo"
                            className="qa-scroll-img"
                        />
                    )}
                </div>
            )}

            {mostrarModal && (
                <div className="qa-modal-overlay">
                    <div className="qa-modal-container">
                        <h3 className="qa-modal-title">
                            Confirmar saída
                        </h3>

                        <p className="qa-modal-text">
                            Tem certeza que deseja sair da sua conta?
                        </p>

                        <div className="qa-modal-actions">
                            <button
                                onClick={() => setMostrarModal(false)}
                                className="qa-modal-cancel-btn"
                            >
                                Cancelar
                            </button>

                            <button
                                onClick={confirmarLogout}
                                className="qa-modal-confirm-btn"
                            >
                                Sim, sair
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}