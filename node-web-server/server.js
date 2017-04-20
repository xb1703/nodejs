// npm i express --save // mettre en place un serveur web (expressjs.com)
// nodemon -g pour monitorer
// HAPI, SAVE
// ejs, handlebars : moteur de rendu javascript
const fs = require('fs');

const express = require('express');
const hbs = require('hbs');
const app = express();


// template de vue
app.set('view engine', 'hbs');

// dossier des fichiers inclus
hbs.registerPartials(__dirname+'/views/partials');
// création de helpers
hbs.registerHelper('getCurrrentYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('upperCase', (text) => {
  return text.toUpperCase();
});

app.use(express.static(__dirname+'/public')); // on peut accéder à localhost:3000/img/elephant.jpg // public est invisble pour le client
// on peut accéder aussi à help.html

// middleware destiné à enregistrer des infos dans un fichier de log
app.use((req, res, next) => {
  console.log(req.method);
  var now = new Date().toString();
  var log = `${now} : ${req.method} ${req.url}`;

  fs.appendFile('server.log', log+"\n", (err)=>{
    if(err) console.log('impossible d\'écrire dans le fichier');
  });

  next();
});

app.get('/', (req, res) => {
  res.send({
    name: 'Paolo',
    age: 21
  });
});

app.get('/about', (req, res) => {
  //res.send('<p><em>About page</em></p>');
  res.render('about', { // about.hbs
    title: 'Page à propos',
    image: 'elephant.jpg',
    users: [
      { name: 'Luigi', number: 3},
      { name: 'Mario', number: 4},
      { name: 'Giani', number: 5}
    ]
  }); // méthode render du moteur de templates hbs
});

app.get('/bad', (req, res) => {
  //res.send('<h1>WTF</h1>');
  //res.send({
  //  err : 'Cette route n\'existe pas !'
  //})
    res.render('bad', {
      title: 'Page Bad',
      h1: 'Bad'
    });
});


var server = app.listen(3000, () => {
  console.log('Serveur écoutant sur le port 3000');
});

server.on('exit', function () {
  console.log('About to exit.');
});
