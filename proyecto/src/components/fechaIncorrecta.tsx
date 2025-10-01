import React from "react";

export const FechaIncorrecta: React.FC = () => {
  const [datosFormulario, setDatosFormulario] = React.useState({
    dia: "",
    mes: "",
    anio: "",
  });

  const manejarCambio = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setDatosFormulario((prevDatos) => ({
      ...prevDatos,
      [name]: value,
    }));
  };

  return (
    <form action="">
      <label htmlFor="dia" className="labelFecha">
        Día:
      </label>
      <select
        name="dia"
        id="dia"
        onChange={manejarCambio}
        value={datosFormulario.dia}
      >
        <option value="">Día</option>
        {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
          <option key={day} value={day}>
            {day}
          </option>
        ))}
      </select>

      <label htmlFor="mes" className="labelFecha">
        Mes:
      </label>
      <select
        name="mes"
        id="mes"
        onChange={manejarCambio}
        value={datosFormulario.mes}
      >
        <option value="">Mes</option>
        {Array.from({ length: 25 }, (_, i) => i + 1).map((day) => (
          <option key={day} value={day}>
            {day}
          </option>
        ))}
      </select>

      <label htmlFor="anio" className="labelFecha">
        Año:
      </label>
      <select
        name="anio"
        id="anio"
        onChange={manejarCambio}
        value={datosFormulario.anio}
      >
        <option value="">Año</option>
        {Array.from({ length: 30 }, (_, i) => 2000 + i).map((day) => (
          <option key={day} value={day}>
            {day}
          </option>
        ))}
      </select>
      <button type="submit">Enviar</button>
    </form>
  );
};
