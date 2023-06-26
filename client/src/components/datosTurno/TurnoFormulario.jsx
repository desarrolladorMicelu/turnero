import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate} from 'react-router-dom';
import style from './formulario.module.css'
import { postTurno, verificarToken } from '../../redux/actions';
import {useDispatch} from 'react-redux';

function TurnoFormulario() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [celular, setCelular] = useState(0);
  const [habeasData, SetHabeasData] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(()=>{

    const verificacion = async()=>{
      const tokenData = await dispatch(verificarToken(localStorage.getItem('token')));
        if(!tokenData.verified){
          navigate('/');
        }

    }
    verificacion();
    
  }, [dispatch]);


  const handleChangesForm = (event) =>{
    if(event.target.id==='celular'){
      setCelular(event.target.value);
    }
    else if(event.target.id==='nombre'){
      setNombre(event.target.value);    
    }
    else if (event.target.id==='apellido') {
      setApellido(event.target.value); 
    } else if(event.target.id==='habeasData'){
      SetHabeasData(event.target.checked);
    }
  }

  


  const handleSubmit = (event)=>{
    event.preventDefault();

    const tiempoEntrada = new Date();

    const motivo = localStorage.getItem('razon');
    const sede = localStorage.getItem('sede');

    dispatch(postTurno(motivo, tiempoEntrada, sede, celular, nombre, apellido))
    
    

    navigate('/tipoTurno');

  }


  
  return (
    <section className="d-flex justify-content-center align-items-center">
      <div className={`${style.panel} card shadow col-xs-12 col-sm-6 col-md-6 col-lg-4 p-4`}>
        <div className="mb-4 d-flex justify-content-start align-items-center">
          <h4>
            <i className="bi bi-chat-left-quote"></i> &nbsp; REGISTRO DE TURNO
          </h4>
        </div>
        <div className="mb-1">


          <form id="contacto" onSubmit={handleSubmit}>
            <div className="mb-4 d-flex justify-content-between">
              <div>
                <label htmlFor="nombre">
                  <i className="bi bi-person-fill"></i> Nombre
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="nombre"
                  id="nombre"
                  placeholder="ej: Juan"
                  required
                  onChange={handleChangesForm}
                />
                <div className="nombre text-danger"></div>
              </div>
              <div>
                <label htmlFor="apellido">
                  <i className="bi bi-person-bounding-box"></i> Apellido
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="apellido"
                  id="apellido"
                  placeholder="ej: Rodriguez "
                  required
                  onChange={handleChangesForm}
                />
                <div className="apellido text-danger"></div>
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="celular">
                <i className="bi bi-phone"></i> Celular
              </label>
              <input
                type="number"
                className="form-control"
                name="celular"
                id="celular"
                placeholder="ej: 3110002233"
                required
                onChange={handleChangesForm}
              />
              <div className="number text-danger"></div>
            </div>

            <div className="mb-5"></div>

            <div className="mb-4">
              <input
                className="form-check-input"
                type="checkbox"
                id="habeasData"
                onChange={handleChangesForm}
              />
              <label id='habeasData' className="form-check-label" htmlFor="habeasData" >
                Acepta tratamiento de datos
              </label>
            </div>

            <div className="mb-2">
              {habeasData && <button id="botton" className={`${style.boton1} col-12 d-flex justify-content-between`}>
                <span>Enviar</span>
                <i id="icono" className="bi bi-cursor-fill "></i>
              </button>}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default TurnoFormulario;

