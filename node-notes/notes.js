//console.log('Fichier notes.js chargé');
const fs = require('fs');

var fetchNotes = () => {
  try{
    var notes = fs.readFileSync("notes-data.json");
    return JSON.parse(notes);
  } catch(e) {
    return [];
  }
};

var saveNotes = (notes) => {
  fs.writeFileSync("notes-data.json",  JSON.stringify(notes));
};

var addNote = (title, body) => {
  //console.log(`Ajoute une note ${title}`);
  var notes = fetchNotes(); // récupérer les notes

  var note = {
    title: title,
    body: body
  }

  // ne pas enregistrer deux fois le même titre
  var notesFiltered = notes.filter((obj) => {
    return obj.title === note.title;
  });

  //console.log('notesFiltered',notesFiltered);

  if(notesFiltered.length === 0) {
    notes.push(note);
    saveNotes(notes);
    return note;
  }
  else{
    return undefined;
  }
};

var listNotes = () => {
  //console.log("Affiche l'ensemble des notes");
  return fetchNotes(); // récupérer les notes
};

var getNote = (title) => {
  var notes = fetchNotes(); // récupérer les notes

  var notesFiltered = notes.filter((item) => {
    return item.title === title;
  });

  //if(notesFiltered.length !== 0){
  return notesFiltered[0];
  //}
  //console.log('Body:'+notesFiltered[0].body);

  /*notes.forEach(function(element) {
    if(element.title === 'Regarder la lune')
      console.log('Regarder la lune: ' + element.body);
  });*/

  //console.log("Affiche une note");
};

var removeNote = (title) => {
  //console.log("Supprime une note");
  var originalNotes = fetchNotes(); // récupérer les notes
  var notes = originalNotes.filter(note => note.title !== title);
  saveNotes(notes);
  return originalNotes.length !== notes.length;
};

var logNote = (note) => {
  console.log('------------');
  console.log(`Titre: ${note.title}`);
  console.log(`Contenu: ${note.body}`);
  console.log('------------');
};

module.exports = {
  addNote,
  listNotes,
  getNote,
  removeNote,
  logNote
};
/*
var sum = (a,b) => a + b;
// module qui exporte une fonction sum(a,b)
module.exports = {
  name: 'Mario',
  // sum: function(a,b) { return (a+b); }, // ES5
  sum // connexion clé, valeur automatique
};
*/
