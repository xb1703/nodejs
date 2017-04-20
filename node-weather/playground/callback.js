var getUser = (id, callback, age) => {
  var user = {
    id: id,
    name: 'Paolo',
    age: age
  }
  //callback(user); // fonction non asynchrone (exécution synchrone)
  setTimeout(() => { // fonction asyncrhone

    callback(user);
  },  1000);
};


getUser(5, (userObject) => {
  console.log(userObject);
},21);

// $('.table').fadeOut('500', ()=>{});
