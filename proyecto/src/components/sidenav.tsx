import type { JSX, ReactElement } from "react";
import { type ItemsProps } from "../App";
import { Link } from "react-router-dom";
import "../style/sidenav.css";

interface SidenavProps {
  listaItems: ItemsProps[];
  contenido: ReactElement;
  titulo?: string;
}

export const Sidenav = ({
  listaItems,
  contenido,
  titulo,
}: SidenavProps): JSX.Element => {
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
          <header>
            <h1 className="titulo-contenido">{titulo}</h1>
          </header>
          <div className="contenedor-ejercicio">{contenido}</div>
        </div>
      </div>
    </>
  );
};
