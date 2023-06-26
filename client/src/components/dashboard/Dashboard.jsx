import React, {useState, useEffect,  useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import style from './dashboard.module.css';
import {  Tabs, 
  TabList, 
  TabPanels, 
  Tab, 
  TabPanel, 
  Table, 
  Thead, 
  Tbody, 
  Tfoot, 
  Tr, 
  Th, 
  Td, 
  TableCaption, 
  TableContainer, 
  SwitchAlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useDisclosure,
  Switch,
  Button,
  AlertDialog,
  useToast,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Stack,
  Box,
  FormLabel,
  Input,
  Select,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription
} from '@chakra-ui/react'

import {getEmpleadosDashboard} from '../../redux/actions';
import { useDispatch } from 'react-redux';
import {putEmpleado, getAllSedes, postEmpleado, verificarToken} from '../../redux/actions';
import Sedes from './Sedes';
import Nav from '../navBar/Nav';
import {useNavigate} from 'react-router-dom';


const Dashboard = () => {

  const [empleados, setEmpleados] = useState([]);
  const [cambiarEmpleado, setCambiarEmpleado] = useState({id:null, nombre:null, cargo:null, valor:null});
  const [sedes, setSedes] = useState([]);

  const [nombreUsuarioNuevo, setNombreUsuarioNuevo] = useState('');
  const [passwordUsuarioNuevo, setPasswordUsuarioNuevo] = useState('');
  const [sedeUsuarioNuevo, setSedeUsuarioNuevo] = useState('');
  const [errorNombre, setErrorNombre] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);


  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const firstField = React.useRef()
  


  const dispatch = useDispatch();
  const navigate = useNavigate();



  useEffect(()=>{

    const fetchInformacionDashboard = async () => {
      try {
        const empleados = await dispatch(getEmpleadosDashboard());
        setEmpleados(empleados);

        const sedesData = await dispatch(getAllSedes());
        setSedes(sedesData);

        const tokenData = await dispatch(verificarToken(localStorage.getItem('token')));
        if(!tokenData.verified){
          navigate('/');
        }
        else{
          setIsAdmin(tokenData.info.admin);
        }

        

        

      } catch (error) {
        console.error('Error al obtener las sedes:', error);
      }
    };

    fetchInformacionDashboard();

  },[dispatch])

  const handleCambioCargo = async(event, nombre, idd, cargoo)=>{
    setCambiarEmpleado({id:idd, nombre:nombre, cargo:cargoo, valor:event.target.checked});

    const cambios = await dispatch(putEmpleado(idd, cargoo,event.target.checked));
    if(cambios.length>0){
      if (event.target.checked) {
        toast({
          title: `Se ha cambiado el cargo del empleado ${nombre}`,
          description: `Ha sido asignado al cargo ${cargoo}`,
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
      } else {
        toast({
          title: `Se ha cambiado el cargo del empleado ${nombre}`,
          description: `Ha sido removido del cargo ${cargoo}`,
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
      }
    }
  }

  const handleCreacionNuevoUsuario = async() =>{
    const filtroNombre = empleados.filter((empleado) => empleado.nombre === nombreUsuarioNuevo );

    if(filtroNombre.length>0){
      setErrorNombre(true);
    }
    else{
      const nuevoEmpleado = await dispatch(postEmpleado(nombreUsuarioNuevo, sedeUsuarioNuevo, passwordUsuarioNuevo));
      onClose();

      toast({
        title: `Se ha creado el nuevo empleado ${nuevoEmpleado.nombre}`,
        description: `Recarga la página para verlo`,
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      
    }
  }

  return ( 
    <section>
      <div className="col-xs-12 p-5 text-center row">
        <h3 className={`${style.titulop}`}>
          <span> Dashboard de administrador </span>
        </h3>
      </div>

    <Tabs align='center' variant='enclosed'>
      <TabList>
        <Tab>Empleados</Tab>
        <Tab>Sedes</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Button mt='5vh' colorScheme='gray' onClick={onOpen}>
                    Añadir nuevo empleado
          </Button>
          <TableContainer className={style.tabla}>
            <Table variant='striped'>
              <Thead>
                <Tr>
                  <Th textAlign='center'>Nombre</Th>
                  <Th textAlign='center'>Sede</Th>
                  <Th textAlign='center'>Jefe de tienda</Th>
                  <Th textAlign='center'>Admin</Th>
                </Tr>
              </Thead>
              <Tbody>
                {empleados.map((empleado)=>(
                  <Tr key={empleado.id}>
                    <Td textAlign='center'>{empleado.nombre}</Td>
                    <Td textAlign='center'>{empleado.sede}</Td>
                    <Td textAlign='center'><Switch size='md' defaultChecked={empleado.jefeTienda} onChange={(event)=>{handleCambioCargo(event, empleado.nombre, empleado.id, 'jefeTienda')}}/></Td>
                    <Td textAlign='center'><Switch size='md' defaultChecked={empleado.isAdmin} onChange={(event)=>{handleCambioCargo(event, empleado.nombre, empleado.id, 'isAdmin')}}/></Td>
                  </Tr>

                ))}

                
              </Tbody>
            </Table>
          </TableContainer>
          
          
        </TabPanel>
        <TabPanel>
          <Sedes></Sedes>
        </TabPanel>
      </TabPanels>
    </Tabs>


    <Drawer
        isOpen={isOpen}
        placement='right'
        initialFocusRef={firstField}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth='1px'>
            Crear nuevo empleado
          </DrawerHeader>

          <DrawerBody>
            <Stack spacing='24px'>
              <Box>
                <FormLabel htmlFor='nombre'>Nombre</FormLabel>
                <Input
                  ref={firstField}
                  id='nombre'
                  placeholder='Ingresa el nombre de usuario'
                  onChange={(event)=>{setNombreUsuarioNuevo(event.target.value)}}
                />
              </Box>
              {errorNombre && <Alert status='error'>
                <AlertIcon />
                <AlertDescription>Ya existe un empleado con ese nombre en el sistema</AlertDescription>
              </Alert>}
              <Box>
                <FormLabel htmlFor='contrasena'>Contraseña</FormLabel>
                <Input
                  id='contrasena'
                  placeholder='Ingresa la contraseña'
                  onChange={(event)=>{setPasswordUsuarioNuevo(event.target.value)}}
                />
              </Box>
              <Box>
                <FormLabel htmlFor='sede'>Sede</FormLabel>
                <Select id='sede' placeholder='Selecciona la sede' onChange={(event)=>{setSedeUsuarioNuevo(event.target.value)}}>
                  {sedes.map((sede)=>(<option key={sede.id} value={sede.nombre} id={sede.id}>{sede.nombre}</option>))}  
                </Select>
              </Box>


            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth='1px'>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={handleCreacionNuevoUsuario} colorScheme='blue' isDisabled={nombreUsuarioNuevo==='' || passwordUsuarioNuevo==='' || sedeUsuarioNuevo===''}>Crear nuevo empleado</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <Nav admin={isAdmin}></Nav>
    </section>  
    );
};

export default Dashboard;