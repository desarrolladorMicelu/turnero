import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import style from './pendientes.module.css';
import { useNavigate } from 'react-router-dom';
import { putTurno, verificarToken } from '../../redux/actions';
import { useDispatch } from 'react-redux';

const TurnoPendiente = ({ id, nombre, razon, celular, comoNosConociste, orderNumber }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAtender = async () => {
    const hora = new Date();
    const tokenData = await dispatch(verificarToken(localStorage.getItem('token')));

    console.log(tokenData);
    
    await dispatch(putTurno(id, hora, null,tokenData.info.id));
    navigate("/atendiendo", {
      state: {
        id: id,
        nombre,
        razon,
        celular,
        comoNosConociste
      }
    });

  }

  return (
    <div className={`${style.clientep} border`}>
      <p className={`${style.datos1}`}>{nombre}</p>
      <p className={`${style.datos1}`}>{razon}</p>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button className={`${style.boton2}`} onClick={handleAtender}>
          Atender <i className="bi bi-check"></i>
        </button>
        <span className={`${style.orderNumber}`}>{orderNumber}</span>
      </div>
    </div>
  );
};

export default TurnoPendiente;