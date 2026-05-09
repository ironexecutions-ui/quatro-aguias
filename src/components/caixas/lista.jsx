import React, { useEffect, useState } from "react";
import { API_URL } from "../../config";
import "./lista.css";

export default function Lista() {

    const [listaProdutos, setListaProdutos] = useState([]);

    const [dados, setDados] = useState([]);

    const [filtro, setFiltro] = useState("");

    // 🔥 CALCULAR DIAS
    const diasPassados = (data) => {

        if (!data) return 0;

        const d1 = new Date(data);

        const d2 = new Date();

        return Math.floor(
            (d2 - d1) / (1000 * 60 * 60 * 24)
        );
    };

    // 🔥 FORMATAR DATA
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

    // 🔥 CARREGAR PRODUTOS
    useEffect(() => {

        const carregarProdutos = async () => {

            try {

                const res = await fetch(
                    `${API_URL}/produtos/listar`
                );

                const data = await res.json();

                setListaProdutos(data);

            } catch {

                console.log(
                    "erro ao carregar produtos"
                );
            }
        };

        carregarProdutos();

    }, []);

    // 🔥 CARREGAR LISTA
    const carregar = async () => {

        try {

            const res = await fetch(
                `${API_URL}/galpao/listar`
            );

            const data = await res.json();

            setDados(data);

        } catch {

            alert("Erro ao carregar");
        }
    };

    useEffect(() => {

        carregar();

    }, []);

    // 🔥 RETIRAR PRODUTO
    const retirar = async (item) => {

        try {

            const res = await fetch(
                `${API_URL}/galpao/saida/${item.tabela}/${item.id}`,
                {
                    method: "PUT"
                }
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

    // 🔥 FILTRO
    const filtrados = dados.filter(d =>
        d.produto?.toString().includes(filtro)
    );

    return (

        <div className="lista_container_principal_unica">

            {/* 🔥 TOPO */}
            <div className="lista_topo_area_unica">

                <h2 className="lista_titulo_principal_unico">
                    Produtos nos Galpões
                </h2>

                <p className="lista_subtitulo_principal_unico">
                    Visualize rapidamente localização,
                    status e movimentações dos produtos
                </p>

            </div>

            {/* 🔥 BUSCA */}
            <div className="lista_busca_area_unica">

                <input
                    type="text"
                    list="produtos-lista"
                    placeholder="Buscar por nota fiscal..."
                    value={filtro}
                    onChange={(e) =>
                        setFiltro(e.target.value)
                    }
                    className="lista_input_busca_unico"
                />

                <datalist id="produtos-lista">

                    {listaProdutos.map((p, i) => (

                        <option
                            key={i}
                            value={p}
                        />

                    ))}

                </datalist>

            </div>

            {/* 🔥 LISTA */}
            <div className="lista_cards_area_unica">

                {filtrados.map((item) => {

                    const status = item.saiu
                        ? item.realocado === 1
                            ? "REALOCADO"
                            : "RETIRADO"
                        : "ATIVO";

                    return (

                        <div
                            key={`${item.tabela}-${item.id}`}
                            className={`
                                lista_card_produto_unico
                                ${item.saiu
                                    ? "lista_card_retirado_unico"
                                    : "lista_card_ativo_unico"
                                }
                            `}
                            onClick={(e) => {

                                if (
                                    e.target.closest(".lista_btn_retirar_unico")
                                ) {
                                    return;
                                }

                                setFiltro(
                                    String(item.produto)
                                );
                            }}
                        >

                            {/* 🔥 STATUS */}
                            <div className="lista_status_topo_unico">

                                <span className={`
                                    lista_badge_status_unico
                                    ${item.saiu
                                        ? "lista_badge_retirado_unico"
                                        : "lista_badge_ativo_unico"
                                    }
                                `}>
                                    {status}
                                </span>

                            </div>

                            {/* 🔥 CABEÇALHO */}
                            <div className="lista_cabecalho_card_unico">

                                <h3>
                                    Nota Fiscal #{item.produto}
                                </h3>

                                <p className="lista_nome_galpao_unico">
                                    {item.galpao}
                                </p>

                            </div>

                            {/* 🔥 GRID INFO */}
                            <div className="lista_grid_info_unico">

                                {item.funcionario_nome && (
                                    <div className="lista_box_info_unico">

                                        <span>
                                            Funcionário
                                        </span>

                                        <strong>
                                            {item.funcionario_nome}
                                        </strong>

                                    </div>
                                )}

                                {item.andar && (
                                    <div className="lista_box_info_unico">

                                        <span>
                                            Andar
                                        </span>

                                        <strong>
                                            {item.andar}
                                        </strong>

                                    </div>
                                )}

                                {item.plataforma && (
                                    <div className="lista_box_info_unico">

                                        <span>
                                            Plataforma
                                        </span>

                                        <strong>
                                            {item.plataforma}
                                        </strong>

                                    </div>
                                )}

                                {item.area && (
                                    <div className="lista_box_info_unico">

                                        <span>
                                            Área
                                        </span>

                                        <strong>
                                            {item.area}
                                        </strong>

                                    </div>
                                )}

                                {item.posicao && (
                                    <div className="lista_box_info_unico">

                                        <span>
                                            Posição
                                        </span>

                                        <strong>
                                            {item.posicao}
                                        </strong>

                                    </div>
                                )}

                            </div>

                            {/* 🔥 DATAS */}
                            <div className="lista_datas_area_unica">

                                {/* ENTRADA */}
                                <div className="lista_box_data_unico">

                                    <span>
                                        Entrada no galpão
                                    </span>

                                    <strong>
                                        Há {diasPassados(item.entrou)} dias
                                    </strong>

                                    <p>
                                        {formatarData(item.entrou)}
                                    </p>

                                </div>

                                {/* SAÍDA */}
                                {item.saiu && (

                                    <div className="
                                        lista_box_data_unico
                                        lista_box_saida_unico
                                    ">

                                        <span>
                                            {
                                                item.realocado === 1
                                                    ? "Realocado"
                                                    : "Retirado"
                                            }
                                        </span>

                                        <strong>
                                            Há {diasPassados(item.saiu)} dias
                                        </strong>

                                        <p>
                                            {formatarData(item.saiu)}
                                        </p>

                                    </div>

                                )}

                            </div>

                            {/* 🔥 BOTÃO */}
                            {!item.saiu && (

                                <button
                                    className="lista_btn_retirar_unico"
                                    onClick={() => retirar(item)}
                                >
                                    Retirar Produto
                                </button>

                            )}

                        </div>
                    );
                })}

                {/* 🔥 VAZIO */}
                {filtrados.length === 0 && (

                    <div className="lista_vazia_unica">

                        <h3>
                            Nenhum produto encontrado
                        </h3>

                        <p>
                            Tente buscar outra nota fiscal
                        </p>

                    </div>

                )}

            </div>

        </div>
    );
}