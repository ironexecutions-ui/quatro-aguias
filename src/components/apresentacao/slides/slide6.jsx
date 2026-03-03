import React, { useEffect, useMemo } from "react";

export default function Slide6({ dados }) {

    function processarHTML(html) {

        if (!html) return "";

        let texto = html;

        // 1. Transformar email em link + botão copiar
        texto = texto.replace(
            /\b([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]{5,}\.com)\b/gi,
            (email) => {
                return `
                    <span style="display:inline-flex;align-items:center;gap:6px;">
                        <a href="mailto:${email}" style="cursor:pointer;">
                            ${email}
                        </a>
                        <button 
                            data-copy="${email}"
                            style="
                                cursor:pointer;
                                border:none;
                                background:transparent;
                                font-size:14px;
                            "
                        >
                            📋
                        </button>
                    </span>
                `;
            }
        );

        // 2. Responsividade apenas se menor que 900px
        if (window.innerWidth < 900) {

            const div = document.createElement("div");
            div.innerHTML = texto;

            div.querySelectorAll("*").forEach(el => {

                if (el.style.fontSize) el.style.fontSize = null;
                if (el.style.padding) el.style.padding = null;
                if (el.style.maxWidth) el.style.maxWidth = null;
                if (el.style.minWidth) el.style.minWidth = null;
                if (el.style.width) el.style.width = null;

            });

            return div.innerHTML;
        }

        return texto;
    }

    useEffect(() => {

        function handleClick(e) {
            const target = e.target;

            if (target.dataset.copy) {
                const texto = target.dataset.copy;

                navigator.clipboard.writeText(texto);

                target.innerText = "✔";

                setTimeout(() => {
                    target.innerText = "📋";
                }, 1500);
            }
        }

        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };

    }, []);

    const htmlProcessado = useMemo(() => {
        return processarHTML(dados.seis);
    }, [dados.seis]);

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