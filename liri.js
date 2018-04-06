require("dotenv").config();
var keys = require("./assets/javascript/keys.js").config();

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

