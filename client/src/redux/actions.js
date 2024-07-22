import axios from 'axios';



export const POST_TURNO = "POST_TURNO";
export const GET_PENDIENTES = "GET_PENDIENTES";
export const GET_ATENDIDOS = "GET_ATENDIDOS";

export const postTurno = (razon, tiempoEntrada, sede, celular, nombre, apellido,comoNosConociste) =>{
    return async (dispatch) =>{
        await axios.post(
            '/turno',
            {razon, tiempoEntrada, sede, celular, nombre, apellido,comoNosConociste}
        );

    }
}

export const getAllTurnos = () =>{
    return async (dispatch) =>{
        const turnos = await axios.get('/turno');
        return turnos.data
    }
}


export const getPendientes = () => {
    return async(dispatch)=>{
        const turnosPendientes = await axios.get('/turno/pendientes');
        return turnosPendientes.data
    }
}

export const getEnAtencion = () => {
    return async(dispatch)=>{
        const turnosPendientes = await axios.get('/turno/enAtencion');
        return turnosPendientes.data
    }
}


export const putTurno = (id, tiempoAtencion, tiempoSalida, empleado) =>{
    return async (dispatch) => {
        await axios.put(
            `/turno/actualizar/${id}`,
            {tiempoAtencion, tiempoSalida, empleado}
        );
    }
}

export const inicioSesion = (nombre, password) =>{
    return async (dispatch) => {
        const response = await axios.post(
            `/inicioSesion`,
            {nombre, password}
        );
        return response.data
    }
}

export const verificarToken = (token) =>{
    return async (dispatch) => {
        let response;
        try{
            response = await axios.post(
                `/inicioSesion/token`,
                {token}
            );

        }catch(error){
            return {error:error.message};
        }
        
        return response.data
    }
}


export const getAtendidos = () => {
    return async(dispatch)=>{
        const turnosAtendidos = await axios.get('/turno/atendidos');
        return turnosAtendidos.data;
    }
}

export const getAllSedes = () => {
    return async()=>{
        const response = await axios.get('/empleado/sede');
        return response.data;
    }
}

export const getAllEmpleados = () => {
    return async()=>{
        const response = await axios.get('/empleado');
        return response.data;
    }
}


export const getEmpleadosDashboard = () => {
    return async()=>{
        const response = await axios.get('/empleado/dashboard');
        return response.data;
    }
}

export const putEmpleado = (id, propiedad, valor) =>{
    return async (dispatch) => {
        let response;
        try{
            response = await axios.put(
                `/empleado`,
                {id:id, propiedad:propiedad, valor:valor}
            );

        }catch(error){
            return {error:error.message};
        }
        
        return response.data
    }
}
export const putContrasenaEmpleado = (id, nombre, password) =>{
    return async (dispatch) => {
        let response;
        try{
            response = await axios.put(
                `/empleado/actualizacion`,
                {id:id, nombre:nombre, password:password}
            );

        }catch(error){
            return {error:error.message};
        }
        
        return response.data
    }
}


export const postEmpleado = (nombre, sede, password) =>{
    return async (dispatch) => {
        let response;
        try{
            response = await axios.post(
                `/empleado`,
                {nombre, sede, password}
            );

        }catch(error){
            return {error:error.message};
        }
        
        return response.data
    }
}

export const postSede = (nombre, password)=>{
    return async (dispatch) => {
        let response;
        try{
            response = await axios.post(
                `/empleado/sede`,
                {nombre:nombre, sede:nombre, password:password}
            );

        }catch(error){
            return {error:error.message};
        }
        
        return response.data
    }
}


