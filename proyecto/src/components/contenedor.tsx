import type { ReactElement } from "react";


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