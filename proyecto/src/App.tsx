
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
import { ContraseniaIncorrecta } from "./components/contraseniaIncorrecta";


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
              titulo="Error oculto del campo de fecha"
            />} />
      <Route
        path="/campo-fecha"
        element={
            <Sidenav
              listaItems={menuItems}
              contenido={<FechaIncorrecta />}
              titulo="Error oculto del campo de fecha"
              consigna="Validación de datos (Testing) y controles de entrada (UI). Escenario: se tiene un campo de entrada para la fecha de nacimiento que solo acepta el formato DD/MM/AAAA. El programador olvidó que el mes fuera menos o igual a 12."
            />
        }
      />
      <Route
        path="/recupero-contraseña"
        element={
            <Sidenav
              listaItems={menuItems}
              contenido={<RecuperarContrasenia />}
              titulo="Navegación lógica vs flujo roto"
              consigna="Pruebas de flujo/proceso (Testing) y usabilidad/diseño de navegación (UI). Escenario: Están probando el proceso de 'recuperar contraseña' en un sitio web. El flujo lógico, definido en la etapa de testing es: Pantalla 1 (ingresar email) -> Pantalla 2 (ingresar código de seguridad) -> Pantalla 3 (nueva contraseña)."
            />
        }
      />
      <Route
        path="/reglas-negocio"
        element={
            <Sidenav
              listaItems={menuItems}
              contenido={<ReglaDeNegocio />}
              titulo="Regla de negocio y el botón gris"
              consigna="Reglas de negocio/validación (Testing) y disponibilidad de acciones(UI)"
            />
        }
      />
      <Route
        path="/barra-menu"
        element={
            <Sidenav
              listaItems={menuItems}
              contenido={< MenuSuperior/>}
              titulo="Cobertura de la interfaz con particiones"
            />
        }
      />
      <Route
        path="/validacion-contraseña"
        element={
            <Sidenav
              listaItems={menuItems}
              contenido={<ContraseniaIncorrecta />}
              titulo="El impacto de la validacion en el cliente"
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