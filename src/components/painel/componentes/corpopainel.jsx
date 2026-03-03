import React, { useEffect, useState } from "react";
import "./corpopainel.css";
import EditorApresentacao from "./corpo/editorapresentacao";
import { API_URL } from "../../../config";
import Nivel1 from "./niveis/nivel1";
import Nivel2 from "./niveis/nivel2";
import Nivel3 from "./niveis/nivel3";
import FuncionariosAdmin from "./corpo/funcionariosadmin";
import ClientesAdmin from "./corpo/clientesadmin";
export default function CorpoPainel() {

    const [idiomas, setIdiomas] = useState([]);
    const [idiomaSelecionado, setIdiomaSelecionado] = useState(null);
    const [nivelUsuario, setNivelUsuario] = useState(null);
    const [sidebarRecolhida, setSidebarRecolhida] = useState(false);
    const [sidebarExpandidaFixa, setSidebarExpandidaFixa] = useState(false);
    const [telaAtiva, setTelaAtiva] = useState(null);

    useEffect(() => {

        const token = localStorage.getItem("token");
        if (!token) return;

        fetch(`${API_URL}/usuario/me`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => {
                setNivelUsuario(Number(data.nivel));
            });

        fetch(`${API_URL}/apresentacao/painel/chama`)
            .then(res => res.json())
            .then(data => setIdiomas(data));

    }, []);

    useEffect(() => {

        function handleScroll() {

            if (sidebarExpandidaFixa) {
                setSidebarExpandidaFixa(false);
                setSidebarRecolhida(true);
                return;
            }

            if (window.scrollY > 50) {
                setSidebarRecolhida(true);
            }

        }

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);

    }, [sidebarExpandidaFixa]);

    return (
        <main className="painel-container">

            {/* SIDEBAR */}
            <aside
                className={`painel-sidebar 
                ${sidebarRecolhida ? "recolhida" : ""} 
                ${sidebarExpandidaFixa ? "expandida-fixa" : ""}`}
            >

                <div className="painel-sidebar-barra" />

                {sidebarRecolhida && !sidebarExpandidaFixa ? (
                    <button
                        className="painel-bolinha"
                        onClick={() => {
                            setSidebarRecolhida(false);
                            setSidebarExpandidaFixa(true);
                        }}
                    >
                        ☰
                    </button>
                ) : (
                    <div className="painel-sidebar-scroll">

                        <Nivel3
                            nivelUsuario={nivelUsuario}
                            idiomas={idiomas}
                            setIdiomaSelecionado={(idioma) => {
                                setTelaAtiva(null);
                                setIdiomaSelecionado(idioma);
                            }}
                        />

                        <Nivel2
                            nivelUsuario={nivelUsuario}
                            setTela={(tela) => {
                                setIdiomaSelecionado(null);
                                setTelaAtiva(tela);
                            }}
                        />

                        <Nivel1
                            nivelUsuario={nivelUsuario}
                            setTela={(tela) => {
                                setIdiomaSelecionado(null);
                                setTelaAtiva(tela);
                            }}
                        />
                        <br /><br /><br />

                    </div>
                )}

            </aside>

            {/* ÁREA DIREITA */}
            <section
                className={`painel-conteudo 
                ${sidebarRecolhida ? "modo-recolhido" : ""} 
                ${sidebarExpandidaFixa ? "modo-expandido-fixo" : ""}`}
            >

                {/* Se clicou Funcionarios */}
                {telaAtiva === "funcionarios" && (
                    <FuncionariosAdmin />
                )}

                {/* Se clicou idioma */}
                {!telaAtiva && idiomaSelecionado && (
                    <EditorApresentacao idioma={idiomaSelecionado} />
                )}

                {/* Se nada selecionado */}
                {!telaAtiva && !idiomaSelecionado && (
                    <div className="painel-placeholder"></div>
                )}
                {telaAtiva === "clientes" && (
                    <ClientesAdmin />
                )}
            </section>

        </main>
    );
}