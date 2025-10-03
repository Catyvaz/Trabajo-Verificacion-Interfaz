
import { FechaIncorrecta } from "./components/fechaIncorrecta";
import "./style/app.css";

import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { Route, Routes, useLocation } from "react-router-dom";
import PasswordOutlinedIcon from '@mui/icons-material/PasswordOutlined';
import { Sidenav } from "./components/sidenav";


const ROUTES = {
  FECHA: "/campo-fecha",
  RECUPERO: "/recupero-contraseña",
  NEGOCIO: "/reglas-negocio",
  MENU: "/barra-menu",
  CONTRASENIA: "/validacion-contraseña",
} as const;

export interface ItemsProps {
  id: number;
  nombre: string;
  icono: React.ComponentType<{ className?: string }>;
  link: string;
  activo: boolean;
}

const AppContent = () => {
  const location = useLocation();
  const currentPath = decodeURI(location.pathname);

  const menuItems: ItemsProps[] = [
    {
      id: 1,
      nombre: "Campo de Fecha",
      icono: CalendarMonthOutlinedIcon,
      link: ROUTES.FECHA,
      activo: currentPath === ROUTES.FECHA || currentPath === "/",
    },
    {
      id: 2,
      nombre: "Recupero de Contraseña",
      icono: PasswordOutlinedIcon,
      link: ROUTES.RECUPERO,
      activo: currentPath === ROUTES.RECUPERO || currentPath === "/recupero-contraseña",
    },
  ];

  return (
    <Routes>
      <Route path="/" element={<Sidenav
              listaItems={menuItems}
              contenido={<FechaIncorrecta />}
            />} />
      <Route
        path="/campo-fecha"
        element={
            <Sidenav
              listaItems={menuItems}
              contenido={<FechaIncorrecta />}
            />
        }
      />
    </Routes>
  );
};

const App = () => {
  return (
        <AppContent />
  );
};

export default App;