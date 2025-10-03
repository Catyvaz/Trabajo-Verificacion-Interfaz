import type { JSX } from "react";
import { Bounce, toast } from "react-toastify";

export const MensajeExito = (mensaje: string): JSX.Element => {
    toast.success(mensaje, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce
  });
    return <></>;
};

export const MensajeAviso = (mensaje: string): JSX.Element => {
    toast.warn(mensaje, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce
  });
    return <></>;
};

