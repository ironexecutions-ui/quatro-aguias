import React, { useState } from "react";
import { API_URL } from "../../config";
import "./posicionar.css";

export default function Posicionar() {
    const [modal, setModal] = useState(null);
    const [galpao, setGalpao] = useState("");
    const [andar, setAndar] = useState("");
    const [plataforma, setPlataforma] = useState("");
    const [area, setArea] = useState("");
    const [posicao, setPosicao] = useState("");
    const [produto, setProduto] = useState("");
    const [ocupados, setOcupados] = useState([]);
    const [msg, setMsg] = useState("");
    const carregarOcupados = async (tabela) => {
        try {
            const res = await fetch(`${API_URL}/galpao/ocupados/${tabela}`);
            const data = await res.json();

            setOcupados(data);
        } catch {
            console.log("erro ao buscar ocupados");
        }
    };
    const diasPassados = (data) => {
        if (!data) return 0;

        const d1 = new Date(data);
        const d2 = new Date();

        return Math.floor((d2 - d1) / (1000 * 60 * 60 * 24));
    };
    const retirarProduto = async () => {
        try {
            const res = await fetch(
                `${API_URL}/galpao/saida/${modal.tabela}/${modal.id}`,
                { method: "PUT" }
            );

            if (!res.ok) {
                alert("Erro ao retirar");
                return;
            }

            setModal(null);

        } catch {
            alert("Erro ao conectar");
        }
    };
    const reset = () => {
        setAndar("");
        setPlataforma("");
        setArea("");
        setPosicao("");
        setProduto("");
    };
    const verificarProduto = async () => {
        try {
            const res = await fetch(`${API_URL}/galpao/verificar-produto/${produto}`);
            const data = await res.json();

            return data;
        } catch {
            return { erro: true };
        }
    };
    const enviar = async () => {
        try {
            setMsg("");

            // 🔥 valida produto antes
            const check = await verificarProduto();

            if (check.existe) {
                setModal(check); return;
            }

            let tabela = "";
            let body = {};

            if (galpao === "1") {
                tabela = "galpaoum";
                body = { andar, plataforma, produto };
            }

            if (galpao === "2") {
                tabela = "galpaodois";
                body = { area, posicao, produto };
            }

            if (galpao === "3") {
                tabela = "galpaotres";
                body = { posicao, produto };
            }

            if (galpao === "4") {
                tabela = "galpaoquatro";
                body = { posicao, produto };
            }

            const res = await fetch(`${API_URL}/galpao/entrada/${tabela}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            const data = await res.json();

            if (!res.ok) {
                setMsg(data.detail || "Erro ao salvar");
                return;
            }

            setMsg("Salvo com sucesso");
            reset();
            setGalpao("");

        } catch {
            setMsg("Erro ao conectar");
        }
    };
    const formatarData = (data) => {
        if (!data) return "";

        const d = new Date(data);

        return d.toLocaleString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };
    return (
        <div className="posicionar-container">

            <h2>Posicionar Produto</h2>

            {/* GALPÕES */}
            <div className="grupo-botoes">
                {[1, 2, 3, 4].map(g => (
                    <button
                        key={g}
                        className={galpao === String(g) ? "ativo" : ""}
                        onClick={() => {
                            const tabelaMap = {
                                "1": "galpaoum",
                                "2": "galpaodois",
                                "3": "galpaotres",
                                "4": "galpaoquatro"
                            };

                            const gStr = String(g);

                            setGalpao(gStr);
                            reset();
                            carregarOcupados(tabelaMap[gStr]);
                        }}
                    >
                        Galpão {g}
                    </button>
                ))}
            </div>

            {!galpao && (
                <p className="texto-info">
                    Selecione um galpão para continuar
                </p>
            )}

            {/* ================= GALPÃO 1 ================= */}
            {galpao === "1" && (
                <>
                    <div className="grupo-botoes">
                        {[1, 2].map(a => (
                            <button
                                key={a}
                                className={andar === String(a) ? "ativo" : ""}
                                onClick={() => {
                                    setAndar(String(a));
                                    setPlataforma("");
                                }}
                            >
                                Andar {a}
                            </button>
                        ))}
                    </div>

                    {andar && (
                        <div className="grupo-botoes">
                            {(andar === "1"
                                ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
                                : [1, 2]
                            ).map(p => {

                                const ocupado = ocupados.some(o =>
                                    o.andar === andar &&
                                    o.plataforma === String(p)
                                );

                                return (
                                    <button
                                        key={p}
                                        disabled={ocupado}
                                        className={`
                                        ${plataforma === String(p) ? "ativo" : ""}
                                        ${ocupado ? "bloqueado" : ""}
                                    `}
                                        onClick={() => setPlataforma(String(p))}
                                    >
                                        P{p}
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </>
            )}

            {/* ================= GALPÃO 2 ================= */}
            {galpao === "2" && (
                <>
                    <div className="grupo-botoes">
                        {["A", "B", "C", "D", "E", "F"].map(a => (
                            <button
                                key={a}
                                className={area === a ? "ativo" : ""}
                                onClick={() => {
                                    setArea(a);
                                    setPosicao("");
                                }}
                            >
                                {a}
                            </button>
                        ))}
                    </div>

                    {area && (
                        <div className="grupo-botoes">
                            {[1, 2, 3, 4, 5, 6, 7].map(p => {

                                const ocupado = ocupados.some(o =>
                                    o.area === area &&
                                    o.posicao === String(p)
                                );

                                return (
                                    <button
                                        key={p}
                                        disabled={ocupado}
                                        className={`
                                        ${posicao === String(p) ? "ativo" : ""}
                                        ${ocupado ? "bloqueado" : ""}
                                    `}
                                        onClick={() => setPosicao(String(p))}
                                    >
                                        {p}
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </>
            )}

            {/* ================= GALPÃO 3 e 4 ================= */}
            {(galpao === "3" || galpao === "4") && (
                <div className="grupo-botoes">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(p => {

                        const ocupado = ocupados.some(o =>
                            o.posicao === String(p)
                        );

                        return (
                            <button
                                key={p}
                                disabled={ocupado}
                                className={`
                                ${posicao === String(p) ? "ativo" : ""}
                                ${ocupado ? "bloqueado" : ""}
                            `}
                                onClick={() => setPosicao(String(p))}
                            >
                                {p}
                            </button>
                        );
                    })}
                </div>
            )}

            {/* PRODUTO */}
            {(plataforma || posicao) && (
                <input
                    type="number"
                    placeholder="Produto"
                    value={produto}
                    onChange={(e) => setProduto(e.target.value)}
                />
            )}

            {/* BOTÃO FINAL */}
            {produto && (
                <button className="botao-guardar" onClick={enviar}>
                    Guardar
                </button>
            )}

            {msg && <p>{msg}</p>}
            {modal && modal.existe && (
                <div className="modal-overlay">
                    <div className="modal-box">

                        <h3>Produto já posicionado</h3>

                        <p>{modal.local}</p>

                        {modal.entrou && (
                            <>
                                <p>
                                    Está no local há {diasPassados(modal.entrou)} dias
                                </p>
                                <p className="data-detalhe">
                                    {formatarData(modal.entrou)}
                                </p>
                            </>
                        )}
                        <button
                            className="btn-retirar"
                            onClick={retirarProduto}
                        >
                            Retirar do local
                        </button>

                        <button onClick={() => setModal(null)}>
                            Fechar
                        </button>

                    </div>
                </div>
            )}
        </div>
    );

}