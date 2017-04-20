// http://maps.googleapis.com/maps/api/geocode/json?address=153%20avenue%20de%20bretagne,%20Lille
// npm i axios --save => requêtes http sous forme de promesse
// node app.js -a 'adresse recherchée

const yargs = require('yargs');
const axios = require('axios');

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

var adresseEncoded = encodeURIComponent(argv.a);
var geocodeUrl = `http://maps.googleapis.com/maps/api/geocode/json?address=${adresseEncoded}`;

axios.get(geocodeUrl)
  .then((res) => {
    var lat = res.data.results[0].geometry.location.lat;
    var lng = res.data.results[0].geometry.location.lng;
    var weatherUrl = 'https://api.darksky.net/forecast/d4b8c0d79d3caaf64908cd0e8acc0ca8/'+lat+','+lng;
    return axios.get(weatherUrl)
    .then(function (res) {
      console.log(res.data.currently.temperature);
    })
    .catch(function (err) {
      console.log(err);
    });
  })
  .catch(function (err) {
    console.log(err);
});
