const express = require("express");
const app = express();
const http = require('http').Server(app);
const fs=require('fs');
const url = require('url');
const pug = require('pug');
const io = require('socket.io').listen(http);
// const session = require('cookie-session');
// const bodyParser = require('body-parser');
// const urlencodedParser = bodyParser.urlencoded({ extended: false });
const port = 3000;
let newConnect = [], i = 1;

app.set('view engine', 'pug');
app.use(express.static('./assets'));

app.get('/',(req, res) => {

  res.statusCode = 200;
  
  let query = url.parse(req.url, true).query;
  res.render('index', { name : query.name, message : query.message
  , newConnect : newConnect});
  
});



io.on('connection', function (socket) {
  io.emit('message',"vous êtes connectés");

  console.log(i + "une personne c'est connecter");
  newConnect.push(i);
  i++;
});


http.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
// Quand un client se connecte, on le note dans la console
// const server = http.createServer((req, res) => {
  
//   res.statusCode = 200;
//   const query = url.parse(req.url, true).query;
  
// });
