import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import styles from './cliente.module.css';
import imagenLogo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import {BiCreditCard,} from 'react-icons/bi';
import {Icon} from '@chakra-ui/react'
import { FaHandsHelping, FaUserShield ,FaHandHolding} from 'react-icons/fa';
import { BsFillWrenchAdjustableCircleFill } from 'react-icons/bs';

const TipoTurno = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('razon');
  }, []);

  const redirectDatos = (razon) => {
    localStorage.setItem('razon', razon)
    navigate('/datos');
  }

  return (
    <section className="d-flex justify-content-center align-items-center">
  <div className={`${styles.panel} card shadow col-xs-12 col-sm-6 col-md-6 col-lg-4 p-4`}>
    <div className={styles['welcome-container']}>
      <h3 className={styles['welcome-title']}>BIENVENIDO</h3>
      <h5 className={styles['welcome-subtitle']}>TOME SU TURNO</h5>
    </div>

    <div className="mb-2">
          <button className={`${styles.boton} col-8 btn btn-lg justify-content-between`} onClick={() => {redirectDatos("ASESORIA Y VENTA")}}>
            <Icon as={FaHandsHelping} boxSize={7} />
            <span>ASESORÍA Y VENTA</span>
          </button>
        </div>

    <div className="mb-2 row">
      <div className="col"></div>
      <button className={`${styles.boton} col-8 btn btn-lg justify-content-between`}
              onClick={() => {redirectDatos("CREDITO")}}>
        <Icon as={BiCreditCard} boxSize={7} />
        <span>CRÉDITO</span>
      </button>
    </div>

    <div className="mb-2">
      <button className={`${styles.boton} col-8 btn btn-lg justify-content-between`}
              onClick={() => {redirectDatos("GARANTIA")}}>
        <Icon as={FaUserShield} boxSize={7} />
        <span>GARANTÍA</span>
      </button>
    </div>

    <div className="mb-2 row">
      <div className="col"></div>
      <button className={`${styles.boton} col-8 btn btn-lg justify-content-between`}
              onClick={() => {redirectDatos("SERVICIO TECNICO")}}>
        <Icon as={BsFillWrenchAdjustableCircleFill} boxSize={7} />
        <span>SERVICIO TÉCNICO</span>
      </button>
    </div>
    
    <div className="mb-2">
      <button className={`${styles.boton} col-8 btn btn-lg justify-content-between`}
              onClick={() => {redirectDatos("ENTREGA EQUIPOS")}}>
        <Icon as={FaHandHolding} boxSize={7} />
        <span>ENTREGA EQUIPOS</span>
      </button>
    </div>
    

    <div className="col-xs-8 p-4"></div>

    <div className="col-8 offset-2 text-center row">
      <div className="col"></div>
      <img className={styles.logo} alt="imagen" src={imagenLogo} />
    </div>
  </div>
</section>
  );
};

export default TipoTurno;