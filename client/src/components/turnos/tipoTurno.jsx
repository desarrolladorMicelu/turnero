import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import styles from './cliente.module.css';
import imagenLogo from '../../assets/logo.png';
import {useNavigate, useLocation} from 'react-router-dom';

const TipoTurno = () => {

  const navigate = useNavigate(); 


  useEffect(() => {
    localStorage.removeItem('razon');
  }, []);



  const redirectDatos = (razon) =>{
    localStorage.setItem('razon', razon)
    navigate('/datos');
  }


  return (
    <section className="d-flex justify-content-center align-items-center">
      <div className={` ${styles.panel} card shadow col-xs-12 col-sm-6 col-md-6 col-lg-4 p-4`}>
        
        
        <div className="col-xs-12 p-5 text-center row">
          <h3 className={`${styles.titulop}`}>TOMA AQUÍ</h3>
          <h5 className={`${styles.titulos}`}>TU TURNO</h5>
        </div>

        <div className="mb-2">
            <button    className={`${styles.boton} col-8 btn   btn-lg justify-content-between `}
              onClick={()=>{redirectDatos("ASESORIA Y VENTA")}}
            >
                <span className={`${styles.parte1}`}>  1 </span>
                <span >  ASESORÍA Y VENTA  </span>
            </button>
        </div> 



        <div className="mb-2 row">
          <div className="col"></div>
          <button id ="botton" className={` ${styles.boton} col-8 btn  btn-lg justify-content-between `}
            onClick={()=>{redirectDatos("CREDITO")}}
          >
              <span className={`${styles.parte1}`}>  2 </span>
              <span> CRÉDITO </span>
          </button>
      </div>  

      <div className="mb-2">
        
          <button id ="botton" className={`${styles.boton} col-8 btn  btn-lg justify-content-between `}
            onClick={()=>{redirectDatos("GARANTIA")}}
          >
              <span className={`${styles.parte1}`}>  3 </span>
              <span > GARANTÍA </span>
          </button>
      </div> 

      <div className="mb-2 row">
        <div className="col"></div>
        <button id ="botton" className={`${styles.boton} col-8 btn  btn-lg justify-content-between `}
            onClick={()=>{redirectDatos("SERVICIO TECNICO")}}
          >
            <span className={`${styles.parte1}`}>  4 </span>
            <span> SERVICIO TÉCNICO </span>
        </button>
    </div>  

    <div className="col-xs-8 p-4"></div>  
                  
    
    <div className="col-xs-6 p-5 text-center row">
        <div className="col"></div>
        <img className="logo" alt="imagen" src={imagenLogo} />
        

    </div> 
      </div>
    </section>
  );
};

export default TipoTurno;