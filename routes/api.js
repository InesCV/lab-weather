const express = require('express');
const axios = require('axios');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'apiweather', copyright: '© 2019 JdeJ'});
});

router.post('/', async (req, res, next) => {
  const { city } = req.body;
  const secret = 'b1ff600b1558ec3acda532913070f180';
  
  try {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${secret}`;
    const primera = await axios.get(url);

    url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${secret}`;
    const segunda = await axios.get(url);

    await res.render('weather', { title: city, primera, segunda });
  } catch (error) {
    console.log(error);
    res.render('error', { title: 'Not found', city, error });
  }

  // // Make a request for a user with a given ID
  // axios.get(url)
  //   .then((response) => {
  //     // handle success
  //     const { data } = response;
  //     console.log(response);
  //     res.render('weather', { title: city, data });
  //   })
  //   .catch((error) => {
  //     // handle error
  //     console.log(error);
  //     res.render('error', { title: 'Not found', city, error });
  //   });
});

module.exports = router;
