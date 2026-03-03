import React, { useEffect, useRef, useState } from "react";
import "./rodape.css";

import emailIcon from "./imagens/email.png";
import zapIcon from "./imagens/zap.png";
import mapIcon from "./imagens/map.png";

export default function Rodape() {

    const footerRef = useRef(null);
    const [mostrarFlutuante, setMostrarFlutuante] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setMostrarFlutuante(!entry.isIntersecting);
            },
            { threshold: 0.1 }
        );

        if (footerRef.current) {
            observer.observe(footerRef.current);
        }

        return () => {
            if (footerRef.current) {
                observer.unobserve(footerRef.current);
            }
        };
    }, []);

    const abrirEmail = () => {
        window.location.href = "mailto:ruam_sales@quatroaguiastransportes.com";
    };

    const abrirWhats = () => {
        window.open("https://wa.me/5511957934372", "_blank");
    };

    const abrirMaps = () => {
        const endereco = encodeURIComponent("Av. Antranig Guerekmezian, 410 - Jardim Cumbica, Guarulhos - SP, 07240-130");
        window.open(`https://www.google.com/maps/search/?api=1&query=${endereco}`, "_blank");
    };

    return (
        <>
            <footer ref={footerRef} className="qa-footer-container">

                <div className="qa-footer-content">

                    <div className="qa-footer-col">
                        <h3 className="qa-footer-title">Quatro Águias</h3>
                        <p className="qa-footer-text">
                            Transporte e Logística com atuação no eixo
                            São Paulo x Rio de Janeiro.
                            Coletas diárias, entrega em até 3 dias úteis
                            e seguro total da carga.
                        </p>
                    </div>

                    <div className="qa-footer-col">
                        <h4 className="qa-footer-subtitle">Contato</h4>
                        <p
                            className="qa-footer-text qa-footer-clickable"
                            onClick={abrirWhats}
                        >
                            (11) 95793-4372
                        </p>

                        <p
                            className="qa-footer-text qa-footer-clickable"
                            onClick={abrirEmail}
                        >
                            ruam_sales@quatroaguiastransportes.com
                        </p>
                    </div>

                    <div className="qa-footer-col">
                        <h4 className="qa-footer-subtitle">Unidades</h4>
                        <p className="qa-footer-text">
                            Matriz RJ<br />
                            <span
                                className="qa-footer-clickable"
                                onClick={() =>
                                    window.open(
                                        "https://www.google.com/maps/place/R.+Gen.+Magalh%C3%A3es+Barata,+140+-+Pompeia,+S%C3%A3o+Paulo+-+SP,+05025-030/@-23.5306795,-46.6912872,17z/data=!3m1!4b1!4m5!3m4!1s0x94ce57e05e7f0071:0x7032e6c40fddf3f9!8m2!3d-23.5306844!4d-46.6887123?entry=ttu&g_ep=EgoyMDI2MDMwMS4xIKXMDSoASAFQAw%3D%3D",
                                        "_blank"
                                    )
                                }
                            >
                                Rua General Magalhães Barata, 140
                            </span>
                        </p>

                        <p className="qa-footer-text">
                            Filial SP<br />
                            <span
                                className="qa-footer-clickable"
                                onClick={() =>
                                    window.open(
                                        "https://www.google.com/maps/search/?api=1&query=Av.+Antranig+Guerekmezian,+410+-+Jardim+Cumbica,+Guarulhos+-+SP,+07240-130",
                                        "_blank"
                                    )
                                }
                            >
                                Av. Antranig Guerekmezian, 410
                            </span>
                        </p>
                    </div>

                    <div className="qa-footer-col">
                        <h4 className="qa-footer-subtitle">Links</h4>
                        <a href="/apresentacao" className="qa-footer-link">
                            Apresentação
                        </a>
                    </div>

                </div>

                <div className="qa-footer-bottom">
                    © {new Date().getFullYear()} Quatro Águias Transporte e Logística.
                    Todos os direitos reservados.
                </div>

            </footer>

            <div
                className={`qa-contato-flutuante ${mostrarFlutuante ? "qa-flutuante-ativo" : "qa-flutuante-inativo"
                    }`}
            >                    <button onClick={abrirEmail} className="qa-btn-flutuante">
                    <img src={emailIcon} alt="Email" />
                </button>

                <button onClick={abrirWhats} className="qa-btn-flutuante">
                    <img src={zapIcon} alt="WhatsApp" />
                </button>

                <button onClick={abrirMaps} className="qa-btn-flutuante">
                    <img className="qa-map-icon" src={mapIcon} alt="Maps" />
                </button>
            </div>
        </>
    );
}