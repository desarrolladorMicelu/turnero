import TipoTurno from './components/turnos/tipoTurno';

import TurnoFormulario from './components/datosTurno/TurnoFormulario';
import Login from './components/login/Login';
import Pendientes from './components/pendientes/Pendientes';
import Historial from './components/historial/historial';
import AtendiendoTurno from './components/atendiendoTurno/AtendiendoTurno';
import Dashboard from './components/dashboard/Dashboard';
import axios from 'axios';


import './App.css';
import { Route, Routes} from 'react-router-dom';

axios.defaults.baseURL = 'https://turnero-production.up.railway.app';

function App() {
  // const {pathname} = useLocation();
  return (
    <div>
      {/* {pathname === "/" && <Nav />} */}
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/tipoTurno" element={<TipoTurno/>}/>
        <Route path='/datos' element={<TurnoFormulario />}/>
        <Route path='/pendientes' element={<Pendientes />}/>
        <Route path='/historial' element={<Historial />}/>
        <Route path='/atendiendo' element={<AtendiendoTurno />}/>
        <Route path='/dashboard' element={<Dashboard/>} />
      </Routes>


    </div>

  );
}

export default App;
