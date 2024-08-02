import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import style from './nav.module.css';
import {useNavigate} from 'react-router-dom';

const Nav = ({admin}) =>{

  const navigate = useNavigate();

  const redirectDashboard = ()=>{
    navigate('/dashboard');
  }

  const redirectHistorial = () => {
    navigate('/historial');
  }

  const redirectAtender = () => {
    navigate('/pendientes');
  }


  return(
  <div  className={`card shadow  ${style.footer}`} >
  
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
      
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          {!admin && <li className="nav-item">
              <button className="nav-link" onClick={redirectAtender}>Atender</button>
          </li>}
          <li className="nav-item">
            <button onClick={redirectHistorial} className="nav-link">Historial</button>
          </li>
          {admin && <li className="nav-item">
            <button onClick={redirectDashboard} className="nav-link">Dashboard Admin</button>
          </li>}
          
        </ul>
      </div>
      </nav>
      
  </div>
  );
}


export default Nav;