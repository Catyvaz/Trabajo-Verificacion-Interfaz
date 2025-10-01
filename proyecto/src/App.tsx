import { ContenedorEjemplos } from './components/contenedor'
import { FechaIncorrecta } from './components/fechaIncorrecta'
import './style/app.css'

function App() {

  return (
    <div className='contenedor-principal'>
        <ContenedorEjemplos contenido={<FechaIncorrecta />}/>
    </div>
  )
}

export default App
