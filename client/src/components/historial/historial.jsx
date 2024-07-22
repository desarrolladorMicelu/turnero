import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import style from './historial.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAtendidos, getPendientes, getAllSedes, getAllEmpleados, verificarToken, getAllTurnos } from '../../redux/actions';
import { Select, Box, Input } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Nav from '../navBar/Nav';

const Historial = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [atendidosSelect, setAtendidosSelect] = useState('');
  const [sedes, setSedes] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [selectedSede, setSelectedSede] = useState('');
  const [empleadoSelected, setEmpleadoSelected] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [turnos, setTurnos] = useState([]);
  const [atendidos, setAtendidos] = useState([]);
  const [pendientes, setPendientes] = useState([]);
  const [sedeActual, setSedeActual] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const traerTurnos = await dispatch(getAllTurnos());
        const atendidosDispatch = await dispatch(getAtendidos());
        const pendientesDispatch = await dispatch(getPendientes());
        setTurnos(traerTurnos);
        setAtendidos(atendidosDispatch);
        setPendientes(pendientesDispatch);

        const sedesData = await dispatch(getAllSedes());
        setSedes(sedesData);

        const empleadosData = await dispatch(getAllEmpleados());
        setEmpleados(empleadosData);

        const tokenData = await dispatch(verificarToken(localStorage.getItem('token')));
        if (!tokenData.verified) {
          navigate('/');
        } else {
          setIsAdmin(tokenData.info.admin);
          setSedeActual(tokenData.info.sede);
        }
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchData();
  }, [dispatch, navigate]);

  const formatearFechaPicker = (fecha) => {
    const opciones = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return fecha.toLocaleDateString('es-ES', opciones);
  };

  const formateoFecha = (fecha) => {
    if (fecha === null) {
      return 'Sin atender';
    }
    const dateObj = new Date(fecha);
    const year = dateObj.getFullYear();
    const month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
    const day = ("0" + dateObj.getDate()).slice(-2);
    const hours = ("0" + dateObj.getHours()).slice(-2);
    const minutes = ("0" + dateObj.getMinutes()).slice(-2);
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  const turnosRenderizados = () => {
    let filtros = turnos;
    if (!isAdmin) {
      filtros = filtros.filter(turno => turno.sede === sedeActual);
    }
    if (atendidosSelect === 'atendidos') {
      filtros = filtros.filter(turno => turno.atendido === true);
    } else if (atendidosSelect === 'noAtendidos') {
      filtros = filtros.filter(turno => turno.atendido === false);
    }
    if (selectedDate) {
      const fecha = formatearFechaPicker(selectedDate);
      filtros = filtros.filter(turno => formateoFecha(turno.tiempoEntrada).split(' ')[0] === fecha);
    }
    if (selectedSede) {
      filtros = filtros.filter(turno => turno.sede === selectedSede);
    }
    if (empleadoSelected) {
      filtros = filtros.filter(turno => turno.empleado === empleadoSelected);
    }
    if (searchTerm) {
      filtros = filtros.filter(turno => 
        turno.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
        turno.empleado.toLowerCase().includes(searchTerm.toLowerCase()) ||
        turno.razon.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return filtros;
  };

  const handlerAtendidos = (event) => setAtendidosSelect(event.target.value);
  const handlerSede = (event) => setSelectedSede(event.target.value);
  const handlerEmpleado = (event) => setEmpleadoSelected(event.target.value);
  const handleSearchChange = (event) => setSearchTerm(event.target.value);

  return (
    <section>
      <div className="col-xs-12 p-5 text-center row">
        <h3 className={`${style.titulop}`}>
          <span> HISTORIAL DE CLIENTES ATENDIDOS </span>
        </h3>
      </div>
      <div className="card shadow col-xs-12 p-5 text-center row">
        <Box display='flex' justifyContent='start' w='80vw'>
          <Select onChange={handlerAtendidos} variant='filled' placeholder='Atendidos/Sin atender' w='12vw' marginRight='3vw'>
            <option value='atendidos'>Atendidos</option>
            <option value='noAtendidos'>No atendidos</option>
          </Select>
          {isAdmin && (
            <Select onChange={handlerSede} variant='filled' placeholder='Sede' w='10vw' marginRight='3vw'>
              {sedes.map((sede) => (
                <option key={sede.id} value={sede.nombre} id={sede.id}>{sede.nombre}</option>
              ))}
            </Select>
          )}
          <Select onChange={handlerEmpleado} variant='filled' placeholder='Asesor' w='10vw' marginRight='3vw'>
            {empleados.map((empleado) => (
              <option key={empleado.id} value={empleado.nombre} id={empleado.id}>{empleado.nombre}</option>
            ))}
          </Select>
          <DatePicker
            selected={selectedDate}
            onChange={date => setSelectedDate(date)}
            dateFormat='dd/MM/yyyy'
            placeholderText='Selecciona una fecha'
            customInput={<Input placeholder='dd/MM/yyyy' />}
          />
          <Input 
            placeholder='Buscar...'
            value={searchTerm}
            onChange={handleSearchChange}
            w='15vw'
            marginLeft='3vw'
          />
        </Box>
        <table className={`${style.tabla} tabla1 bold`}>
          <tbody>
            <tr className="border">
              <td className={`${style.ttabla}`}><i className="bi bi-person text-warning"></i> Sede</td>
              <td className={`${style.ttabla}`}><i className="bi bi-people text-warning"></i>Cliente</td>
              <td className={`${style.ttabla}`}><i className="bi bi-person text-warning"></i> Asesor</td>
              <td className={`${style.ttabla}`}><i className="bi bi-bookmark-star text-warning"></i> Tipo de visita</td>
              <td className={`${style.ttabla}`}><i className="bi bi-clock text-warning"></i> Check In</td>
              <td className={`${style.ttabla}`}><i className="bi bi-clock text-warning"></i> Atencion</td>
              <td className={`${style.ttabla}`}><i className="bi bi-stopwatch text-warning"></i> Check out</td>
              <td className={`${style.ttabla}`}><i className="bi bi-stopwatch text-warning"></i> habeasData</td>
            </tr>
            {turnosRenderizados().map((fila, index) => (
              <tr key={index}>
                <td>{fila.sede}</td>
                <td>{fila.cliente}</td>
                <td>{fila.empleado !== 'null' ? fila.empleado : 'Sin atender'}</td>
                <td>{fila.razon}</td>
                <td>{formateoFecha(fila.tiempoEntrada)}</td>
                <td>{formateoFecha(fila.tiempoAtencion)}</td>
                <td>{formateoFecha(fila.tiempoSalida)}</td>
                <td>Términos aceptados</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Nav admin={isAdmin} />
    </section>
  );
};

export default Historial;