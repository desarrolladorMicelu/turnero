import React, {useState} from 'react';
import styles from './landing.module.css'
import 'bootstrap/dist/css/bootstrap.css';
import {useNavigate} from 'react-router-dom';


const LandingComponent = () => {
    const navigate = useNavigate();
    const [seleccionado, setSeleccionado] = useState('');

    const handleChangeRadios = (event) => {
        setSeleccionado(event.target.value);
    };

    const redirectlogin = () =>{
        navigate('/login');
    }

    const redirectTurno = () =>{

        if(seleccionado!==''){
            navigate('/tipoTurno', {state:{sede:seleccionado}});
        }
    }


  return (
    <section className="d-flex justify-content-center align-items-center">
      <div className={`${styles.principal} card shadow border`}>
        <div className="col-xs-12 p-5 text-center row">
          <h3 className={`${styles.titulop}`}>
            <span> GESTION DE TURNOS MICELU </span>
          </h3>
        </div>

        <div className={styles.principal}>
          <div className="border">
            <h2>INGRESO ASESOR:</h2>
            <div className="text-center">
              <button className={styles.boton2} type="submit" onClick={redirectlogin}>
                Entrar
              </button>
            </div>
          </div>

          <div className="border">
            <h2>INGRESO SEDE:</h2>
            <div className="text-center">
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio1"
                  value="Medellin"
                  checked={seleccionado === 'Medellin'}
                  onChange={handleChangeRadios}
                />
                <label className="form-check-label" htmlFor="inlineRadio1">
                  Medellin
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio2"
                  value="Bogota"
                  checked={seleccionado === 'Bogota'}
                  onChange={handleChangeRadios}
                />
                <label className="form-check-label" htmlFor="inlineRadio2">
                  Bogota
                </label>
              </div>

              <button className={styles.boton1} type="submit" onClick={redirectTurno}>
                Entrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingComponent;