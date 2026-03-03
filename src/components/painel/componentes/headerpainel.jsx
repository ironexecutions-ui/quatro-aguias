import React, { useEffect, useState } from "react";
import { API_URL } from "../../../config";
import "./headerpainel.css";

export default function HeaderPainel() {

    const [usuario, setUsuario] = useState(null);
    const [compacto, setCompacto] = useState(false);

    useEffect(() => {

        const token = localStorage.getItem("token");
        if (!token) return;

        async function buscarUsuario() {
            try {
                const response = await fetch(`${API_URL}/usuario/me`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (!response.ok) {
                    localStorage.removeItem("token");
                    setUsuario(null);
                    return;
                }

                const data = await response.json();
                setUsuario(data);

            } catch {
                localStorage.removeItem("token");
                setUsuario(null);
            }
        }

        buscarUsuario();

    }, []);

    useEffect(() => {
        function handleScroll() {
            if (window.scrollY > 120) {
                setCompacto(true);
            } else {
                setCompacto(false);
            }
        }

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (!usuario) return null;

    function montarFoto() {
        if (!usuario.foto_perfil) return "/perfil-placeholder.png";
        if (usuario.foto_perfil.startsWith("http")) return usuario.foto_perfil;
        return `${API_URL}${usuario.foto_perfil}`;
    }

    function voltarTopo() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    return (
        <header
            className={`painel-header-container ${compacto ? "painel-header-compacto" : ""}`}
            onClick={compacto ? voltarTopo : undefined}
        >
            <div className="painel-header-left">
                {usuario.foto_perfil && (
                    <img
                        src={montarFoto()}
                        alt="Foto Perfil"
                        className="painel-header-avatar"
                    />
                )}

                {!compacto && (
                    <h2 className="painel-header-nome">
                        {usuario.nome} {usuario.sobrenome}
                    </h2>
                )}
            </div>

            {!compacto && (
                <div className="painel-header-right">
                    <span className="painel-header-funcao">
                        {usuario.funcao
                            ? usuario.funcao.charAt(0).toUpperCase() + usuario.funcao.slice(1)
                            : ""}
                    </span>

                    <span className="painel-header-nivel">
                        Nível {usuario.nivel}
                    </span>
                </div>
            )}
        </header>
    );
}