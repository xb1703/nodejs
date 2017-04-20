// http://maps.googleapis.com/maps/api/geocode/json?address=153%20avenue%20de%20bretagne,%20Lille
// npm i request --save
// node app.js -a 'adresse recherchée

const geocode = require('./geocode/geocode'); // .js optionnel
const weather = require('./weather/weather');
const yargs = require('yargs');

const argv = yargs
.options(
  {
    a: {
      demand: true, // required
      alias: 'address',
      describe: 'adresse dont on veut obetnir les coordonnées',
      string: true // formatage en texte
    }
  }
)
.help() // --help
.alias('help', 'h') // nom de la commande, alias
.argv;

// geocode.geocodeAddress(argv.a); // sans callback

// Avec callback
geocode.geocodeAddress(argv.a, (errorMessage, results) => {
  if(errorMessage){
    console.log(errorMessage);
  } else {
    // récupération de la température
    //console.log(results.address);
    weather.getWeather(results.lat, results.lng, (err, res) => {
      if(err){
        console.log(err);
      } else {
        console.log(res);
      }
    });
  }
});
