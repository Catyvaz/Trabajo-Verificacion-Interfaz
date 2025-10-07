import React, { useState } from "react";
import "../style/fechaIncorrecta.css";
import Button from "@mui/joy/Button";
import { MensajeAviso, MensajeExito } from "./mensajes";

export const FechaIncorrecta: React.FC = () => {
  const [fecha, setFecha] = useState<string>("");
  const [error, setError] = useState<string>("");
  const patron = /^(\d{2})\/(\d{2})\/(\d{4})$/;

  const validarFecha = (fecha: string) => {
    const match = fecha.match(patron);
    if (!match) {
      MensajeAviso("Formato de fecha inválido. Use dd/mm/aaaa");
      return false;
    }

    const [, diaStr, mesStr, anioStr] = match;
    const dia = parseInt(diaStr, 10);
    const mes = parseInt(mesStr, 10);
    const anio = parseInt(anioStr, 10);

    const errores: string[] = [];

    //val dia
    if (dia < 1 || dia > 31) {
      errores.push("Día inválido. Debe estar entre 01 y 31.");
    }
    //val mes, donde se supone esta el error
    if (mes < 1) {
      errores.push("Mes inválido. Debe estar entre 01 y 12.");
    }
    // val año
    if (anio < 1900 || anio > 2025) {
      errores.push("Año inválido. Debe estar entre 1900 y 2025.");
    }
    if (errores.length === 0 && anio === 2025) {
      const fechaAhora = new Date();
      if (mes > fechaAhora.getMonth() + 1) {
        errores.push("Mes inválido. No puede ser una fecha futura");
      } else if (
        mes === fechaAhora.getMonth() + 1 &&
        dia > fechaAhora.getDate()
      ) {
        errores.push("Día inválido. No puede ser una fecha futura");
      }
    }

    if (errores.length > 0) {
      const mensaje = errores.join(". ");
      setError(mensaje);
      MensajeAviso(mensaje);
      return false;
    }

    setError("");
    return true;
  };

  const envio = (): void => {
    if (fecha === "") {
      MensajeAviso("El campo de fecha no puede estar vacío");
      return;
    }
    if (fecha.length < 10) {
      MensajeAviso("La fecha debe tener 10 caracteres");
      return;
    }
    const resultado = validarFecha(fecha);
    if (resultado) {
      MensajeExito("Fecha de nacimiento guardada con éxito: " + fecha);
    }
    setFecha("");
  };

  return (
    <form action="">
      <div className="area-ingreso-data">
        <label className="label-fecha">
          Ingrese su fecha de nacimiento (dd/mm/aaaa)
        </label>
        <input
          type="text"
          className="input-fecha"
          value={fecha}
          onChange={(e) =>
            setFecha((e.target.value = e.target.value.replace(/[^0-9/]/g, "")))
          }
          pattern="\d{2}/\d{2}/\d{4}"
          placeholder="18/04/2002"
          maxLength={10}
        />
      </div>
      <Button
        color="success"
        disabled={false}
        onClick={() => {
          envio();
        }}
        size="lg"
        variant="solid"
        className="boton-enviar"
      >
        Enviar
      </Button>
    </form>
  );
};
