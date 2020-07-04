const express = require('express');
const router = require('./Routes/Router');
const bodyParser = require('body-parser');
var app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/",router);
app.use(express.static('client/build'));


app.listen(PORT);

console.log("Server started");