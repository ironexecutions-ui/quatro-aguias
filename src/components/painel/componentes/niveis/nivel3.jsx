import React, { useState } from "react";
import { API_URL } from "../../../../config";

export default function Nivel3({
    nivelUsuario,
    idiomas,
    setIdiomaSelecionado
}) {

    const [menuAberto, setMenuAberto] = useState(false);

    if (nivelUsuario !== 3) return null;

    return (
        <div className="painel-admin-area">
            <h3 className="painel-nivel-title">Desenvolvimento</h3>

            <button
                className="painel-menu-btn"
                onClick={() => setMenuAberto(!menuAberto)}
            >
                Apresentações
            </button>

            {menuAberto && (
                <div className="painel-submenu">
                    {idiomas.map((item) => (
                        <button
                            key={item.id}
                            className="painel-sub-btn"
                            onClick={async () => {
                                const response = await fetch(
                                    `${API_URL}/apresentacao/painel/${item.idioma}`
                                );
                                const data = await response.json();
                                setIdiomaSelecionado(data);
                            }}
                        >
                            {item.idioma.toUpperCase()}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}