import type { ReactElement } from "react";
import "../style/contenedor.css"


interface ContenedorEjemplosProps {
    contenido: ReactElement;
}

export const ContenedorEjemplos: React.FC<ContenedorEjemplosProps> = ({ contenido }) => {
    return (
        <div className="contenedor-ejemplos">
            {contenido}
        </div>
    );
}