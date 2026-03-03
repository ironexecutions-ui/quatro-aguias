import React, { useEffect, useState } from "react";
import { API_URL } from "../../../../config";
import "./funcionariosadmin.css";

export default function ClientesAdmin() {

    const [usuarios, setUsuarios] = useState([]);
    const [usuarioExpandido, setUsuarioExpandido] = useState(null);
    const [filtroLista, setFiltroLista] = useState("");

    async function carregarUsuarios() {
        const res = await fetch(`${API_URL}/usuarios/clientes`);
        const data = await res.json();
        setUsuarios(data);
    }

    useEffect(() => {
        carregarUsuarios();
    }, []);

    function toggleExpand(id) {
        setUsuarioExpandido(usuarioExpandido === id ? null : id);
    }

    function montarFoto(user) {
        if (!user.foto_perfil) return "/perfil-placeholder.png";
        if (user.foto_perfil.startsWith("http")) return user.foto_perfil;
        return `${API_URL}${user.foto_perfil}`;
    }

    async function deletarUsuario(id) {
        await fetch(`${API_URL}/usuarios/deletar/${id}`, {
            method: "DELETE"
        });

        carregarUsuarios();
    }

    const usuariosFiltrados = usuarios.filter(user =>
        `${user.nome} ${user.sobrenome}`
            .toLowerCase()
            .includes(filtroLista.toLowerCase())
    );

    return (
        <div className="funcadmin-container">

            <h2 className="funcadmin-title">Lista de Clientes</h2>

            <input
                type="text"
                placeholder="Filtrar cliente por nome"
                value={filtroLista}
                onChange={(e) => setFiltroLista(e.target.value)}
                className="funcadmin-input"
            />

            <div className="funcadmin-list">

                {usuariosFiltrados.map(user => (
                    <div key={user.id} className="funcadmin-wrapper">

                        <div
                            className="funcadmin-card"
                            onClick={() => toggleExpand(user.id)}
                        >
                            <span>{user.nome} {user.sobrenome}</span>
                            <span className="funcadmin-email">{user.email}</span>
                        </div>

                        {usuarioExpandido === user.id && (
                            <div className="funcadmin-detalhes">

                                <div className="funcadmin-foto-area">
                                    <img
                                        src={montarFoto(user)}
                                        alt="Foto Perfil"
                                        className="funcadmin-avatar"
                                    />
                                </div>

                                <div><strong>ID:</strong> {user.id}</div>
                                <div><strong>Email:</strong> {user.email}</div>
                                <div><strong>Nível:</strong> {user.funcao_nivel}</div>
                                <div><strong>Termos:</strong> {user.termos === 1 ? "Aceito" : "Não aceito"}</div>

                                <div className="funcadmin-actions">

                                    <button
                                        className="funcadmin-btn-delete"
                                        onClick={() => deletarUsuario(user.id)}
                                    >
                                        Apagar Registro
                                    </button>

                                </div>

                            </div>
                        )}

                    </div>
                ))}

            </div>

        </div>
    );
}