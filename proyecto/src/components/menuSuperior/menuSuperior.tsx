import React, { useState } from "react";
import "../../style/menuSuperior.css";
import { Link } from "react-router-dom";

export const MenuSuperior = () => {
  const itemsBar = [
    {
      id: 1,
      nombre: "Inicio",
    },
    {
      id: 2,
      nombre: "Catálogo de Productos",
    },
    {
      id: 3,
      nombre: "Mi Carrito",
    },
    { id: 4, nombre: "Mi Cuenta" },
    {
      id: 5,
      nombre: "Ayuda",
    },
  ];

  const [activeId, setActiveId] = useState<number>(1);

  const activeItem = itemsBar.find((i) => i.id === activeId);

  const handleSelect = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    setActiveId(id);
  };

  return (
    <div className="contenedor-menu-superior">
      <header>
        <nav className="contenedor-elementos" aria-label="Menú principal">
          <ul className="barra-opciones">
            {itemsBar.map((item) => {
              const isActive = item.id === activeId;
              return (
                <li key={item.id}>
                  <Link
                    to="#"
                    onClick={(e) => handleSelect(e, item.id)}
                    className={`elemento-seleccionado ${
                      isActive ? "active" : ""
                    }`}
                    aria-current={isActive ? "page" : undefined}
                    title={item.nombre}
                    aria-label={item.nombre}
                  >
                    {item.nombre}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
      <div className="contenedor-contenido-ejemplo">
        {activeItem && (
          <div>
            {activeItem.id === 1 ? (
              <h2>¡Bienvenido!</h2>
            ) : (
              <h2>{activeItem.nombre}</h2>
            )}
            <p>Sección: {activeItem.nombre}</p>
          </div>
        )}
      </div>
    </div>
  );
};
