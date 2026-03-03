import React from "react";
import "./loading.css";

export default function Loading() {
    return (
        <div className="loading-overlay-mail">

            <div className="loading-container-mail">

                <div className="loading-spinner-mail"></div>

                <p className="loading-text-mail">
                    Espere, carregando...
                </p>

            </div>

        </div>
    );
}