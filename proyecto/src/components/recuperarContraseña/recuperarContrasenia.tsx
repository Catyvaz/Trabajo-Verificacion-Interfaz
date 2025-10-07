import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "../../style/recuperarContrasenia.css";
import { MensajeAviso, MensajeError, MensajeExito } from "../mensajes";

const steps = ["Email", "Código", "Nueva Contraseña"];

export const RecuperarContrasenia: React.FC = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const [email, setEmail] = React.useState("");
  const [codigo, setCodigo] = React.useState("");
  const [codigoIngresado, setCodigoIngresado] = React.useState("");

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
      sendEmail();
    }
    if (activeStep === 1 && codigo !== codigoIngresado) {
      MensajeError("El código ingresado es incorrecto.");
      return;
    } else if (activeStep === 1 && codigo === codigoIngresado) {
      MensajeExito("Código verificado correctamente.");
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
            <Step key={label} {...stepProps} className="step">
              <StepLabel {...labelProps} className="stepLabel">
                {label}
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
            type="email"
            placeholder="Correo Electrónico"
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
          <input
            type="password"
            placeholder="Nueva contraseña"
            className="input-step"
            required
          />
        </div>
      )}

      {activeStep === steps.length ? (
        <React.Fragment>
          <label className="texto-pasos final">
            All steps completed - you&apos;re finished
          </label>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {activeStep === 0 ? (
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2, justifyContent: "flex-end" }}>
              <Button
                onClick={async () => {
                  handleNext();
                }}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </Box>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1, color: "white" }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button
                onClick={async () => {
                  handleNext();
                }}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </Box>
          )}
        </React.Fragment>
      )}
    </Box>
  );
};
