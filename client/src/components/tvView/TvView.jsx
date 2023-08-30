import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import style from './pantalla.module.css';
import {useNavigate} from 'react-router-dom';
import {verificarToken, getEnAtencion, getPendientes} from '../../redux/actions';
import { useDispatch } from 'react-redux';


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
        }
        
        const traerPendientes = async(sedee)=>{
            const pendientesTurnos = await getPendientes()();
            
            const pendientesSede = pendientesTurnos.filter(turno=>turno.sede===sedee);
            setPendientes(pendientesSede);
        }

        const traerEnAtencion = async(sedee)=>{
            const enAtencion = await getEnAtencion()();
            
            const atencionFiltrados = enAtencion.filter(turno=>turno.sede===sedee);
            console.log(atencionFiltrados);
            setEnAtencion(atencionFiltrados);
        }


        const interval = setInterval(() => {

            
            traerPendientes(sede);
            traerEnAtencion(sede)
            
        }, 2000); // 5000 ms = 5 segundos

        
        
        
        fetchInfo();
        // Limpia el intervalo cuando el componente se desmonte
        return () => clearInterval(interval);
      }, [sede]); // El array vacío asegura que el efecto se ejecute solo al montar y desmontar


    return (
    <section className={style.ancho}>
        <div className={`${style.central}`}>
            <p className={`${style.llama}`}> Recuerda tomar tu turno en la tablet para ser atendido </p> 
            
        </div>
        <div className={`${style.container} shadow`}>
            <div className={`${style.half}`}>

                <h2 className={`${style.titulo}`}>Proximos Turnos </h2>
                
                <div className={`${style.esperando} shadow`}>
                
                    
            
                        {pendientes.map((turnoPendiente)=>(
                            <div className={`${style.dcliente}`}>
                                <button  id ="botton" className={`${style.boton} ${style.clientes}`}>
                                    <span className={`${style.parte1}`}>  {turnoPendiente.cliente} </span>
                                    <span> {turnoPendiente.razon} </span>

                                </button>
                            </div> 
                        ))}
                    



                    
                    



                </div>
                

            
            </div>
            <div className={`${style.half}`}>
                
                <h2 className={`${style.titulo}`}>Turnos en atención</h2>


                
                <div className={`${style.actual} shadow`}>

                


                    
                    <div className={`${style.ccliente}`}>
                        <button  id ="botton" className={`${style.boton} ${style.actualb}`}>
                            <span className={`${style.parte1}`}>  {enAtencion[0].cliente} </span>
                        </button>
                    </div> 
                    <div className={`${style.ccliente}`}>
                        <button  id ="botton" className={`${style.boton} ${style.actualb}`}>
                            <span className={`${style.parte1}`}>  {enAtencion[1].cliente} </span>
                        </button>
                    </div> 
                    <div className={`${style.ccliente}`}>
                        <button  id ="botton" className={`${style.boton} ${style.actualb}`}>
                            <span className={`${style.parte1}`}>  {enAtencion[2].cliente} </span>
                        </button>
                    </div> 



                    


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