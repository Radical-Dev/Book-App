const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const axios = require('axios');

router.get('/browse/category/:catName', (req, res) => {
  axios
    .get(
      `https://www.googleapis.com/books/v1/volumes?q=subject:${
        req.params.catName
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
