import React from "react";

export default function Nivel2({ nivelUsuario, setTela }) {

    if (nivelUsuario < 2) return null;

    return (
        <div className="painel-nivel2-area">
            <h3 className="painel-nivel-title">Gestão</h3>

            <button
                className="painel-menu-btn"
                onClick={() => setTela("funcionarios")}
            >
                Funcionarios
            </button>
        </div>
    );
}