export default function Nivel1({ nivelUsuario, setTela }) {

    if (nivelUsuario < 1) return null;

    return (
        <div className="painel-nivel1-area">
            <h3 className="painel-nivel-title">Relatórios</h3>

            <button
                className="painel-menu-btn"
                onClick={() => setTela("clientes")}
            >
                Clientes
            </button>
        </div>
    );
}