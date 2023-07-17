const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/SocialNetworkAPI');

module.exports = mongoose.connection;
