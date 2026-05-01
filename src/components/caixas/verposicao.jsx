import React, { useState } from "react";
import { useEffect } from "react";

import { API_URL } from "../../config";
import "./verposicao.css";

export default function Verposicao() {

    const [produto, setProduto] = useState("");
    const [resultado, setResultado] = useState(null);
    const [erro, setErro] = useState("");
    const [loading, setLoading] = useState(false);
    const [listaProdutos, setListaProdutos] = useState([]);
    // 🔥 calcular dias
    const calcularDias = (data) => {
        if (!data) return null;

        const d1 = new Date(data);
        const d2 = new Date();

        const diff = Math.floor((d2 - d1) / (1000 * 60 * 60 * 24));
        return diff;
    };

    useEffect(() => {
        const carregar = async () => {
            try {
                const res = await fetch(`${API_URL}/produtos/listar`);
                const data = await res.json();
                setListaProdutos(data);
            } catch {
                console.log("erro ao carregar produtos");
            }
        };

        carregar();
    }, []);
    // 🔍 buscar produto
    const buscar = async () => {
        try {
            setLoading(true);
            setErro("");
            setResultado(null);

            const res = await fetch(`${API_URL}/galpao/buscar/${produto}`);
            const data = await res.json();

            if (!res.ok) {
                setErro(data.detail || "Não encontrado");
                return;
            }

            setResultado(data);

        } catch {
            setErro("Erro ao conectar");
        } finally {
            setLoading(false);
        }
    };

    // 🚪 retirar produto
    const retirar = async () => {
        try {
            const res = await fetch(
                `${API_URL}/galpao/saida/${resultado.tabela}/${resultado.id}`,
                { method: "PUT" }
            );

            const data = await res.json();

            if (!res.ok) {
                alert(data.detail || "Erro ao retirar");
                return;
            }

            // 🔥 atualiza estado local
            setResultado({
                ...resultado,
                saiu: new Date().toISOString()
            });

        } catch {
            alert("Erro ao conectar");
        }
    };

    return (
        <div className="verposicao-container">

            <h2>Buscar Produto</h2>

            <input
                type="number"
                list="produtos-lista"
                placeholder="Digite ou selecione o produto"
                value={produto}
                onChange={(e) => setProduto(e.target.value)}
            />

            <datalist id="produtos-lista">
                {listaProdutos.map((p, i) => (
                    <option key={i} value={p} />
                ))}
            </datalist>

            <button onClick={buscar} disabled={loading}>
                {loading ? "Buscando..." : "Buscar"}
            </button>

            {/* RESULTADO */}
            {resultado && (
                <div className="resultado-box">

                    <h3>{resultado.galpao}</h3>

                    {resultado.andar && (
                        <p>Andar: {resultado.andar}</p>
                    )}

                    {resultado.plataforma && (
                        <p>Plataforma: {resultado.plataforma}</p>
                    )}

                    {resultado.area && (
                        <p>Área: {resultado.area}</p>
                    )}

                    {resultado.posicao && (
                        <p>Posição: {resultado.posicao}</p>
                    )}

                    {/* TEMPO */}
                    {resultado.entrou && (
                        <p>
                            Entrou há {calcularDias(resultado.entrou)} dias
                        </p>
                    )}

                    {resultado.saiu && (
                        <p>
                            Saiu há {calcularDias(resultado.saiu)} dias
                        </p>
                    )}

                    {/* BOTÃO RETIRAR */}
                    {!resultado.saiu && (
                        <button
                            className="btn-retirar"
                            onClick={retirar}
                        >
                            Retirar do local
                        </button>
                    )}

                </div>
            )}

            {erro && (
                <p className="erro">{erro}</p>
            )}

        </div>
    );
}