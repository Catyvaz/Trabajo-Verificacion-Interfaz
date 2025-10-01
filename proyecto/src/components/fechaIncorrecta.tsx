import React from "react";

export const FechaIncorrecta: React.FC = () => {
  const [datosFormulario, setDatosFormulario] = React.useState({ fecha: "" });

  const manejarCambio = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    if (name === "fecha") {
        if(value.length > 10) return;
    }
    setDatosFormulario((prevDatos) => ({
      ...prevDatos,
      [name]: value,
    }));
  };

  return (
    <form action="">
      <label htmlFor="fecha">Fecha:</label>
      <input
        id="fecha"
        name="fecha"
        onChange={manejarCambio}
        value={datosFormulario.fecha}
        max={10}
      />
      <button type="submit">Enviar</button>
    </form>
  );
};
