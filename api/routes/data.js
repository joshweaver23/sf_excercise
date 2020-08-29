var express = require('express');
var fetch = require('node-fetch');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  console.log(req);
  fetch('https://opendata.arcgis.com/datasets/93247f69b67343808d91135cd4ef0593_0.geojson')
    .then(response => {
      console.log(response);
    });
  res.send('API working');
});

module.exports = router;