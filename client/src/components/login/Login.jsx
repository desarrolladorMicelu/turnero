import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import style from './login.module.css';
import {useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {inicioSesion} from "../../redux/actions";
import {verificarToken, getAllEmpleados} from "../../redux/actions";


const Login = () => {
  const [nombre, setNombre] = useState('');
  const [password, setPassword] = useState('');
  const [faltaNombre, setFaltaNombre] = useState(false);
  const [faltaContrasena, setFaltaContrasena] = useState(false);
  const [infoIncorrecta, setInfoIncorrecta] = useState(false);
  

  const navigate = useNavigate(); 
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllEmpleados());
    localStorage.clear();
  }, []);

  const handleChangeFormulario = (event)=>{
    if(event.target.id === "nombre"){
      setNombre(event.target.value);
    }
    else{
      setPassword(event.target.value);
    }
  } 




  const redirectPanel = async (event) =>{
    event.preventDefault();
    if(password==='' || nombre===''){
      if(password===''){
        setFaltaContrasena(true);
      }else{
        setFaltaContrasena(false);
      }
      if(nombre===''){
        setFaltaNombre(true);
      }else{
        setFaltaNombre(false);
      }
    }else{
      setFaltaContrasena(false);
      setFaltaNombre(false);

      const logIn = await dispatch(inicioSesion(nombre, password));

      if(!logIn.logueado){
        setInfoIncorrecta(true);
      }
      else{
        setInfoIncorrecta(false);

        localStorage.setItem('token', logIn.token);

        const data = await dispatch(verificarToken(logIn.token));

        if(data.info.isSede){
          localStorage.setItem('sede', data.info.sede);
          navigate('/tipoTurno');
        }else if(data.info.admin){
          navigate('/historial');
        }else if(data.info.isTV){
          localStorage.setItem('sede', data.info.sede);
          navigate('/tvView');
        }else{
          localStorage.setItem('sede', data.info.sede);
          navigate('/pendientes');
        }

      }
      

      
    }
    
}


  return (
    <section className="d-flex justify-content-center align-items-center">
      <div className={`${style.panel} card shadow col-xs-12 col-sm-6 col-md-6 col-lg-4 p-4`}>
        <div className="mb-4 d-flex justify-content-start align-items-center">
          <h4>
            <i className="bi bi-person-square"></i> &nbsp; INICIO DE SESIÓN
          </h4>
        </div>
        <div className="mb-1">
          <form id="contacto">
            <div className="mb-4">
              <div>
                <label htmlFor="nombre">
                  <i className="bi bi-person-fill"></i> Usuario:
                </label>
                <input
                  type="text"
                  className={`${faltaNombre ? style.errorVacio : ''} form-control`}
                  name="nombre"
                  id="nombre"
                  placeholder="ej: Usuario"
                  required
                  onChange={handleChangeFormulario}
                />
                {faltaNombre ? <p className={style.mensajeError}>Debes ingresar un nombre</p> : null}
                <div className="nombre text-danger"></div>
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="celular">
                <i className="bi bi-key"></i> Contraseña:
              </label>
              <input
                type="password"
                className={`${faltaContrasena ? style.errorVacio : ''} form-control`}
                name="contraseña"
                id="password"
                placeholder="ej: contraseña"
                required
                onChange={handleChangeFormulario}
              />
              {faltaContrasena ? <p className={style.mensajeError}>Debes ingresar una contraseña</p> : null}
              
              <div className="number text-danger"></div>
            </div>

            <div className="mb-5"></div>

            <div className="mb-2">
              <button id="botton" className={`${style.boton1} col-12 d-flex justify-content-between`}
                onClick={redirectPanel}
              >
                <span>Enviar</span>
                <i id="icono" className="bi bi-cursor-fill "></i>
              </button>
              {infoIncorrecta ? <p className={style.mensajeError}>Usuario y/o contraseña incorrecta</p> : null}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;