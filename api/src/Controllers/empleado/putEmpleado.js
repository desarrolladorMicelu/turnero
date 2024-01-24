const {Empleado} = require('../../db').conn2;


const putEmpleado = async(id, propiedad, valor)=>{
    let resultado;
    if(propiedad==='jefeTienda'){
        resultado = await Empleado.update(
            { jefeTienda: valor },
            { where: { id: id } }
          );
    }
    else{
        resultado = await Empleado.update(
            { isAdmin: valor },
            { where: { id: id } }
          );
    }
    
    return resultado;

}

module.exports = putEmpleado;