import React, { useState } from 'react';
import '../style/reglaDeNegocio.css';

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

  const productos: Producto[] = [
    {
      id: 1,
      nombre: 'Producto 1',
      precio: 5000,
      descripcion: 'Descripción del producto 1'
    },
    {
      id: 2,
      nombre: 'Producto 2',
      precio: 2500,
      descripcion: 'Descripción del producto 2'
    },
    {
      id: 3,
      nombre: 'Producto 3',
      precio: 3500,
      descripcion: 'Descripción del producto 3'
    }
  ];

  const agregarAlCarrito = (producto: Producto) => {
    setCarrito(carritoActual => {
      const productoExistente = carritoActual.find(item => item.id === producto.id);
      
      if (productoExistente) {
        return carritoActual.map(item =>
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
    setCarrito(carritoActual => 
      carritoActual.filter(item => item.id !== id)
    );
  };

  const actualizarCantidad = (id: number, nuevaCantidad: number) => {
    if (nuevaCantidad <= 0) {
      eliminarDelCarrito(id);
    } else {
      setCarrito(carritoActual =>
        carritoActual.map(item =>
          item.id === id
            ? { ...item, cantidad: nuevaCantidad }
            : item
        )
      );
    }
  };

  const calcularTotal = () => {
    return carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
  };

  const enviarPedido = () => {
    if (carrito.length === 0) {
      alert('El carrito está vacío');
      return;
    }
    
    const total = calcularTotal();
    alert(`Pedido enviado! Total: $${total.toFixed(2)}`);
    setCarrito([]);
  };

  return (
    <div className="regla-negocio-container">
      <div className="productos-lista">
        <h2>Productos Disponibles</h2>
        {productos.map(producto => (
          <div key={producto.id} className="producto-card">
            <h3>{producto.nombre}</h3>
            <p className="descripcion">{producto.descripcion}</p>
            <p className="precio">${producto.precio.toFixed(2)}</p>
            <button 
              onClick={() => agregarAlCarrito(producto)}
              className="btn-agregar"
            >
              Agregar al Carrito
            </button>
          </div>
        ))}
      </div>

      <div className="carrito-container">
        <h2>Carrito de Compras</h2>
        {carrito.length === 0 ? (
          <p className="carrito-vacio">El carrito está vacío</p>
        ) : (
          <>
            <div className="carrito-items">
              {carrito.map(item => (
                <div key={item.id} className="carrito-item">
                  <div className="item-info">
                    <h4>{item.nombre}</h4>
                    <p>${item.precio.toFixed(2)} c/u</p>
                  </div>
                  <div className="cantidad-controls">
                    <button 
                      onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}
                      className="btn-cantidad"
                    >
                      -
                    </button>
                    <span className="cantidad">{item.cantidad}</span>
                    <button 
                      onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}
                      className="btn-cantidad"
                    >
                      +
                    </button>
                  </div>
                  <div className="item-total">
                    ${(item.precio * item.cantidad).toFixed(2)}
                  </div>
                  <button 
                    onClick={() => eliminarDelCarrito(item.id)}
                    className="btn-eliminar"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
            
            <div className="carrito-total">
              <h3>Total: ${calcularTotal().toFixed(2)}</h3>
            </div>
          </>
        )}
        
        <button 
          onClick={enviarPedido}
          className="btn-enviar-pedido"
          disabled={carrito.length === 0}
        >
          Enviar Pedido
        </button>
      </div>
    </div>
  );
};

export default ReglaDeNegocio;
