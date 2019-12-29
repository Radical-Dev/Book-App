const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const validateProfileInput = require('../../validation/profile');

//load models
const Profile = require('../../models/Profile');
const User = require('../../models/User');

router.post('/create-profile', (req, res) => {});

//Get All profiles. if query is friends=yes then pupulate friends and user fields in document
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    if (req.query.friends && req.query.friends=="yes"){
      console.log("found param");
      Profile.findOne({ user: req.user.id })
      .populate({
        path : 'friends',
        populate : {
          path : 'user'
        }
      })
      .then(profile => {
        if (!profile) {
          errors.noprofile = 'No profile for this user';
          return res.status(400).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(error));
    }
    else{
    Profile.findOne({ user: req.user.id })
      .populate('user')
      .then(profile => {
        if (!profile) {
          errors.noprofile = 'No profile for this user';
          return res.status(400).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(error));
    }
  }
);

router.get(
  '/:profileID',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({user: req.params.profileID})
      .populate('user')
      .then(profile => {
        if (!profile) {
          errors.noprofile = 'Profile not found';
          return res.status(400).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(error));
  }
);


router.get(
  '/all',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    Profile.find({})
      .populate('user')
      .then(profiles => {
        if (!profiles) {
          errors.noprofiles = 'No profiles found';
          return res.status(400).json(errors);
        }
        res.json(profiles);
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

// Update book status
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

// @route   post api/profile/add-friend
// @desc    Add new friend
// @access  Private
router.post(
  '/add-friend',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    //Within this block, I am adding a user's profile into the friend field available in the profile model
    Profile.findOne({ user: req.user.id })
      .then(mainuser => {
        Profile.findOne({ _id: req.body.friendID })
          .then(friendToAdd => {
            //Prevent the sam friend from being added twice
            if(!mainuser.friends.includes(friendToAdd._id)){
              console.log('New friend!');
            mainuser.friends.unshift(friendToAdd._id);
            mainuser.save().then(profile => {
              console.log('friend saved');
              res.json(profile);
            });
          }
          else{
            res.json({ error: 'Friend already present' });
          }
          })
          .catch(err => {
            console.log('not found friend!');
            res.json({ error: 'could not add friend (inner)' });
          });
      })
      .catch(err => {
        res.json({ error: 'main user not found' });
      });
  }
);

module.exports = router;
