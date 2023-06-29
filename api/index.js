const server = require("./src/app.js");
const { conn } = require("./src/db.js");
require('dotenv').config();

conn.sync({ alter: true }).then(() => {
  server.listen(process.env.DB_PORT, () => {
    console.log("Server is listening at port > ", process.env.DB_PORT);
  });
});
