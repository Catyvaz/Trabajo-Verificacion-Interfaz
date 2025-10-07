import React, { useState } from "react";
import "../style/reglaDeNegocio.css";

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  descripcion: string;
}

interface ProductoCarrito extends Producto {
  cantidad: number;
}

const ReglaDeNegocio: React.FC = () => {
  const [carrito, setCarrito] = useState<ProductoCarrito[]>([]);
  const [entrega, setEntrega] = useState<string>("");

  const lugarEntrega: string[] = [
    "Casa",
    "Retiro por local",
    "Retiro por correo",
  ];

  const productos: Producto[] = [
    {
      id: 1,
      nombre: "Producto 1",
      precio: 5000,
      descripcion: "Descripción del producto 1",
    },
    {
      id: 2,
      nombre: "Producto 2",
      precio: 2500,
      descripcion: "Descripción del producto 2",
    },
    {
      id: 3,
      nombre: "Producto 3",
      precio: 3500,
      descripcion: "Descripción del producto 3",
    },
  ];

  const agregarAlCarrito = (producto: Producto) => {
    setCarrito((carritoActual) => {
      const productoExistente = carritoActual.find(
        (item) => item.id === producto.id
      );

      if (productoExistente) {
        return carritoActual.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        return [...carritoActual, { ...producto, cantidad: 1 }];
      }
    });
  };

  const eliminarDelCarrito = (id: number) => {
    setCarrito((carritoActual) =>
      carritoActual.filter((item) => item.id !== id)
    );
  };

  const actualizarCantidad = (id: number, nuevaCantidad: number) => {
    if (nuevaCantidad <= 0) {
      eliminarDelCarrito(id);
    } else {
      setCarrito((carritoActual) =>
        carritoActual.map((item) =>
          item.id === id ? { ...item, cantidad: nuevaCantidad } : item
        )
      );
    }
  };

  const calcularTotal = () => {
    return carrito.reduce(
      (total, item) => total + item.precio * item.cantidad,
      0
    );
  };

  const enviarPedido = () => {
    if (carrito.length === 0) {
      alert("El carrito está vacío");
      return;
    }

    const total = calcularTotal();
    alert(`Pedido enviado! Total: $${total.toFixed(2)}`);
    setCarrito([]);
  };

  return (
    <div className="regla-negocio-container">
      <div className="contenedor-productos">
        <h2>Productos</h2>
        <ul className="lista-productos">
          {productos.map((producto) => (
            <li className="contenedor-productos" key={producto.id}>
              <h3>{producto.nombre}</h3>
              <p className="descripcion">{producto.descripcion}</p>
              <p className="precio">Precio: ${producto.precio.toFixed(2)}</p>
              <button onClick={() => agregarAlCarrito(producto)}>
                Agregar al carrito
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="contenedor-carrito">
        <h2>Carrito de Compras</h2>
        <label htmlFor="">Lugar de entrega</label>
        <select
          required
          id="lugar-entrega"
          name="lugar-entrega"
          onChange={(e) => {
            setEntrega(e.target.value);
          }}
          value={entrega}
          style={{
            cursor: "pointer",
          }}
        >
          <option value="" disabled>
            Seleccione lugar de entrega
          </option>
          {lugarEntrega.map((lugar) => (
            <option key={lugar} value={lugar}>
              {lugar}
            </option>
          ))}
        </select>
        {carrito.length === 0 ? (
          <p>El carrito está vacío</p>
        ) : (
          <ul className="lista-carrito">
            {carrito.map((item) => (
              <li className="item-carrito" key={item.id}>
                <h3>{item.nombre}</h3>
                <p className="precio">Precio: ${item.precio.toFixed(2)}</p>
                <p>
                  Cantidad:
                  <input
                    type="number"
                    value={item.cantidad}
                    min="1"
                    onChange={(e) =>
                      actualizarCantidad(item.id, parseInt(e.target.value))
                    }
                  />
                </p>
                <button onClick={() => eliminarDelCarrito(item.id)}>
                  Eliminar
                </button>
              </li>
            ))}
            <h3>Total: ${calcularTotal().toFixed(2)}</h3>
            <button onClick={enviarPedido} disabled= {entrega !== "" ? false : true}>Enviar Pedido</button>
          </ul>
        )}
      </div>
    </div>
  );
};

export default ReglaDeNegocio;
