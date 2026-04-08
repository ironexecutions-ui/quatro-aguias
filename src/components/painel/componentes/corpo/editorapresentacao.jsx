import React, { useEffect, useState, useRef } from "react";
import { API_URL } from "../../../../config";
import "./editorapresentacao.css";

export default function EditorApresentacao({ idioma }) {

    const [dados, setDados] = useState(null);
    const [salvando, setSalvando] = useState(false);
    const [mensagem, setMensagem] = useState("");
    const textareasRef = useRef({});
    const [previewAtivo, setPreviewAtivo] = useState(null);
    useEffect(() => {
        async function carregar() {
            try {
                const res = await fetch(`${API_URL}/apresentacao/painel/${encodeURIComponent(idioma)}`);
                const data = await res.json();
                setDados(data);
            } catch (erro) {
                console.error("Erro ao carregar:", erro);
            }
        }

        carregar();
    }, [idioma]);

    function autoResize(element) {
        if (!element) return;
        element.style.height = "auto";
        element.style.height = element.scrollHeight + "px";
    }

    function handleChange(campo, valor, element) {
        setDados(prev => ({
            ...prev,
            [campo]: valor
        }));

        autoResize(element);
    }
    function inserirNoCursor(campo, texto) {
        const textarea = textareasRef.current[campo];
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;

        const novoValor =
            dados[campo].substring(0, start) +
            texto +
            dados[campo].substring(end);

        setDados(prev => ({
            ...prev,
            [campo]: novoValor
        }));

        setTimeout(() => {
            textarea.focus();
            textarea.selectionStart = textarea.selectionEnd = start + texto.length;
            autoResize(textarea);
        }, 0);
    }
    async function salvar() {
        setSalvando(true);
        setMensagem("");

        try {
            const res = await fetch(`${API_URL}/apresentacao/painel/${encodeURIComponent(idioma)}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    imagem: dados.imagem,
                    um: dados.um,
                    dois: dados.dois,
                    tres: dados.tres,
                    quatro: dados.quatro,
                    cinco: dados.cinco,
                    seis: dados.seis
                })
            });

            if (!res.ok) throw new Error("Erro ao salvar");

            setMensagem("Salvo com sucesso ✔");
        } catch (erro) {
            setMensagem("Erro ao salvar");
        }

        setSalvando(false);

        setTimeout(() => {
            setMensagem("");
        }, 3000);
    }

    useEffect(() => {
        if (!dados) return;

        Object.values(textareasRef.current).forEach(el => {
            autoResize(el);
        });

    }, [dados]);

    if (!dados) {
        return (
            <div className="editor-loading">
                Carregando conteúdo...
            </div>
        );
    }

    return (
        <div className="editor-container-pro">

            <div className="editor-header">
                <h2>Editor de Apresentação</h2>
                <span className="editor-idioma-badge">
                    {dados.idioma}
                </span>
            </div>

            <div className="editor-imagem-area">

                <label>Imagem de Fundo</label>

                <input
                    type="text"
                    placeholder="Cole a URL da imagem"
                    value={dados.imagem || ""}
                    onChange={e => handleChange("imagem", e.target.value)}
                    className="editor-input-pro"
                />

                {dados.imagem && (
                    <div
                        className="editor-preview-imagem"
                        style={{ backgroundImage: `url(${dados.imagem})` }}
                    />
                )}

            </div>

            <div className="editor-slides-grid">

                {["um", "dois", "tres", "quatro", "cinco", "seis"].map((campo, index) => (

                    <div key={campo} className="editor-slide-card">

                        <label>Slide {index + 1}</label>


                        <textarea
                            ref={el => textareasRef.current[campo] = el}
                            value={dados[campo] || ""}
                            onFocus={() => setPreviewAtivo(campo)}
                            onBlur={() => setPreviewAtivo(null)}
                            onChange={e => handleChange(campo, e.target.value, e.target)}
                            className="editor-textarea-pro"
                        />

                        {previewAtivo === campo && (
                            <div className="editor-preview-box">
                                <div
                                    className="editor-preview-content"
                                    dangerouslySetInnerHTML={{ __html: dados[campo] || "" }}
                                />
                            </div>
                        )}

                    </div>

                ))}

            </div>

            <div className="editor-footer">

                <button
                    type="button"
                    onClick={salvar}
                    disabled={salvando}
                    className={`editor-btn-salvar ${salvando ? "editor-btn-loading" : ""}`}
                >
                    {salvando ? "Salvando..." : "Salvar Alterações"}
                </button>

                {mensagem && (
                    <div className="editor-mensagem">
                        {mensagem}
                    </div>
                )}

            </div>

        </div>
    );
}