const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const PORT = 3001;

conn.sync({ alter: true }).then(() => {
  server.listen(PORT, () => {
    console.log("Server is listening at port > ", PORT);
  });
});
