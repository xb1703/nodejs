/*
var somePromise = new Promise((resolve, reject)=>{
  // asynchrone
  setTimeout(() => {
    resolve('Promesse remplie');
    //reject('Promesse non tenue');
  }, 1500)
});

somePromise.then((res) => {
  console.log(res); // cas resolve
}, (err)=> {
  console.log(err); // cas reject
});
*/

// chainage des promesses
var asyncAdd = (a, b) => {
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      if(typeof a === 'number' && typeof b === 'number'){
        resolve(a + b);
      }else{
        reject('les arguments doivent être des nombres');
      }
    });
  });
};
// la fonction asyncAdd ne renvoie qqch que si chaine à .then (promise)
/*asyncAdd(4, '15').then((res)=>{
  //console.log(res);
  return asyncAdd(res, 12); // deuxième promesse
}, (err) => {
  console.log(err);
}).then((res)=>{  // deuxième chainage
  console.log(res);
},(err)=>{
  console.log(err);
});*/

asyncAdd(4, 15).then((res)=>{
  //console.log(res);
  return asyncAdd(res, '12'); // deuxième promesse
}).then((res)=>{  // deuxième chainage
  console.log(res);
}).catch((err) => { // le catch en fin de chainage permet de gérer l'erreur où qu'elle se trouve dans le chainage de promesse
  console.log(err);
});

/*var calcul = asyncAdd(45, 78);
calcul.then((res)=>{
  console.log(res);
})*/
