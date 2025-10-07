import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import "../style/recuperarContrasenia.css";
import { MensajeAviso, MensajeError, MensajeExito } from "./mensajes";
import EmailTwoToneIcon from "@mui/icons-material/EmailTwoTone";
import VpnKeyTwoToneIcon from "@mui/icons-material/VpnKeyTwoTone";
import PasswordTwoToneIcon from "@mui/icons-material/PasswordTwoTone";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const steps = [
  { nombre: "Email", icono: EmailTwoToneIcon },
  { nombre: "Código", icono: VpnKeyTwoToneIcon },
  { nombre: "Nueva Contraseña", icono: PasswordTwoToneIcon },
];

export const RecuperarContrasenia: React.FC = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const [email, setEmail] = React.useState("");
  const [codigo, setCodigo] = React.useState("");
  const [codigoIngresado, setCodigoIngresado] = React.useState("");
  const [contrasenia, setContrasenia] = React.useState("");
  const emailRef = React.useRef<HTMLInputElement | null>(null);
  const [mostrar, setMostrar] = React.useState<boolean>(false);
  const isValidEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    if (activeStep === 0 && email === "") {
      MensajeAviso("Por favor, ingresa un correo electrónico válido.");
      return;
    } else if (activeStep === 0 && email !== "") {
      if (!isValidEmail(email)) {
        MensajeAviso("Ingresa un correo electrónico válido.");
        emailRef.current?.reportValidity?.();
        return;
      }
      sendEmail();
    }
    if (activeStep === 1 && codigo !== codigoIngresado) {
      MensajeError("El código ingresado es incorrecto.");
      return;
    } else if (activeStep === 1 && codigo === codigoIngresado) {
      MensajeExito("Código verificado correctamente.");
    }

    if (activeStep === 2 && contrasenia === "") {
      MensajeAviso("La contraseña no puede estar vacía.");
      return;
    }
    if (activeStep === 2 && contrasenia.length < 6) {
      MensajeAviso("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setEmail("");
    setCodigo("");
    setCodigoIngresado("");
  };

  const codeGenerator = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const sendEmail = async () => {
    const codigo = codeGenerator();
    setCodigo(codigo);
    MensajeExito("Código enviado a tu correo: " + codigo);
  };

  return (
    <Box className="contenedor-stepper">
      <Stepper activeStep={activeStep} className="stepper">
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label.nombre} {...stepProps} className="step">
              <StepLabel {...labelProps} className="stepLabel">
                {label.nombre}
                <label.icono className="icono-step" />
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>

      {activeStep === 0 && (
        <div className="contenido-step">
          <label className="texto-pasos">
            Ingresa tu correo electrónico para recibir un código de
            verificación.
          </label>
          <input
            ref={emailRef}
            type="email"
            placeholder="correo@electronico.com"
            className="input-step"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>
      )}
      {activeStep === 1 && (
        <div className="contenido-step">
          <label className="texto-pasos">Ingresa código de verificación.</label>
          <input
            type="text"
            placeholder="Código de Seguridad"
            className="input-step"
            onChange={(e) => setCodigoIngresado(e.target.value)}
            value={codigoIngresado}
            required
          />
        </div>
      )}
      {activeStep === 2 && (
        <div className="contenido-step">
          <label className="texto-pasos">Ingresa la nueva contraseña.</label>
          <div className="vernover">
            <input
              min={8}
              type={mostrar ? "text" : "password"}
              placeholder="Nueva contraseña"
              className="input-step"
              required
              value={contrasenia}
              onChange={(e) => {
                setContrasenia(e.target.value);
              }}
            />
            <IconButton
              color="primary"
              size="small"
              className="boton-ojo"
              onClick={() => setMostrar((m) => !m)}
              aria-label={mostrar ? "Ocultar contraseña" : "Mostrar contraseña"}
              title={mostrar ? "Ocultar" : "Mostrar"}
            >
              {mostrar ? (
                <VisibilityOff fontSize="small" />
              ) : (
                <Visibility fontSize="small" />
              )}
            </IconButton>
          </div>
        </div>
      )}

      {activeStep === steps.length ? (
        <React.Fragment>
          <div className="contenido-step">
            <label className="texto-pasos final">
              ¡Contraseña actualizada correctamente!
            </label>
          </div>

          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button
              onClick={handleReset}
              variant="outlined"
              className="boton-siguiente"
            >
              Volver a empezar
            </Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {activeStep === 0 ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
            >
              <Button
                className="boton-siguiente"
                variant="outlined"
                onClick={async () => {
                  handleNext();
                }}
                size="large"
              >
                {activeStep === steps.length - 1 ? "Terminar" : "Siguiente"}
              </Button>
            </Box>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                className="boton-atras"
                variant="outlined"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1, color: "white" }}
              >
                Atras
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button
                className="boton-siguiente"
                variant="outlined"
                onClick={async () => {
                  handleNext();
                }}
              >
                {activeStep === steps.length - 1 ? "Terminar" : "Siguiente"}
              </Button>
            </Box>
          )}
        </React.Fragment>
      )}
    </Box>
  );
};
