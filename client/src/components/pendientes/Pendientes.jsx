import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import style from './pendientes.module.css';
import { useDispatch } from 'react-redux';
import { getPendientes, verificarToken } from '../../redux/actions';
import TurnoPendiente from './TurnoPendiente';
import { Button, Box, ButtonGroup } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import Nav from '../navBar/Nav';



const reasonOrder = [
  "Asesoría y Ventas",
  "Garantía",
  "Crédito",
  "Servicio Técnico",
];

const Pendientes = () => {
  const [atendiendo, setAtendiendo] = useState(false);
  const [sede, setSede] = useState('');
  const navigate = useNavigate();
  const [pendientes, setPendientes] = useState([]);
  const [jefe, setJefe] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const verificacion = async () => {
      const tokenData = await dispatch(verificarToken(localStorage.getItem('token')));
      if (!tokenData.verified) {
        navigate('/');
      } else {
        setSede(tokenData.info.sede);
        setJefe(tokenData.info.jefeTienda);
      }
    }
    const publicacion = async () => {
      const pendientes = await getPendientes()();
      const pendientesSede = pendientes.filter(turno => turno.sede === sede);
      setPendientes(pendientesSede);
    }
    verificacion();
    publicacion();
  }, [dispatch, atendiendo, navigate, sede]);

  const groupAppointmentsByReason = () => {
    const grouped = {};
    pendientes.forEach((turno, index) => {
      if (!grouped[turno.razon]) {
        grouped[turno.razon] = [];
      }
      grouped[turno.razon].push({ ...turno, orderNumber: index + 1 });
    });
    return grouped;
  };

  const sortedReasons = Object.keys(groupAppointmentsByReason()).sort(
    (a, b) => reasonOrder.indexOf(a) - reasonOrder.indexOf(b)
  );

  return (
    <section style={{ height: '100vh', overflowY: 'auto' }}>
      <div className={`${style.panel1} col-xs-12 text-center`}>
        <h3 className={`${style.titulop}`}>
          <span>CLIENTES PENDIENTES</span>
        </h3>
      </div>
      <div className={`${style.panelp} col-xs-12 p-5 text-center`}>
        {!atendiendo && (
          <Box
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
              <Button className={style.boton1} onClick={() => { setAtendiendo(true) }}>Comenzar atención</Button>
            </ButtonGroup>
          </Box>
        )}
        {atendiendo && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            {sortedReasons.map((reason) => (
              <div key={reason} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                 <h4 style={{ marginBottom: '10px', fontWeight: 'bold' }}>{reason}</h4> {/* Título de la categoría */}
                {groupAppointmentsByReason()[reason].map((turnoPendiente) => (
                  <TurnoPendiente
                    key={turnoPendiente.id}
                    id={turnoPendiente.id}
                    nombre={`${turnoPendiente.cliente}`}
                    razon={turnoPendiente.razon}
                    celular={`${turnoPendiente.celular}`}
                    orderNumber={turnoPendiente.orderNumber}
                  />
                ))}
              </div>
            ))}
            </div>
          </div>
        )}
      </div>
      <Nav></Nav>
    </section>
  );
};

export default Pendientes;