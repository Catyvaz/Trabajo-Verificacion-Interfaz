import type { JSX, ReactElement } from "react";
import { type ItemsProps } from "../App";
import { Link } from "react-router-dom";
import "../style/sidenav.css";
import { MensajeConsigna } from "./mensajes";
import Button from "@mui/joy/Button";

interface SidenavProps {
  listaItems: ItemsProps[];
  contenido: ReactElement;
  titulo?: string;
  consigna?: string;
}

export const Sidenav = ({
  listaItems,
  contenido,
  titulo,
  consigna,
}: SidenavProps): JSX.Element => {
  const handleConsigna = () => {
    if (consigna) {
      MensajeConsigna(consigna);
    } else {
      MensajeConsigna("No hay consigna disponible");
    }
  };

  return (
    <>
      <div className="contenedor-principal">
        <ul className="contenedor-lista-elementos">
          {listaItems.map((item) => (
            <li key={item.id}>
              <Link
                to={item.link}
                className={`nav-link text-white d-flex align-items-center ${
                  item.activo ? "active" : ""
                }`}
                aria-current={item.activo ? "page" : undefined}
                title={item.nombre}
                aria-label={item.nombre}
              >
                <item.icono className="menuItem-icono" />
              </Link>
            </li>
          ))}
        </ul>
        <div className="contenedor-contenido">
          <header className="header-side">
            <h1 className="titulo-contenido">{titulo}</h1>
            <Button
              color="primary"
              disabled={false}
              size="lg"
              variant="outlined"
              onClick={handleConsigna}
              className="btn-consigna"
            >
              Consigna
            </Button>
          </header>
          <div className="contenedor-ejercicio">{contenido}</div>
        </div>
      </div>
    </>
  );
};
