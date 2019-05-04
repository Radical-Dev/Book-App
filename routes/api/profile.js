const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const validateProfileInput = require('../../validation/profile');

//load models
const Profile = require('../../models/Profile');
const User = require('../../models/User');

router.post('/create-profile', (req, res) => {});

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.noprofile = 'No profile for this user';
          return res.status(400).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(error));
  }
);

//Create Profile
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    if (!req.body.handle) {
      errors.handle = 'No handle provided';
      return res.status(400).json(errors);
    }

    let fields = {};
    fields.user = req.user.id;
    if (req.body.handle) fields.handle = req.body.handle;
    if (req.body.quote) fields.favouriteQuote = req.body.quote;
    if (req.body.authors) fields.authors = req.body.authors;
    if (req.body.genres) fields.favouriteCats = req.body.genres;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // console.log(
        //   'request body ' + req.body.quote + ' fields= ' + fields.favouriteQuote
        // );
        //in this case we update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: { ...fields } },
          { new: true }
        )
          .then(profile => {
            console.log('newprofile= ' + profile);
            res.json(profile);
          })
          .catch(err => res.json(err));
      } else {
        Profile.findOne({ handle: fields.handle }).then(profile => {
          if (profile) {
            error.handle = 'That username is already in use';
            res.status(400).json(errors);
          }
          new Profile(fields)
            .save()
            .then(profile => res.json(profile))
            .catch(err => res.json(err));
        });
      }
    });
  }
);

//Add Book to shelf
//revisit to enable editting of book status
router.post(
  '/book-shelf',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    if (!req.body.title) {
      errors.title = 'Book Title Required';
      res.status(400).json(errors);
    }
    Profile.findOne({ user: req.user.id }).then(profile => {
      const newBook = {
        title: req.body.title,
        status: req.body.status,
        thumbnail: req.body.thumbnail,
        id: req.body.id
      };

      profile.bookShelf.unshift(newBook);

      profile.save().then(profile => res.json(profile));
    });
  }
);

router.post(
  '/book-shelf/book/update/status',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    console.log(req.body);
    const errors = {};
    if (!req.body.title) {
      errors.title = 'Book Title Required';
      res.status(400).json(errors);
    }
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        profile.bookShelf.map(book => {
          if (book.title == req.body.title) {
            book.status = req.body.status;
          }
        });
        profile.save().then(profile => {
          res.json(profile);
        });
      })
      .catch(err => res.json(err));
  }
);

module.exports = router;
