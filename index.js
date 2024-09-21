const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const express = require("express");
const app = express();
const BookRoute = require("./routes/BookRoute");
const MemberRoute = require("./routes/MemberRoute");
const BorrowRoute = require("./routes/BorrowRoute");
const { swaggerUi, swaggerDocs } = require('./swagger'); // Import Swagger

let bodyParser = require("body-parser");
let methodOverride = require("method-override");

// Swagger route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(bodyParser.urlencoded({ extended: true, limit: "100mb" }));
app.use(bodyParser.json({ limit: "100mb" }));
app.use(
  methodOverride(function (req, res, next) {
    if (Buffer.isBuffer(req.body)) {
      req.body = req.body.toString();
      req.body = JSON.parse(req.body);
    }
  })
);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
  res.header("Access-Control-Expose-Headers", "Content-Length");
  res.header(
    "Access-Control-Allow-Headers",
    "Accept, Authorization, Content-Type, X-Requested-With, Range, x-api-key, x-forwarded-for"
  );
  if (req.method === "OPTIONS") {
    return res.json(200);
  } else {
    return next();
  }
});

BookRoute.routesConfig(app);
MemberRoute.routesConfig(app);
BorrowRoute.routesConfig(app);

module.exports = app;

var server = require("http").createServer(app);
server.listen(process.env.PORT, () => {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Library Port ", host, port);
});
