console.log('Démarrage de l\'appli');
// fonction asynchrone étiquetée par node API
setTimeout(() => {
  console.log('Premier settimeout');
},2000);
// fonction synchrone étiquetée par node API
setTimeout(() => {
  console.log('Deuxième settimeout');
},0);
// fonction synchrone non étiquetée par node API
console.log('Fin de l\'appli');
