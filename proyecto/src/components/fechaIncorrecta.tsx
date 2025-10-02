import React from "react";
import "../style/fechaIncorrecta.css";
import Button from "@mui/joy/Button";

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
      <div className="campo-fecha">
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
      </div>

      <div className="campo-fecha">
        <select
          name="mes"
          id="mes"
          onChange={manejarCambio}
          value={datosFormulario.mes}
        >
          <option value="">Mes</option>
          {Array.from({ length: 20 }, (_, i) => i + 1).map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>

      <div className="campo-fecha">
        <select
          name="anio"
          id="anio"
          onChange={manejarCambio}
          value={datosFormulario.anio}
        >
          <option value="">Año</option>
          {Array.from({ length: 30 }, (_, i) => 2000 + i).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className="campo-fecha boton-contenedor">
        <Button
          color="success"
          disabled={false}
          onClick={() => {alert('Fecha enviada')}}
          size="md"
          variant="solid"
          className="boton-enviar"
        >
          Enviar
        </Button>
      </div>
    </form>
  );
};
