import React, { useMemo } from "react";

export default function Slide1({ dados }) {

    function limparResponsivo(html) {
        if (window.innerWidth >= 900) {
            return html;
        }

        const div = document.createElement("div");
        div.innerHTML = html;

        div.querySelectorAll("*").forEach(el => {

            if (el.style.fontSize) el.style.fontSize = null;
            if (el.style.padding) el.style.padding = null;
            if (el.style.minWidth) el.style.minWidth = null;

            // NÃO remover width e maxWidth
            // Isso estava quebrando o controle da imagem

        });

        return div.innerHTML;
    }

    const htmlProcessado = useMemo(() => {
        return limparResponsivo(dados.um);
    }, [dados.um]);

    return (
        <section className="ap-slide-professional-section">

            <div
                className="ap-slide-bg"
                style={{
                    backgroundImage: dados.imagem ? `url(${dados.imagem})` : "none",
                    filter: "brightness(0.3)"
                }}
            />

            <div className="ap-slide-overlay" />

            <div className="ap-slide-content">
                <div
                    className="ap-slide-inner"
                    dangerouslySetInnerHTML={{ __html: htmlProcessado }}
                />
            </div>

        </section>
    );
}