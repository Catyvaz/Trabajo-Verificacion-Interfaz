import React from "react";
import Button from "@mui/joy/Button";
import { MensajeAviso, MensajeExito } from "./mensajes";

export const ContraseniaIncorrecta: React.FC = () => {
  const [contrasenia, setContrasenia] = React.useState<string>("");

  const envio = (): void => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (regex.test(contrasenia)) {
      MensajeExito("Contraseña válida. Enviando formulario...");
    } else {
      MensajeAviso("Contraseña inválida. Por favor, verifique los requisitos.");
    }
  };

  return (
    <form action="" className="form-contra">
      <div className="cont-contra">
        <label htmlFor="">Ingrese una contraseña</label>
        <p>
          La contraseña debe tener al menos 8 caracteres, una letra mayúscula,
          una letra minúscula, un número y un carácter especial.
        </p>
        <input type="text" onChange={(e) => setContrasenia(e.target.value)} />
      </div>

      <div className="cont-contra boton-contenedor">
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
      </div>
    </form>
  );
};
