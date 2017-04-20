const request = require('request');

var geocodeAddress = (address) => {

  return new Promise((resolve, reject) => {

    // encodage de l'adresse
    var adresseEncoded = encodeURIComponent(address);
    request(
      {
        url: 'http://maps.googleapis.com/maps/api/geocode/json?address='+adresseEncoded,
        json: true // force la réponse en json
      },
      (error, response, body) => {
        if(error) {
          //console.log('error:', error); // Print the error if one occurred
          reject('Connexion au serveur impossible');
        } else if(body.status === 'ZERO_RESULTS'){
          //console.log('Aucun résultat pour l\'adresse fournie');
          reject('Aucun résultat pour l\'adresse fournie');
        } else if(body.status === 'OK'){
          //console.log("Latitude:", body.results[0].geometry.location.lat);
          //console.log("Longitude:", body.results[0].geometry.location.lng);
          resolve({
            address: body.results[0].formatted_address,
            lat: body.results[0].geometry.location.lat,
            lng: body.results[0].geometry.location.lng
          });
        }
      }
    );

  });
}

geocodeAddress('153 avenue de bretagne').then((res) => {
  console.log('latitude: '+res.lat);
  console.log('longitude: '+res.lng);
}, (err)=> {
  console.log(err);
});
