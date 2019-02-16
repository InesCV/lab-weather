const express = require('express');
const axios = require('axios');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'apiweather', copyright: '© 2019 JdeJ'});
});

router.post('/', (req, res, next) => {
  const { city } = req.body;
  const secret = 'b1ff600b1558ec3acda532913070f180';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${secret}`;

  // Make a request for a user with a given ID
  axios.get(url)
    .then(({ data }) => {
      // handle success
      console.log(data);
      res.render('weather', { title: city, data });
    })
    .catch((error) => {
      // handle error
      console.log(error);
      next();
    });
});

module.exports = router;
