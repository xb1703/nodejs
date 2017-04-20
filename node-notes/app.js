//console.log('Application node-notes démarrée');

// Appel à la libraire filesystem (built-in library)
// nodejs docs pour la documentation de la librairie
//const fs = require('fs');
const os = require('os');

// librairies tierces via npm (npmjs.org)
const _ = require('lodash');
const yargs = require('yargs');
/*console.log(_.isString('test'));
console.log(_.isString(3));*/

// fichiers locaux
//require('./notes.js');
const notes = require('./notes');
// console.log(notes.sum(4,5));
// fonction sum exportée dans notes.js
//console.log(notes.readNote('yes'));
//notes.listNotes();

/*
var user = os.userInfo();
var message = `Fichier créé par ${user.username}`;
console.log('userInfo',user);

fs.appendFile('test.txt', message, (err) => {
  if(err){
    return console.log('Erreur dans la création du fichier');
  }
  console.log('fichier créé');
});
*/

// récupérer un argument de la ligne de commande (node app.js list)
// var command = process.argv[2];
var command = yargs.argv._[0];
/*
node app.js add --title=titre
ou node app.js add --title="mangez des pâtes"
ou node app.js add --title test
*/

/*console.log(process.argv);
console.log(yargs.argv);*/

// méthodes yargs (command, help, alias)
// node app.js --help
// node app.js add
// node app.js add --help
// node app.js add -t "Note test"
var titleOptions = {
  describe: 'Titre de la note',
  alias: 't',
  required: true
}
var bodyOptions = {
  describe: 'Contenu de la note',
  alias: 'b',
  required: true
}

const argv = yargs
.command('add', 'Ajoute une note', {
  title: titleOptions,
  body: bodyOptions
})
.command('read', 'Lit une note', {
  title: titleOptions
})
.command('list', 'Affiche la liste des notes')
.command('remove', 'Supprime une note', {
  title: titleOptions
})
.help() // --help
.argv;


if(command == 'add'){
   var note = notes.addNote(argv.title, argv.body);
   if(note) {
    console.log('Note ajoutée avec succès:  ');
    notes.logNote(note);
   }
   else {
     console.log('Ce titre existe déjà');
   }

} else if(command == 'list'){
  var list = notes.listNotes();
  if(list.length > 0) {
    list.forEach((note) => notes.logNote(note));
  }
  else {
    console.log('Liste vide');
  }
} else if(command == 'read'){
  var note = notes.getNote(argv.title);
  //console.log('retour de getNote', note);
  if(note) {
   notes.logNote(note);
  }
  else {
    console.log('Aucune note ne correpond à ce titre');
  }
} else if(command == 'remove'){
  // node app.js remove --title="mangez des pasta"
  var note = notes.removeNote(argv.title);
  var message = (note) ? 'Note suppriméee' : 'La note n\'existe pas';
  console.log(message);

} else{
  console.log('commande inconnue');
}
//console.log('Fin');
