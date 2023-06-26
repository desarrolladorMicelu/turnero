import { GET_PENDIENTES, GET_ATENDIDOS} from "./actions";


const initialState = {
    pendientes: [],
    atendidos: []
}


const rootReducer = (state=initialState, action) => {
    switch (action.type) {
        case GET_PENDIENTES:
            return{
                ...state,
                pendientes: action.payload
            }
        case GET_ATENDIDOS:
            return{
                ...state,
                atendidos: action.payload
            }
        default:
            return {...state};
    }
}

export default rootReducer;