const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//load models
const Profile = require('../../models/Profile');
const User = require('../../models/User');

module.exports = router;