import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import style from './pantalla.module.css';
import {useNavigate} from 'react-router-dom';
import {verificarToken, getEnAtencion, getPendientes} from '../../redux/actions';
import { useDispatch } from 'react-redux';
import io from 'socket.io-client';

const socket = io('https://turnero-production.up.railway.app');
// const socket = io('http://localhost:3001');

const TvView = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [pendientes, setPendientes] = useState([]);
    const [enAtencion, setEnAtencion] = useState([]);
    const [sede, setSede] = useState('');

    useEffect(() => {

        const fetchInfo = async()=>{
            const tokenData = await dispatch(verificarToken(localStorage.getItem('token')));
            if(!tokenData.verified){
                navigate('/');
            }
            else{
                setSede(tokenData.info.sede);
            }
            const enAtencionBack = await getEnAtencion()();
            const pendientesBack = await getPendientes()();
            const atencionSede = enAtencionBack.filter((turno)=>turno.sede==localStorage.getItem('sede'));
            const pendientesSede = pendientesBack.filter((turno)=>turno.sede==localStorage.getItem('sede'));
            setEnAtencion(atencionSede);
            setPendientes(pendientesSede);


        }
        fetchInfo();

        socket.on('actualizacion-turno', async() => {
            console.log('Se recibió una actualización de turno. Recargando la página...');
            try {
              window.location.reload(); // Recargar la página al recibir una actualización
              
            } catch (error) {
              console.error('Error al recargar la página:', error);
            }
          });
          socket.on('Creacion-turno', async() => {
            console.log('Se creó un nuevo turno. Recargando la página...');
            try {
              window.location.reload(); // Recargar la página al recibir una actualización
              
            } catch (error) {
              console.error('Error al recargar la página:', error);
            }
          });

      }, []); // El array vacío asegura que el efecto se ejecute solo al montar y desmontar


    return (
    <section className={style.ancho}>
        <div className={`${style.central}`}>
            <p className={`${style.llama}`}> Recuerda tomar tu turno en la tablet para ser atendido </p> 
            
        </div>
        <div className={`${style.container} shadow`}>
            <div className={`${style.half}`}>

                <h2 className={`${style.titulo}`}>Proximos Turnos </h2>
                
                <div className={`${style.esperando} shadow`}>
    
                    {pendientes.length>0 && <div className={`${style.dcliente}`}>
                        <button  id ="botton" className={`${style.boton} ${style.clientes}`}>
                            <span className={`${style.parte1}`}>  {pendientes.length>0 && pendientes[0].cliente} </span>
                            <span> {pendientes.length>0 && pendientes[0].razon} </span>

                        </button>
                    </div>}

                    {pendientes.length>1 && <div className={`${style.dcliente}`}>
                        <button  id ="botton" className={`${style.boton} ${style.clientes}`}>
                            <span className={`${style.parte1}`}>  {pendientes.length>0 && pendientes[1].cliente} </span>
                            <span> {pendientes.length>0 && pendientes[1].razon} </span>

                        </button>
                    </div> }

                    {pendientes.length>2 && <div className={`${style.dcliente}`}>
                        <button  id ="botton" className={`${style.boton} ${style.clientes}`}>
                            <span className={`${style.parte1}`}>  {pendientes.length>0 && pendientes[2].cliente} </span>
                            <span> {pendientes.length>0 && pendientes[2].razon} </span>

                        </button>
                    </div> }

                </div>

            </div>
            <div className={`${style.half}`}>
                
                <h2 className={`${style.titulo}`}>Turnos en atención</h2>


                
                <div className={`${style.actual} shadow`}>

                


                    
                    {enAtencion.length>0 && <div className={`${style.ccliente}`}>
                        <button  id ="botton" className={`${style.boton} ${style.actualb}`}>
                            <span className={`${style.parte1}`}>  {enAtencion.length>0 && enAtencion[0].cliente} </span>
                        </button>
                    </div>}
                    {enAtencion.length>1 && <div className={`${style.ccliente}`}>
                        <button  id ="botton" className={`${style.boton} ${style.actualb}`}>
                            <span className={`${style.parte1}`}>  {enAtencion.length>0 && enAtencion[1].cliente} </span>
                        </button>
                    </div>}
                    {enAtencion.length>2 && <div className={`${style.ccliente}`}>
                        <button  id ="botton" className={`${style.boton} ${style.actualb}`}>
                            <span className={`${style.parte1}`}>  {enAtencion.length>0 && enAtencion[2].cliente} </span>
                        </button>
                    </div>}



                    


                </div>

                <div className ={`${style.proximo}`}>

                    <span className={`${style.llama}`}> Ultimo llamado: </span>

                    <div className={`${style.ultimoc}`}>
                        <button  id ="botton" className={`${style.boton} ${style.proximob}`}>
                            <span className={`${style.parte1}`}>  {enAtencion.length>0 && enAtencion[0].cliente} </span>
                        </button>
                    </div> 
                </div>



    </div>
        
        </div>
    </section>

    );
};

export default TvView;