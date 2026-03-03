import React, { useEffect, useState } from "react";
import "./Beneficios.css";

export default function Beneficios() {

    const [ativo, setAtivo] = useState(0);

    const beneficios = [
        "Coletas diárias Rio x São Paulo",
        "Entrega em até 3 dias úteis",
        "Seguro 100% Porto Seguro",
        "Frota própria e controle de risco",
        "Atuação desde 2010",
        "Cobertura Interestadual",
        "Gerenciamento de risco OT NET",
        "Transporte fracionado e dedicado"
    ];

    useEffect(() => {
        const intervalo = setInterval(() => {
            setAtivo((prev) => (prev + 1) % beneficios.length);
        }, 3000);

        return () => clearInterval(intervalo);
    }, [beneficios.length]);

    return (
        <div className="qa-beneficios-container">

            <h1 className="qa-beneficios-title">
                Quatro Águias
            </h1>

            <h2 className="qa-beneficios-subtitle">
                Transporte e Logística com Segurança e Eficiência
            </h2>

            <div className="qa-beneficios-circle">
                {beneficios.map((item, index) => (
                    <div
                        key={index}
                        className={`qa-beneficio-item ${index === ativo ? "qa-beneficio-ativo" : ""
                            }`}
                        style={{
                            transform: `translateY(${(index - ativo) * 50}px)`
                        }}
                    >
                        {item}
                    </div>
                ))}
            </div>

        </div>
    );
}