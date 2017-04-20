var square = x => x*x;

var user = {
  name: 'Paolo',
  sayHi: () => {
    console.log(`Bonjour je suis ${this.name}`); // this = undefined à cause de la fonction fléchée
  },
  sayHello: function() {
    console.log('Bonjour je suis '+this.name);
  },
  sayCiao() {
    console.log(`Bonjour je suis ${this.name}`);
  }
}
console.log(square(9));
console.log(user);
user.sayHi(); // this n'est pas relié à l'objet user
user.sayHello();
user.sayCiao();
