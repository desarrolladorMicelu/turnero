import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate} from 'react-router-dom';
import style from './formulario.module.css';
import { postTurno, verificarToken } from '../../redux/actions';
import {useDispatch} from 'react-redux';
import { useToast, Box, Button, Select, Icon, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { BiSolidUser, BiSolidGroup, BiSolidPhone, BiHelpCircle } from 'react-icons/bi';

function TurnoFormulario() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [celular, setCelular] = useState('');
  const [comoNosConociste, setComoNosConociste] = useState('');
  const [habeasData, setHabeasData] = useState(false);
  const [buttonColor, setButtonColor] = useState('black');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const verificacion = async() => {
      const tokenData = await dispatch(verificarToken(localStorage.getItem('token')));
      if(!tokenData.verified) {
        navigate('/');
      }
    }
    verificacion();
  }, [dispatch, navigate]);

  const handleChangesForm = (event) => {
    const {id, value, checked} = event.target;
    if(id === 'celular'){
      setCelular(value);
    } else if(id === 'nombre'){
      setNombre(value);    
    } else if (id === 'apellido') {
      setApellido(value); 
    } else if(id === 'habeasData'){
      setHabeasData(checked);
    } else if(id === 'comoNosConociste'){
      setComoNosConociste(value);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!nombre || !apellido || !celular || !comoNosConociste) {
      toast({
        position: 'top',
        status: 'error',
        duration: 9000,
        isClosable: true,
        render: () => (
          <Box color='white' p={3} bg='red.500'>
            Por favor, complete todos los campos.
          </Box>
        ),
      });
      setButtonColor('black');
      return;
    }

    setButtonColor('#F19C49');

    const tiempoEntrada = new Date();
    const motivo = localStorage.getItem('razon');
    const sede = localStorage.getItem('sede');

    dispatch(postTurno(motivo, tiempoEntrada, sede, celular, nombre, apellido, comoNosConociste));
    
    setIsModalOpen(true);
    
    // Opcional: cerrar el modal después de un tiempo
    setTimeout(() => {
      setIsModalOpen(false);
      navigate('/tipoTurno');
    }, 5000);
  }

  return (
    <Box className={style.container}>
      <div className={`${style.panel} card shadow col-xs-12 col-sm-6 col-md-5 col-lg-4 p-4`}>
        <div className={style['title-container']}>
          <h4 className={style['title-text']}>
            <i className="bi bi-chat-left-quote"></i> REGISTRO DE TURNO
          </h4>
        </div>
        <div className="mb-1">
          <form id="contacto" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="nombre">
                <Icon as={BiSolidUser} boxSize={4} /> Nombre
              </label>
              <input
                type="text"
                className="form-control"
                name="nombre"
                id="nombre"
                placeholder="Ingrese Su Nombre"
                required
                onChange={handleChangesForm}
                value={nombre}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="apellido">
                <Icon as={BiSolidGroup} boxSize={4}/> Apellido
              </label>
              <input
                type="text"
                className="form-control"
                name="apellido"
                id="apellido"
                placeholder="Ingrese Su Apellido"
                required
                onChange={handleChangesForm}
                value={apellido}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="celular">
              <Icon as={BiSolidPhone} boxSize={4}/> Celular
              </label>
              <input
                type="tel"
                className="form-control"
                name="celular"
                id="celular"
                placeholder="Ingrese Su Celular"
                required
                onChange={handleChangesForm}
                value={celular}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="comoNosConociste">
              <Icon as={BiHelpCircle} boxSize={4}/> ¿Cómo nos conociste?
              </label>
              <Select
              type="string"
              className='form-control'
              bg="white"
              placeholder="Seleccione Una Opción"
              id="comoNosConociste"
              required
              onChange={(e) => setComoNosConociste(e.target.value)}
              value={comoNosConociste}
>
            {[
              <option value="instagram" key="instagram">Instagram</option>,
              <option value="tiktok" key="tiktok">TikTok</option>,
              <option value="publicidad" key="publicidad">Publicidad</option>,
              <option value="web" key="web">Pagina Web</option>,
              <option value="market" key="market">MarketPlace</option>,
              <option value="presencial" key="presencial">Presencial</option>,
              <option value="recompra" key="recompra">ReCompra</option>,
              <option value="referidos" key="referidos">Referidos</option>,
              <option value="otros" key="otros">Otros</option>
              ].sort(() => Math.random() - 0.5)}
              </Select>
            </div>
            <div className="mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="habeasData"
                onChange={handleChangesForm}  
                checked={habeasData}
              />
              <label className="form-check-label ms-2" htmlFor="habeasData">
                Acepta tratamiento de datos
              </label>
            </div>
            {habeasData && (
              <div className="mb-3">
                <button
                  id="botton"
                  className={`${style.boton1} col-12 d-flex justify-content-between`}
                  type="submit"
                  style={{backgroundColor: buttonColor}}
                >
                  <span>Enviar</span>
                  <i id="icono" className="bi bi-cursor-fill"></i>
                </button>
              </div>
            )}
            <div className="mb-2">
              <Button w='100%' onClick={() => { navigate('/tipoTurno'); }}>Cancelar turno</Button>
            </div>
          </form>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Registro Exitoso</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>Registrado. Esté atento al llamado.</p>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default TurnoFormulario;