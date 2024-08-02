import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import style from './pendientes.module.css';
import {useNavigate} from 'react-router-dom';
import {putTurno, verificarToken} from '../../redux/actions';
import { useDispatch } from 'react-redux';

const TurnoPendiente = ({id, nombre, razon, celular}) => {

  const navigate = useNavigate();
  const dispatch = useDispatch(); 
  
  const handleAtender = async()=>{

    

    const hora = new Date();
    const tokenData = await dispatch(verificarToken(localStorage.getItem('token')));
    dispatch(putTurno(id, hora, undefined, tokenData.info.id));

    navigate("/atendiendo", {
      state: {
        id:id, 
        nombre, 
        razon,
        celular
      }});

    
  }

  return (
    <div className={`${style.clientep} border`}>
          <p className={`${style.datos1}`}>{nombre}</p>
          <p className={`${style.datos1}`}>{razon}</p>
          <button className={`${style.boton1}`} onClick={handleAtender}>Atender <i className="bi bi-check"></i></button>
    </div>
  );
};

export default TurnoPendiente;
