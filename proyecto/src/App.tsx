
import { FechaIncorrecta } from "./components/fechaIncorrecta";
import "./style/app.css";

import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import { Route, Routes, useLocation } from "react-router-dom";
import PasswordOutlinedIcon from '@mui/icons-material/PasswordOutlined';
import { Sidenav } from "./components/sidenav";
import { RecuperarContrasenia } from "./components/recuperarContrasenia";
import ReglaDeNegocio from "./components/reglaDeNegocio";
import { MenuSuperior } from "./components/menuSuperior/menuSuperior";


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
    {
      id: 3,
      nombre: "Regla de Negocio",
      icono: StorefrontOutlinedIcon,
      link: ROUTES.NEGOCIO,
      activo: currentPath === ROUTES.NEGOCIO || currentPath === "/reglas-negocio",
    },
    {
      id: 4,
      nombre: "Barra de Menú",
      icono: StoreOutlinedIcon,
      link: ROUTES.MENU,
      activo: currentPath === ROUTES.MENU || currentPath === "/barra-menu",
    },
    {
      id: 5,
      nombre: "Contraseña de Usuario",
      icono: HttpsOutlinedIcon,
      link: ROUTES.CONTRASENIA,
      activo: currentPath === ROUTES.CONTRASENIA || currentPath === "/validacion-contraseña",
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
      <Route
        path="/recupero-contraseña"
        element={
            <Sidenav
              listaItems={menuItems}
              contenido={<RecuperarContrasenia />}
            />
        }
      />
      <Route
        path="/reglas-negocio"
        element={
            <Sidenav
              listaItems={menuItems}
              contenido={<ReglaDeNegocio />}
            />
        }
      />
      <Route
        path="/barra-menu"
        element={
            <Sidenav
              listaItems={menuItems}
              contenido={< MenuSuperior/>}
            />
        }
      />
      <Route
        path="/validacion-contraseña"
        element={
            <Sidenav
              listaItems={menuItems}
              contenido={<ReglaDeNegocio />}
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