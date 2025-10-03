import "../../style/menuSuperior.css";

export const MenuSuperior = () => {
  return (
    <header>
      <div className="px-3 py-2 border-bottom">
        <div className="container-fluid">
          <div className="contenedor-elementos">
            <div>
              <ul className="barra-opciones">
                <li>
                  <a href="#inicio" className="nav-element text-secondary">
                    {" "}
                    Inicio{" "}
                  </a>
                </li>
                <li>
                  <a href="#catalogo" className="nav-element text-secondary">
                    {" "}
                    Catálogo de Productos{" "}
                  </a>
                </li>
                <li>
                  <a href="#miCarrito" className="nav-element text-secondary">
                    {" "}
                    Mi Carrito{" "}
                  </a>
                </li>
                <li>
                  <a href="#miCuenta" className="nav-element text-secondary">
                    {" "}
                    Mi cuenta{" "}
                  </a>
                </li>
                <li>
                  <a href="#ayuda" className="nav-element text-secondary">
                    {" "}
                    Ayuda{" "}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};