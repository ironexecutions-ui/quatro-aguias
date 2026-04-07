import React, { useState } from "react";
import "./nf.css";

export default function LeitorXMLDrag() {

    const [empresa, setEmpresa] = useState("");
    const [cliente, setCliente] = useState("");
    const [produtos, setProdutos] = useState([]);
    const [volumes, setVolumes] = useState(0);
    const [valorServico, setValorServico] = useState(0);

    function processarXML(xmlText) {

        const parser = new DOMParser();
        const doc = parser.parseFromString(xmlText, "text/xml");

        const nomes = doc.getElementsByTagName("xNome");

        const emitente = nomes[0]?.textContent || "";
        const destinatario = nomes[1]?.textContent || "";

        const listaProdutos = [];
        const itens = doc.getElementsByTagName("det");

        for (let i = 0; i < itens.length; i++) {

            const nome =
                itens[i].getElementsByTagName("xProd")[0]?.textContent;

            const qtd =
                itens[i].getElementsByTagName("qCom")[0]?.textContent;

            const valor =
                itens[i].getElementsByTagName("vProd")[0]?.textContent;

            listaProdutos.push({
                nome,
                qtd,
                valor
            });
        }

        const totalVolumes = itens.length;

        let valor;

        if (totalVolumes <= 11) {
            valor = 23;
        } else {
            valor = totalVolumes * 2.3;
        }

        setEmpresa(emitente);
        setCliente(destinatario);
        setProdutos(listaProdutos);
        setVolumes(totalVolumes);
        setValorServico(valor);
    }

    function handleDrop(e) {

        e.preventDefault();

        const arquivo = e.dataTransfer.files[0];

        if (!arquivo) return;

        const reader = new FileReader();

        reader.onload = function (evento) {
            processarXML(evento.target.result);
        };

        reader.readAsText(arquivo);
    }

    function handleDragOver(e) {
        e.preventDefault();
    }

    return (

        <div className="nfe_container">

            <h2 className="nfe_titulo">
                Arraste o XML da NF-e
            </h2>

            <div
                className="nfe_drop"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
            >
                Arraste o arquivo XML aqui
            </div>

            {empresa && (

                <div className="nfe_resultado">

                    <h3>Emitente</h3>
                    <p>{empresa}</p>

                    <h3>Cliente</h3>
                    <p>{cliente}</p>

                    <h3>Volumes</h3>
                    <p>{volumes}</p>

                    <h3>Valor do serviço</h3>
                    <p>R$ {valorServico.toFixed(2)}</p>

                </div>

            )}

        </div>
    );
}