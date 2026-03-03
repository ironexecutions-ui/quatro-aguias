import React, { useEffect, useState } from "react";
import HeaderPainel from "./componentes/headerpainel";
import CorpoPainel from "./componentes/corpopainel";
import './paineledicao.css'
export default function Painelacesso() {

    const [dispositivoAutorizado, setDispositivoAutorizado] = useState(true);

    useEffect(() => {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;

        // Detecta dispositivos móveis
        if (/android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent)) {
            setDispositivoAutorizado(false);
        }
    }, []);

    if (!dispositivoAutorizado) {
        return (
            <div className="painel-bloqueado-container">
                <div className="painel-bloqueado-card">
                    <h1 className="painel-bloqueado-titulo">
                        Acesso restrito
                    </h1>

                    <p className="painel-bloqueado-texto">
                        Este painel administrativo não está disponível para dispositivos móveis.
                    </p>

                    <p className="painel-bloqueado-sub">
                        Utilize um computador ou notebook autorizado.
                    </p>
                </div>
            </div>
        );
    }

    return (


        <div className="painel-layout">
            <HeaderPainel />
            <CorpoPainel />
        </div>


    );
}