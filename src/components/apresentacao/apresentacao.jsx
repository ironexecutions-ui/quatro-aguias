import React, { useEffect, useState, useMemo, useRef } from "react";
import Slide1 from "./slides/slide1";
import Slide2 from "./slides/slide2";
import Slide3 from "./slides/slide3";
import Slide4 from "./slides/slide4";
import Slide5 from "./slides/slide5";
import Slide6 from "./slides/slide6";
import { useParams } from "react-router-dom";


import { API_URL } from "../../config";
import "./apresentacao.css";

export default function Apresentacao() {

    const { idioma: idiomaURL } = useParams();

    const idiomasPermitidos = ["pt-BR", "en-US", "es-ES"];

    const idioma = idiomasPermitidos.includes(idiomaURL)
        ? idiomaURL
        : "pt-BR";

    const [dados, setDados] = useState(null);
    const [slideAtual, setSlideAtual] = useState(0);
    const [pausado, setPausado] = useState(false);
    const [segundos, setSegundos] = useState(8);
    const [countdown, setCountdown] = useState(segundos);
    const [mostrarControl, setMostrarControl] = useState(true);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 900);

    const containerRef = useRef(null);
    const bloqueioTroca = useRef(false);

    const slides = [
        Slide1,
        Slide2,
        Slide3,
        Slide4,
        Slide5,
        Slide6
    ];
    useEffect(() => {
        function handleResize() {
            setIsMobile(window.innerWidth < 900);
        }

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);
    useEffect(() => {

        if (!isMobile) {
            setMostrarControl(true);
            return;
        }

        let timeoutId;

        function iniciarTimer() {
            clearTimeout(timeoutId);

            timeoutId = setTimeout(() => {
                setMostrarControl(false);
            }, 3000);
        }

        function handleInteracao() {
            setMostrarControl(true);
            iniciarTimer();
        }

        window.addEventListener("touchstart", handleInteracao);
        window.addEventListener("mousedown", handleInteracao);

        iniciarTimer();

        return () => {
            window.removeEventListener("touchstart", handleInteracao);
            window.removeEventListener("mousedown", handleInteracao);
            clearTimeout(timeoutId);
        };

    }, [isMobile]);
    // 5 tipos de efeitos disponíveis
    const efeitosDisponiveis = [
        "fade",
        "slide-left",
        "slide-right",
        "zoom-in",
        "rotate-in"
    ];

    // Gera efeitos embaralhados diferentes a cada execução
    const efeitosPorSlide = useMemo(() => {
        const embaralhado = [...efeitosDisponiveis]
            .sort(() => Math.random() - 0.5);

        const resultado = [];

        for (let i = 0; i < slides.length; i++) {
            resultado.push(
                embaralhado[i % embaralhado.length]
            );
        }

        return resultado;
    }, []);
    useEffect(() => {

        if (!dados || pausado) return;

        if (slideAtual === slides.length - 1) {
            window.scrollTo({ top: 0 });
            return;
        }

        let animationFrame;
        const inicio = performance.now();
        const duracao = segundos * 1000;

        const alturaMaxima =
            document.documentElement.scrollHeight - window.innerHeight;

        function animar(tempoAtual) {

            const tempoDecorrido = tempoAtual - inicio;
            const progresso = Math.min(tempoDecorrido / duracao, 1);

            const posicao = alturaMaxima * progresso;

            window.scrollTo(0, posicao);

            if (progresso < 1 && !pausado) {
                animationFrame = requestAnimationFrame(animar);
            }
        }

        animationFrame = requestAnimationFrame(animar);

        return () => cancelAnimationFrame(animationFrame);

    }, [slideAtual, pausado, dados, segundos]);
    useEffect(() => {
        fetch(`${API_URL}/apresentacao/${idioma}`)
            .then(res => res.json())
            .then(data => setDados(data))
            .catch(() => setDados(null));
    }, [idioma]);

    useEffect(() => {

        if (!dados || pausado) return;

        // Se for o último slide, não inicia contagem
        if (slideAtual === slides.length - 1) {
            setCountdown(0);
            return;
        }

        setCountdown(segundos);

        const intervalo = setInterval(() => {

            setCountdown(prev => {

                if (prev <= 1 && !bloqueioTroca.current) {

                    bloqueioTroca.current = true;

                    setSlideAtual(current => {
                        if (current < slides.length - 1) {
                            return current + 1;
                        }
                        return current;
                    });

                    setTimeout(() => {
                        bloqueioTroca.current = false;
                    }, 100);

                    return segundos;
                }

                return prev - 1;
            });

        }, 1000);

        return () => clearInterval(intervalo);

    }, [pausado, dados, segundos, slideAtual]);
    function handleTouchPause(e) {
        if (!isMobile) return;

        const control = document.querySelector(".ap-control");

        if (control && control.contains(e.target)) return;

        // Só pausa se ainda não estiver pausado
        if (!pausado) {
            setPausado(true);
        }
    }


    if (!dados) return <h2 className="ap-loading">Carregando...</h2>;

    const SlideComponent = slides[slideAtual];

    return (
        <div
            className="ap-container"
            ref={containerRef}
            onTouchStart={handleTouchPause}
        >
            <div
                key={slideAtual}
                className={`ap-slide ${efeitosPorSlide[slideAtual]}`}
            >
                <SlideComponent dados={dados} />
            </div>

            {isMobile && !mostrarControl && (
                <button
                    className="ap-floating-control-btn"
                    onClick={() => setMostrarControl(true)}
                >
                    🎛
                </button>
            )}

            {(!isMobile || mostrarControl) && (
                <div className="ap-control">
                    {/* todo seu conteúdo do control fica aqui exatamente igual */}

                    {/* CONTAGEM REGRESSIVA */}
                    <div className="ap-countdown">
                        {slideAtual === slides.length - 1
                            ? "Último slide"
                            : `Próximo slide em ${countdown}s`}
                    </div>

                    {/* CONTROLE DE TEMPO */}
                    <div className="ap-time-wrapper">

                        <button
                            onClick={() => setSegundos(prev => Math.max(3, prev - 1))}
                            className="ap-time-btn"
                        >
                            −
                        </button>

                        <div className="ap-range-wrapper">

                            <input
                                type="range"
                                min="3"
                                max="10"
                                value={segundos}
                                onChange={(e) => setSegundos(Number(e.target.value))}
                                className="ap-time-range"
                            />

                            <div
                                className="ap-range-number"
                                style={{
                                    left: `${((segundos - 3) / 7) * 100}%`
                                }}
                            >
                                {segundos}
                            </div>

                        </div>
                        <button
                            onClick={() => setSegundos(prev => Math.min(10, prev + 1))}
                            className="ap-time-btn"
                        >
                            +
                        </button>

                    </div>

                    {/* PLAY / PAUSE */}
                    <button
                        onClick={() => setPausado(!pausado)}
                        className={`ap-play-btn ${pausado ? "paused" : ""}`}
                    >
                        {pausado ? "▶ Retomar" : "⏸ Pausar"}
                    </button>

                    {/* NAVEGAÇÃO MANUAL */}
                    <div className="ap-navigation">

                        <button
                            onClick={() => setSlideAtual(prev => Math.max(0, prev - 1))}
                            className="ap-nav-btn"
                        >
                            ←
                        </button>

                        <div className="ap-dots">
                            {slides.map((_, index) => (
                                <span
                                    key={index}
                                    onClick={() => setSlideAtual(index)}
                                    className={`ap-dot ${slideAtual === index ? "active" : ""}`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={() => setSlideAtual(prev => Math.min(slides.length - 1, prev + 1))}
                            className="ap-nav-btn"
                        >
                            →
                        </button>

                    </div>

                </div>
            )}
        </div>
    );
}