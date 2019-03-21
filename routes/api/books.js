const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const axios = require('axios');

router.get('/browse/category/:catName/:startindex/:maxresults', (req, res) => {
  axios
    .get(
      `https://www.googleapis.com/books/v1/volumes?q=subject:${
        req.params.catName
      }&startIndex=${req.params.startindex}&maxResults=${
        req.params.maxresults
      }&key=${keys.booksApi}`
    )
    .then(response => {
      res.json(response.data);
    })
    .catch(err => {
      res.json({ error: err });
    });
});

module.exports = router;
