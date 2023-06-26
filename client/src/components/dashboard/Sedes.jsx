import React, {useState, useEffect,  useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import style from './dashboard.module.css';

import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Button,
    useDisclosure,
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
    Alert,
    AlertIcon,
    useToast,
    AlertDescription
  } from '@chakra-ui/react'
import { useDispatch } from 'react-redux';
import {getAllSedes, postSede} from '../../redux/actions';

const Sedes = () => {

    const [sedes, setSedes] = useState([]);
    const [errorNombre, setErrorNombre] = useState(false);
    const [nombreNuevaSede, setNombreNuevaSede] = useState('');
    const [contrasenaNuevaSede, setContrasenaNuevaSede] = useState('');

    const dispatch = useDispatch();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const firstField = React.useRef();

    const toast = useToast();



    useEffect(()=>{
        const fetchInformacionDashboard = async () => {
            try {
    
            const sedesData = await dispatch(getAllSedes());
            setSedes(sedesData);
    
            } catch (error) {
            console.error('Error al obtener las sedes:', error);
            }
        };
  
      fetchInformacionDashboard();
    }, [dispatch]) 

    const handleInputNombre = (event) => {
        setNombreNuevaSede(event.target.value);
    }
    const handleInputContrasena = (event) =>{
        setContrasenaNuevaSede(event.target.value);
    }



    const handlePostSede = async()=>{
        const filtroNombre = sedes.filter((sede) => sede.nombre === nombreNuevaSede );

        if(filtroNombre.length>0){
            setErrorNombre(true);
        }
        else{
            const nuevoEmpleado = await dispatch(postSede(nombreNuevaSede, contrasenaNuevaSede));
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
        <div>
            <Button mt='5vh' colorScheme='gray' onClick={onOpen}>
                    Añadir nueva sede
            </Button>
            <TableContainer className={style.tabla}>
                <Table variant='striped'>
                    <Thead>
                        <Tr>
                            <Th textAlign='center'>Sede</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {sedes.map((sede)=>(
                        <Tr key={sede.id}>
                            <Td textAlign='center'>{sede.nombre}</Td>
                        </Tr>
                        ))}
                    
                    </Tbody>
                </Table>
            </TableContainer>
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
                    Crear nueva sede
                </DrawerHeader>

                <DrawerBody>
                    <Stack spacing='24px'>
                        <Box>
                            <FormLabel htmlFor='sede'>Nombre</FormLabel>
                            <Input
                            ref={firstField}
                            id='sede'
                            placeholder='Ingresa el nombre de la sede'
                            onChange={handleInputNombre}
                            />
                            
                        </Box>
                        {errorNombre && <Alert status='error'>
                            <AlertIcon />
                            <AlertDescription>Ya existe una sede con ese nombre en el sistema</AlertDescription>
                        </Alert>}
                        <Box>
                            <FormLabel htmlFor='Contrasena'>Contraseña</FormLabel>
                            <Input
                            ref={firstField}
                            id='Contrasena'
                            placeholder='Registra la contraseña'
                            onChange={handleInputContrasena}
                            />
                            
                        </Box>
                    </Stack>
                </DrawerBody>

                <DrawerFooter borderTopWidth='1px'>
                    <Button variant='outline' mr={3} onClick={onClose}>
                    Cancelar
                    </Button>
                    <Button colorScheme='blue' onClick={handlePostSede}>Crear sede</Button>
                </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </div>
    )
}

export default Sedes;