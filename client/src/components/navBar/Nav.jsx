import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import style from './nav.module.css';
import { useNavigate } from 'react-router-dom';

const Nav = ({ admin, nombreUsuario }) => {
  const navigate = useNavigate();
  const [isMinimized, setIsMinimized] = useState(false);

  const redirectDashboard = () => {
    navigate('/dashboard');
  }

  const redirectHistorial = () => {
    navigate('/historial');
  }

  const redirectAtender = () => {
    navigate('/pendientes');
  }

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  }

  return (
    <div className={`card shadow ${style.footer} ${isMinimized ? style.minimized : ''}`}>
      <button className={style.toggleButton} onClick={toggleMinimize}>
        {isMinimized ? '▲' : '▼'}
      </button>
      <div className={style.welcomeTitle}>
        <h4>Bienvenido <span className={style.userName}>{nombreUsuario}</span></h4>
        <p>¿Qué deseas hacer?</p>
      </div>
      <div className={style.buttonContainer}>
        {!admin &&
          <button className={style.navButton} onClick={redirectAtender}>Atender</button>
        }
        <button onClick={redirectHistorial} className={style.navButton}>Historial</button>
        {admin &&
          <button onClick={redirectDashboard} className={style.navButton}>Dashboard Admin</button>
        }
      </div>
    </div>
  );
}

export default Nav;