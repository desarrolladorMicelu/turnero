import React, { useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import style from './pendientes.module.css';
import {useDispatch, useSelector} from 'react-redux';
import { getPendientes, verificarToken } from '../../redux/actions';
import TurnoPendiente from './TurnoPendiente';
import { Button, Box, ButtonGroup } from "@chakra-ui/react";
import {useNavigate} from 'react-router-dom';
import Nav from '../navBar/Nav';


const Pendientes = () => {

  const [atendiendo, setAtendiendo] = useState(false);
  const [sede, setSede] = useState('');
  const navigate = useNavigate();
  const [pendientes, setPendientes ] = useState([]);
  const [jefe, setJefe] = useState(false);
  

  const dispatch = useDispatch();


  useEffect(()=>{

    
    

    const verificacion = async()=>{
      const tokenData = await dispatch(verificarToken(localStorage.getItem('token')));
        if(!tokenData.verified){
          navigate('/');
        }
        else{
          setSede(tokenData.info.sede);
          setJefe(tokenData.info.jefeTienda);
        }

      

    }

    const publicacion = async()=>{
      const pendientes = await getPendientes()();
      const pendientesSede = pendientes.filter(turno=>turno.sede===sede);
      setPendientes(pendientesSede);
    }

    verificacion();
    publicacion();
    
  }, [dispatch, atendiendo]);

  

  return (
    <section>

      <div className={`${style.panel1} col-xs-12 p-5 text-center row border-bottom`}>
        <h3 className={`${style.titulop}`}>
          <span>CLIENTES PENDIENTES</span>
        </h3>
      </div>

      <div className={`${style.panelp} col-xs-12 p-5 text-center`}>

        {!atendiendo && <Box
          display='flex'
          alignItems='center'
          justifyContent='center'
          width='100%'
          py={12}
          bgPosition='center'
          bgRepeat='no-repeat'
          mb={2}
        >
          <ButtonGroup gap='4'>
            <Button className={style.boton1} onClick={()=>{setAtendiendo(true)}}>Comenzar atención</Button>
          </ButtonGroup>
        </Box>}

        {atendiendo && pendientes.map((turnoPendiente)=>(
        <TurnoPendiente 
          id={turnoPendiente.id} 
          nombre={`${turnoPendiente.cliente}`} 
          razon={turnoPendiente.razon}
          celular={`${turnoPendiente.celular}`}
          />))}

          
        
      </div>
      <Nav></Nav>
    </section>
  );
};

export default Pendientes;
