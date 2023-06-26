import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import styles from "./atendiendoTurno.module.css";
import {useLocation} from 'react-router-dom';
import {putTurno, verificarToken} from '../../redux/actions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const AtendiendoTurno = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const location = useLocation();
  if(location.state){
    var {id, nombre, razon, celular} = location.state;
  }

  useEffect(()=>{

    const verificacion = async()=>{
      const tokenData = await dispatch(verificarToken(localStorage.getItem('token')));
        if(!tokenData.verified){
          navigate('/');
        }

    }
    verificacion();
    
  }, [dispatch]);


  
  

  const handleFinalizacionTurno = ()=>{
    const tiempoSalida = new Date();
    const empleado = localStorage.getItem('empleado');
    dispatch(putTurno(id, undefined, tiempoSalida, empleado));
    navigate("/pendientes");
  }
  return (
    <section className="d-flex justify-content-center align-items-center">
      <div className={`${styles.panel} card shadow col-xs-12 col-sm-6 col-md-6 col-lg-4 p-4`}>
        <div className="mb-4 d-flex justify-content-start align-items-center">
          <h4>
            <i className="bi bi-chat-left-quote"></i> &nbsp; CLIENTE
          </h4>
        </div>
        <div className="mb-1">
          <form id="contacto">
            <div className="mb-4 d-flex justify-content-between">
              <div>
                <label htmlFor="nombre">
                  <i className="bi bi-person-fill"></i> Nombre:
                </label>
                <label className={`${styles.dato1}`} htmlFor="celular">
                  {location.state && nombre}
                </label>
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="celular">
                <i className="bi bi-phone"></i> Celular:
              </label>
              <label className={`${styles.dato1}`} htmlFor="celular">
                {location.state && celular}
              </label>
            </div>

            <div className="mb-4">
              <label htmlFor="celular">
                <i className="bi bi-bookmark-star-fill"></i> Razon de Atención:
              </label>
              <label className={`${styles.dato1}`} htmlFor="celular">
                {location.state && razon}
              </label>
            </div>
          </form>

          <div className="mb-5"></div>

          <div className="mb-2">
            <button id="botton" className={`${styles.boton1} col-12 d-flex justify-content-between`}
            onClick={handleFinalizacionTurno}>
              <span>Finalizar Atención <i className="bi bi-door-closed"></i></span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AtendiendoTurno;
