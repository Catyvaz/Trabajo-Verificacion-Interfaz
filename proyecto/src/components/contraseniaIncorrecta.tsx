import React from "react";
import Button from "@mui/joy/Button";
import IconButton from "@mui/joy/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { MensajeAviso, MensajeExito } from "./mensajes";
import "../style/contraseniaIncorrecta.css";

export const ContraseniaIncorrecta: React.FC = () => {
  const [contrasenia, setContrasenia] = React.useState<string>("");
  const regexValidacion =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\-+.,/#])[A-Za-z\d@$!%*?&\-+.,/#]{8,}$/;
  const regexSanitizar = /[^A-Za-z\d@$!%*?&\-+.,/#]/g;
  const [mostrar, setMostrar] = React.useState<boolean>(false);

  const onChangeContrasenia = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const inputLimpio = input.replace(regexSanitizar, ""); // quita lo no permitido
    setContrasenia(inputLimpio);
  };

  const envio = (): void => {
    if (!contrasenia) {
      MensajeAviso("El campo de contraseña no puede estar vacío.");
      return;
    }
    if (regexValidacion.test(contrasenia)) {
      MensajeExito("Contraseña válida. ¡Éxito!");
    } else {
      MensajeAviso(
        "Contraseña inválida. Debe tener 8+ caracteres, mayúscula, minúscula, número y símbolo."
      );
    }
  };

  return (
    <form
      className="form-contra"
      onSubmit={(e) => {
        e.preventDefault();
        envio();
      }}
    >
      <div className="cont-contra">
        <label className="label-contra">Ingrese una contraseña</label>
        <p className="info-contra">
          La contraseña debe tener al menos 8 caracteres, una letra mayúscula,
          una letra minúscula, un número y un carácter especial (@ $ ! % * ? & -
          + . , / #).
        </p>

        <div className="cont-vernover">
          <input
            type={mostrar ? "text" : "password"}
            className="input-contra"
            value={contrasenia}
            onChange={onChangeContrasenia}
            onKeyDown={(e) => {
              if (e.key === " ") {
                e.preventDefault();
              }
            }}
            maxLength={25}
            placeholder="Contraseña"
          />
          <IconButton
            variant="plain"
            color="neutral"
            size="sm"
            className="boton-ojo"
            onClick={() => setMostrar((m) => !m)}
            aria-label={mostrar ? "Ocultar contraseña" : "Mostrar contraseña"}
            title={mostrar ? "Ocultar" : "Mostrar"}
          >
            {mostrar ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
          </IconButton>
        </div>
      </div>

      <div className="cont-contra boton-contenedor">
        <Button
          color="success"
          onClick={envio}
          size="lg"
          variant="solid"
          className="boton-enviar"
          type="submit"
        >
          Enviar
        </Button>
      </div>
    </form>
  );
};
