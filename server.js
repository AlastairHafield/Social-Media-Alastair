//require express
const express = require("express");
//require db
const db = require("./config/connection");
//require routes
const routes = require("./routes");

const cwd = process.cwd();

//create server
const app = express();
//set port
const PORT = process.env.PORT || 3001;

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once("open", () => {
  app.listen(PORT, () => console.log(`Now listening on localhost:${PORT}`));
});
