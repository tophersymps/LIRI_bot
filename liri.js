
require("dotenv").config();
//Personal Keys Access for Spotify and Twitter. You will have to set up your own API information within the .env file to run this application.
var keys = require("./assets/javascript/keys.js");
console.log(keys);
var request = require('request');
var Twitter = require("twitter");
var Spotify = require('node-spotify-api');


var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var omdb = (keys.omdb);

console.log(omdb.api_key);

//JohnnyLiri#5 needs to be able to:
//--------------------------------------------------------------------------------------
  // 1. 'my-tweets' -> Show last 20 tweets and when they were tweeted...
  

//--------------------------------------------------------------------------------------
  // 2. 'spotify-this-song' -> Show information about given song
    //  -- Artist
    //  -- Song's Name
    //  -- Preview link of song on Spotify
    //  -- Album the song is from
    //  -- If no song, default to "The Sign" by Ace of Base.


//--------------------------------------------------------------------------------------
  // 3. 'movie-this' -> Output information about given movie
    //  -- Title of Movie
    //  -- Year move came out
    //  -- IMDB rating
    //  -- Rotten Tomatoes rating
    //  -- Country where the movie was produced
    //  -- Language of movie
    //  -- Plot of movie
    //  -- Actors in the movie


//--------------------------------------------------------------------------------------
  // 4. 'do-what-it-says' -> Using the 'fs' node package, LIRI will take the text
  //                         inside of random.txt and use it to call one of the commands
    //  -- Default to run -> 'spotify-this-song' for "I Want it That Way,"




//--------------------------------------------------------------------------------------
  // **Bonus**
  //  In addition to outputing to the terminal, output data to a .txt file called 'log.txt'.
