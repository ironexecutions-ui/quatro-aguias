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

    const [salvando, setSalvando] = useState(false);

    const [produto, setProduto] = useState("");

    const [ocupados, setOcupados] = useState([]);

    const [msg, setMsg] = useState("");
    const funcionario = JSON.parse(
        localStorage.getItem("funcionario")
    );
    const carregarOcupados = async (tabela) => {

        try {

            const res = await fetch(
                `${API_URL}/galpao/ocupados/${tabela}`
            );

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

        return Math.floor(
            (d2 - d1) / (1000 * 60 * 60 * 24)
        );
    };

    const retirarProduto = async () => {

        try {

            setSalvando(true);

            const res = await fetch(
                `${API_URL}/galpao/saida/${modal.tabela}/${modal.id}`,
                {
                    method: "PUT"
                }
            );

            const data = await res.json();

            if (!res.ok) {

                setMsg(data.detail || "Erro ao retirar");

                setSalvando(false);

                return;
            }

            setMsg("Produto retirado com sucesso");

            setModal(null);

            setSalvando(false);

        } catch {

            setMsg("Erro ao conectar");

            setSalvando(false);
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

            const res = await fetch(
                `${API_URL}/galpao/verificar-produto/${produto}`
            );

            const data = await res.json();

            return data;

        } catch {

            return { erro: true };
        }
    };

    const enviar = async () => {

        try {

            setMsg("");

            const check = await verificarProduto();

            if (check.existe) {

                setModal(check);

                return;
            }

            let tabela = "";

            let body = {};

            // GALPÃO 1
            if (galpao === "1") {

                tabela = "galpaoum";

                body = {
                    andar,
                    plataforma,
                    produto,
                    id_funcionario: funcionario?.id
                };
            }

            // GALPÃO 2
            if (galpao === "2") {

                tabela = "galpaodois";

                body = {
                    area,
                    posicao,
                    produto,
                    id_funcionario: funcionario?.id
                };
            }

            // GALPÃO 3
            if (galpao === "3") {

                tabela = "galpaotres";

                body = {
                    posicao,
                    produto,
                    id_funcionario: funcionario?.id
                };
            }

            // GALPÃO 4
            if (galpao === "4") {

                tabela = "galpaoquatro";

                body = {
                    posicao,
                    produto,
                    id_funcionario: funcionario?.id
                };
            }

            const res = await fetch(
                `${API_URL}/galpao/entrada/${tabela}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(body)
                }
            );

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

            {/* 🔥 TOPO */}
            <div className="posicionar-topo-unico">

                <h2>
                    Posicionar Produto
                </h2>

                <p className="texto-info">
                    Escolha o galpão, selecione a posição
                    disponível e registre rapidamente
                    a localização do produto
                </p>

            </div>

            {/* 🔥 GALPÕES */}
            <div className="posicionar-secao-unica">

                <div className="posicionar-titulo-secao-unica">
                    Selecionar Galpão
                </div>

                <div className="grupo-botoes">

                    {[1, 2, 3, 4].map(g => (

                        <button
                            key={g}
                            className={
                                galpao === String(g)
                                    ? "ativo"
                                    : ""
                            }
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

                                carregarOcupados(
                                    tabelaMap[gStr]
                                );
                            }}
                        >
                            <span className="btn-mini-label-unico">
                                Galpão
                            </span>

                            <strong>
                                {g}
                            </strong>
                        </button>

                    ))}

                </div>

            </div>

            {/* 🔥 AVISO */}
            {!galpao && (

                <div className="posicionar-alerta-unico">

                    <strong>
                        Nenhum galpão selecionado
                    </strong>

                    <p>
                        Escolha um galpão para continuar
                    </p>

                </div>

            )}

            {/* ================= GALPÃO 1 ================= */}

            {galpao === "1" && (

                <div className="posicionar-secao-unica">

                    <div className="posicionar-titulo-secao-unica">
                        Escolher Andar
                    </div>

                    <div className="grupo-botoes">

                        {[1, 2].map(a => (

                            <button
                                key={a}
                                className={
                                    andar === String(a)
                                        ? "ativo"
                                        : ""
                                }
                                onClick={() => {

                                    setAndar(String(a));

                                    setPlataforma("");
                                }}
                            >
                                <span className="btn-mini-label-unico">
                                    Andar
                                </span>

                                <strong>
                                    {a}
                                </strong>
                            </button>

                        ))}

                    </div>

                    {andar && (

                        <>
                            <div className="posicionar-titulo-secao-unica">
                                Selecionar Box
                            </div>

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
                                            ${plataforma === String(p)
                                                    ? "ativo"
                                                    : ""
                                                }

                                            ${ocupado
                                                    ? "bloqueado"
                                                    : ""
                                                }
                                        `}
                                            onClick={() => {

                                                setPlataforma(
                                                    String(p)
                                                );
                                            }}
                                        >

                                            <span className="btn-mini-label-unico">
                                                Box
                                            </span>

                                            <strong>
                                                {p}
                                            </strong>

                                            {ocupado && (
                                                <small>
                                                    Ocupado
                                                </small>
                                            )}

                                        </button>

                                    );
                                })}

                            </div>
                        </>
                    )}

                </div>

            )}

            {/* ================= GALPÃO 2 ================= */}

            {galpao === "2" && (

                <div className="posicionar-secao-unica">

                    <div className="posicionar-titulo-secao-unica">
                        Selecionar Área
                    </div>

                    <div className="grupo-botoes">

                        {["A", "B", "C", "D", "E", "F"].map(a => (

                            <button
                                key={a}
                                className={
                                    area === a
                                        ? "ativo"
                                        : ""
                                }
                                onClick={() => {

                                    setArea(a);

                                    setPosicao("");
                                }}
                            >

                                <span className="btn-mini-label-unico">
                                    Área
                                </span>

                                <strong>
                                    {a}
                                </strong>

                            </button>

                        ))}

                    </div>

                    {area && (

                        <>
                            <div className="posicionar-titulo-secao-unica">
                                Selecionar Posição
                            </div>

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
                                            ${posicao === String(p)
                                                    ? "ativo"
                                                    : ""
                                                }

                                            ${ocupado
                                                    ? "bloqueado"
                                                    : ""
                                                }
                                        `}
                                            onClick={() => {

                                                setPosicao(
                                                    String(p)
                                                );
                                            }}
                                        >

                                            <span className="btn-mini-label-unico">
                                                Posição
                                            </span>

                                            <strong>
                                                {p}
                                            </strong>

                                            {ocupado && (
                                                <small>
                                                    Ocupado
                                                </small>
                                            )}

                                        </button>

                                    );
                                })}

                            </div>
                        </>
                    )}

                </div>

            )}

            {/* ================= GALPÃO 3 E 4 ================= */}

            {(galpao === "3" || galpao === "4") && (

                <div className="posicionar-secao-unica">

                    <div className="posicionar-titulo-secao-unica">
                        Selecionar Posição
                    </div>

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
                                    ${posicao === String(p)
                                            ? "ativo"
                                            : ""
                                        }

                                    ${ocupado
                                            ? "bloqueado"
                                            : ""
                                        }
                                `}
                                    onClick={() => {

                                        setPosicao(
                                            String(p)
                                        );
                                    }}
                                >

                                    <span className="btn-mini-label-unico">
                                        Posição
                                    </span>

                                    <strong>
                                        {p}
                                    </strong>

                                    {ocupado && (
                                        <small>
                                            Ocupado
                                        </small>
                                    )}

                                </button>

                            );
                        })}

                    </div>

                </div>

            )}

            {/* 🔥 PRODUTO */}

            {(plataforma || posicao) && (

                <div className="posicionar-produto-area-unica">

                    <div className="posicionar-titulo-secao-unica">
                        Inserir Produto
                    </div>

                    <input
                        type="number"
                        placeholder="Digite a nota fiscal ou código do produto"
                        value={produto}
                        onChange={(e) =>
                            setProduto(e.target.value)
                        }
                    />

                </div>

            )}

            {/* 🔥 BOTÃO */}

            {produto && (

                <button
                    className="botao-guardar"
                    onClick={enviar}
                >
                    Guardar Produto
                </button>

            )}

            {/* 🔥 MSG */}

            {msg && (

                <div className="posicionar-msg-unica">

                    {msg}

                </div>

            )}

            {/* 🔥 MODAL */}

            {modal && modal.existe && (

                <div className="modal-overlay">

                    <div className="modal-box">

                        <div className="modal-topo-unico">

                            <h3>
                                Produto já posicionado
                            </h3>

                            <p>
                                Esse produto já está salvo
                                em outro local
                            </p>

                        </div>

                        <div className="modal-info-box-unico">

                            <span>
                                Local Atual
                            </span>

                            <strong>
                                {modal.local}
                            </strong>

                        </div>

                        {modal.entrou && (

                            <div className="modal-info-box-unico">

                                <span>
                                    Tempo no Local
                                </span>

                                <strong>
                                    Há {diasPassados(modal.entrou)} dias
                                </strong>

                                <p>
                                    {formatarData(modal.entrou)}
                                </p>

                            </div>

                        )}

                        {/* 🔥 REALOCAR */}

                        <button
                            className="btn-retirar"
                            disabled={salvando}
                            onClick={async () => {

                                try {

                                    setSalvando(true);

                                    let tabela = "";

                                    if (galpao === "1") {
                                        tabela = "galpaoum";
                                    }

                                    if (galpao === "2") {
                                        tabela = "galpaodois";
                                    }

                                    if (galpao === "3") {
                                        tabela = "galpaotres";
                                    }

                                    if (galpao === "4") {
                                        tabela = "galpaoquatro";
                                    }

                                    const bodyRealocar = {
                                        nova_tabela: tabela,
                                        id_funcionario: funcionario?.id
                                    };

                                    if (galpao === "1") {

                                        bodyRealocar.andar = andar;

                                        bodyRealocar.plataforma = plataforma;
                                    }

                                    if (galpao === "2") {

                                        bodyRealocar.area = area;

                                        bodyRealocar.posicao = posicao;
                                    }

                                    if (
                                        galpao === "3" ||
                                        galpao === "4"
                                    ) {

                                        bodyRealocar.posicao = posicao;
                                    }

                                    const res = await fetch(
                                        `${API_URL}/galpao/realocar/${modal.tabela}/${modal.id}`,
                                        {
                                            method: "PUT",
                                            headers: {
                                                "Content-Type": "application/json"
                                            },
                                            body: JSON.stringify(bodyRealocar)
                                        }
                                    );

                                    const data = await res.json();

                                    if (!res.ok) {

                                        setMsg(
                                            data.detail ||
                                            "Erro ao realocar"
                                        );

                                        setSalvando(false);

                                        return;
                                    }

                                    setMsg(
                                        "Produto realocado com sucesso"
                                    );

                                    setModal(null);

                                    reset();

                                    setGalpao("");

                                    setSalvando(false);

                                } catch {

                                    setMsg(
                                        "Erro ao conectar"
                                    );

                                    setSalvando(false);
                                }
                            }}
                        >
                            {salvando
                                ? "Realocando..."
                                : "Realocar Produto"
                            }
                        </button>

                        {/* 🔥 FECHAR */}

                        <button
                            disabled={salvando}
                            onClick={() => setModal(null)}
                        >
                            Fechar
                        </button>

                    </div>

                </div>

            )}

        </div>
    );
}