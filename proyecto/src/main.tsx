import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import React from "react";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      
    <ToastContainer limit={2}/>
    </BrowserRouter>
  </React.StrictMode>
);
