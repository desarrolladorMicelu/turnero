import React, {useState, useEffect,  useRef } from 'react';
import  FocusLock from "react-focus-lock"
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor,
    FormControl,
    FormLabel,
    Input,
    Stack,
    ButtonGroup,
    Button,
    useDisclosure,
    Box, 
    IconButton,
    useToast

  } from '@chakra-ui/react'

import {EditIcon} from '@chakra-ui/icons';
import { putContrasenaEmpleado } from '../../redux/actions';
import { useDispatch } from 'react-redux';


// 1. Create a text input component
const TextInput = React.forwardRef((props, ref) => {
    return (
      <FormControl>
        <FormLabel htmlFor={props.id}>{props.label}</FormLabel>
        <Input ref={ref} id={props.id} {...props} />
      </FormControl>
    )
  })
  
  // 2. Create the form
  const Form = ({ firstFieldRef, onCancel, name, id}) => {
    const toast = useToast();
    const [disabled, setDisabled] = useState(true);
    const [nombre, setNombre] = useState(name);
    const [contrasena, setContrasena] = useState('');
    const dispatch = useDispatch();
    const onChange = (event)=>{

        if(event.target.id==='pass'){
            setContrasena(event.target.value);
            
        }
        else{
            setNombre(event.target.value);
        }
        
        if(contrasena!=='' && nombre!==''){
            setDisabled(false);
        }
        if(contrasena==='' || nombre===''){
            setDisabled(true);
        }
    }
    const envioFormulario = async()=>{
      const actualizacion = await dispatch(putContrasenaEmpleado(id, nombre, contrasena));
      console.log(actualizacion);

      if(actualizacion.length>0){
        toast({
          title: `Se ha cambiado el nombre y la contraseña satisfactoriamente`,
          description: ``,
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
      }
      onCancel();
    }


    return (
      <Stack >
        <FormLabel htmlFor='name'  m='0'>Nombre</FormLabel>
        <Input id='name'  defaultValue={name} onChange={onChange}/>
        <FormLabel htmlFor='pass' m='0'>Nueva contrasena</FormLabel>
        <Input id='pass' onChange={onChange}/>
        <ButtonGroup display='flex' justifyContent='flex-end'>
          <Button variant='outline' onClick={onCancel}>
            Cancel
          </Button>
          <Button isDisabled={disabled} colorScheme='teal' onClick={envioFormulario}>
            Guardar
          </Button>
        </ButtonGroup>
      </Stack>
    )
  }
  
  // 3. Create the Popover
  // Ensure you set `closeOnBlur` prop to false so it doesn't close on outside click
  const PopoverForm = ({name, id}) => {
    const { onOpen, onClose, isOpen } = useDisclosure()
    const firstFieldRef = React.useRef(null)
  
    return (
      <>
        <Popover
          isOpen={isOpen}
          initialFocusRef={firstFieldRef}
          onOpen={onOpen}
          onClose={onClose}
          placement='right'
          closeOnBlur={false}
        >
          <PopoverTrigger>
            <IconButton size='sm' icon={<EditIcon />} />
          </PopoverTrigger>
          <PopoverContent p={5}>
            <FocusLock returnFocus persistentFocus={false}>
              <PopoverArrow />
              <PopoverCloseButton />
              <Form firstFieldRef={firstFieldRef} onCancel={onClose} name={name} id={id}/>
            </FocusLock>
          </PopoverContent>
        </Popover>
      </>
    )
  }

export default PopoverForm;
  
