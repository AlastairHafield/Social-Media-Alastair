//require mongoose
const { connect, connection } = require("mongoose");

connect("mongodb://localhost/social-network-api", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//export connection
module.exports = connection;
