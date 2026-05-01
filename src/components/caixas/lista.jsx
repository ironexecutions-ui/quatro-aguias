import React, { useEffect, useState } from "react";
import { API_URL } from "../../config";
import "./lista.css";

export default function Lista() {
    const [listaProdutos, setListaProdutos] = useState([]);
    const [dados, setDados] = useState([]);
    const [filtro, setFiltro] = useState("");

    // 🔥 calcular dias
    const diasPassados = (data) => {
        if (!data) return 0;

        const d1 = new Date(data);
        const d2 = new Date();

        return Math.floor((d2 - d1) / (1000 * 60 * 60 * 24));
    };
    useEffect(() => {
        const carregarProdutos = async () => {
            try {
                const res = await fetch(`${API_URL}/produtos/listar`);
                const data = await res.json();
                setListaProdutos(data);
            } catch {
                console.log("erro ao carregar produtos");
            }
        };

        carregarProdutos();
    }, []);
    const carregar = async () => {
        try {
            const res = await fetch(`${API_URL}/galpao/listar`);
            const data = await res.json();
            setDados(data);
        } catch {
            alert("Erro ao carregar");
        }
    };

    useEffect(() => {
        carregar();
    }, []);
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
    const retirar = async (item) => {
        try {
            const res = await fetch(
                `${API_URL}/galpao/saida/${item.tabela}/${item.id}`,
                { method: "PUT" }
            );

            if (!res.ok) {
                alert("Erro ao retirar");
                return;
            }

            carregar();

        } catch {
            alert("Erro ao conectar");
        }
    };

    const filtrados = dados.filter(d =>
        d.produto?.toString().includes(filtro)
    );

    return (
        <div className="lista-container">

            <h2>Produtos nos Galpões</h2>

            <input
                type="text"
                list="produtos-lista"
                placeholder="Filtrar produto"
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
            />

            <datalist id="produtos-lista">
                {listaProdutos.map((p, i) => (
                    <option key={i} value={p} />
                ))}
            </datalist>

            <div className="lista-box">

                {filtrados.map((item) => (
                    <div
                        key={`${item.tabela}-${item.id}`}
                        className={`card ${item.saiu ? "retirado" : ""}`}
                    >

                        <h3>Nota Fiscal: {item.produto}</h3>
                        <p>{item.galpao}</p>

                        {item.andar && <p>Andar: {item.andar}</p>}
                        {item.plataforma && <p>Plataforma: {item.plataforma}</p>}
                        {item.area && <p>Área: {item.area}</p>}
                        {item.posicao && <p>Posição: {item.posicao}</p>}

                        {/* TEMPO */}
                        {item.entrou && (
                            <>
                                <p>Entrou há {diasPassados(item.entrou)} dias</p>
                                <p className="data-detalhe">
                                    {formatarData(item.entrou)}
                                </p>
                            </>
                        )}

                        {item.saiu && (
                            <>
                                <p>Retirado há {diasPassados(item.saiu)} dias</p>
                                <p className="data-detalhe">
                                    {formatarData(item.saiu)}
                                </p>
                            </>
                        )}

                        {/* BOTÃO */}
                        {!item.saiu && (
                            <button
                                className="btn-retirar"
                                onClick={() => retirar(item)}
                            >
                                Retirar
                            </button>
                        )}

                    </div>
                ))}

                {filtrados.length === 0 && (
                    <p>Nenhuma Nota Fiscal encontrada</p>
                )}

            </div>

        </div>
    );
}