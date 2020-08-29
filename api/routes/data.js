var express = require('express');
var fetch = require('node-fetch');
var router = express.Router();

router.get('/', function (req, res, next) {
  let offset = 0;
  let count = 10;
  let dataResponse = {
    fireIncidents: [],
    policeIncidents: [],
  };
  console.log(req);
  fetch(`https://services2.arcgis.com/7KRXAKALbBGlCW77/arcgis/rest/services/Fire_Incidents_by_Location/FeatureServer/0/query?outFields=*&returnGeometry=false&resultOffset=${offset}&resultRecordCount=${count}&f=json&orderByFields=Date%20desc&where=1%3D1&inSR=4326&geometry=%7B%22spatialReference%22%3A%7B%22wkid%22%3A102100%7D%2C%22xmin%22%3A-15947318.779105868%2C%22ymin%22%3A-5688483.988166414%2C%22xmax%22%3A9177838.16633819%2C%22ymax%22%3A8009031.4805336185%7D&geometryType=esriGeometryEnvelope&spatialRel=esriSpatialRelIntersects`, { method: 'GET' })
    .then(response => response.json())
    .then(response => {
      console.log(response.features);
      dataResponse.fireIncidents = response.features.map(incident => {
        return incident.attributes.Type_of_Incident;
      })
    })
    .then(() => {
      return fetch(`https://services2.arcgis.com/7KRXAKALbBGlCW77/arcgis/rest/services/Recoded_Incidents_New/FeatureServer/0/query?outFields=*&returnGeometry=false&resultOffset=${offset}&resultRecordCount=${count}&f=json&orderByFields=Date_of_Report%20desc&where=1%3D1&inSR=4326&geometry=%7B%22spatialReference%22%3A%7B%22wkid%22%3A102100%7D%2C%22xmin%22%3A-14052471.34180974%2C%22ymin%22%3A2967406.4646883975%2C%22xmax%22%3A-7771182.105448766%2C%22ymax%22%3A6391785.331863383%7D&geometryType=esriGeometryEnvelope&spatialRel=esriSpatialRelIntersects`, { method: 'GET' });
    })
    .then(response => response.json())
    .then(response => {
      dataResponse.policeIncidents = response.features.map(incident => {
        return {
          reportedAs: incident.attributes.Reported_As,
          loggedAs: incident.attributes.Offense,
        };
      })
    })
    .then(() => {
      res.send(dataResponse);
    })
    .catch(err => { console.log(err) });
});

module.exports = router;