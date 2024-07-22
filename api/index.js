const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./src/routes/index');
const cors = require("cors");
require('./src/db.js');
const { conn } = require("./src/db.js");
require('dotenv').config();
const putTurno = require('./src/Controllers/turno/putTurno');
const postTurno = require('./src/Controllers/turno/postTurno');
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server,{
  cors: {
    origin: '*'
  }
});



app.name = 'API';

app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors());
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});



app.use('/', routes);

app.put('/turno/actualizar/:id', async(req, res)=>{
  try {
    const {tiempoAtencion, tiempoSalida, empleado} = req.body;
    const {id} = req.params;
    const nuevoTurno = await putTurno(tiempoAtencion, tiempoSalida, id, empleado);
    
    io.emit('actualizacion-turno', { mensaje: 'Se actualizó un turno' });


    res.status(200).json(nuevoTurno);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

})


app.post("/turno", async(req, res) => {
  try {
    const {razon, tiempoEntrada, sede, celular, nombre, apellido,comoNosConociste} = req.body;
    
    const nuevoTurno = await postTurno(razon, tiempoEntrada, sede, celular, nombre, apellido,comoNosConociste);

    io.emit('Creacion-turno', { mensaje: 'Se actualizó un turno' });

    res.status(200).json(nuevoTurno);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Error catching endware.
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});


conn.sync().then(() => {
  server.listen(process.env.PORT, () => {
    console.log("Server is listening at port > ", process.env.PORT);
  });
});

