
require("dotenv").config();
//Personal Keys Access for Spotify and Twitter. You will have to set up your own API information within the .env file to run this application.
var keys = require("./assets/javascript/keys.js");
var fs = require("fs");
var request = require('request');
var Twitter = require("twitter");
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var omdb = (keys.omdb.api_key);

var inputString = process.argv;
var action = inputString[2];
var myTweets = [];
var mediaTitle = "";

//Actions:
function theSwitcher() {
  switch (action) {
    // 1. 'my-tweets'
    case "my-tweets":
      printTweets();
    break;
    // 2. 'spotify-this-song'
    case "spotify-this-song":
      spotifySong();
    break;
    // 3. 'movie-this'
    case "movie-this":
      movieThis();
    break;
    // 4. 'do-what-it-says'
    case "do-what-it-says":
      simonSays();
    break;
    default:
    console.log("Does not compute... Please use one of my built-in functions..");
  }
};
// Media input conversions:
function getMedia() {
  if (inputString.length <= 3 && action == "movie-this") {
    mediaTitle = "Mr.+Nobody";
  }
  else if (inputString.length <= 3 && action == "spotify-this-song") {
    mediaTitle = "Ace of Base";
  }
  else {
    //Function to take user input to get song title or Movie title into one variable
    for (var i = 3; i < inputString.length; i++) {
      if (i > 3 && i < inputString.length) {
        mediaTitle = mediaTitle + "+" + inputString[i];
      }
      else {
        mediaTitle += inputString[i];
      }
    }
  } 
}; //end of getMedia function

//JohnnyLiri#5 needs to be able to:
// 1. 'my-tweets' -> Show last 20 tweets and when they were tweeted...  
function printTweets() {
  console.log("Here are your 20 most recent tweets!\n");
  var params = {
    screen_name: 'devLiriBot18',
    count: 20
  };  
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if(error) throw error;
    for(var i = 0; i < tweets.length; i++) {
      myTweets.push({
        timestamp: tweets[i]['created_at'], 
        tweet:tweets[i]['text']
      });
    }
    var count = 1; //number variable to display tweet #s
    for (var j=0; j < myTweets.length; j++){
      console.log("Tweet #" + count);
      console.log(myTweets[j].timestamp);
      console.log(myTweets[j].tweet + "\n");
      count++;
    }
  });
}; // End of printTweets function

//--------------------------------------------------------------------------------------
// 2. 'spotify-this-song' -> Show information about given song
function spotifySong() {
  //use getMedia function to retrieve Movie Title from user input:
  getMedia();
  spotify.search({ type: 'track', query: mediaTitle, limit: 1 }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
    // else
    console.log("------------------------------------------------------");
    console.log(" Here's information on the song you requested:\n");
    console.log(" Artist: " + data.tracks.items[0].artists[0].name);
    console.log(" Song Name: " + data.tracks.items[0].name);
    console.log(" Spotify Preview Link: " + data.tracks.items[0].preview_url);
    console.log(" Album: " + data.tracks.items[0].album.name);
    console.log("------------------------------------------------------");
  });
}; //end of spotifySong function

//--------------------------------------------------------------------------------------
// 3. 'movie-this' -> Output information about given movie  
function movieThis() {
  //use getMedia function to retrieve Movie Title from user input:
  getMedia();

  var queryURL = "http://www.omdbapi.com/?&t=" + mediaTitle + "&plot=short&apikey=" + omdb;
  request(queryURL, function(error, response, body) {
    // If the request is successful (i.e. if the response status code is 200)
    if (!error && response.statusCode === 200) {
      // Parse the body of the site and recover just the imdbRating
      // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
      console.log("------------------------------------------------------");
      console.log(" Here's information on the movie you requested:\n");
      console.log(" Title: " + JSON.parse(body).Title);
      console.log(" IMDB Rating: " + JSON.parse(body).imdbRating);
      console.log(" Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
      console.log(" Produced in: " + JSON.parse(body).Country);
      console.log(" Language: " + JSON.parse(body).Language);
      console.log(" Plot: " + JSON.parse(body).Plot);
      console.log(" Actors: " + JSON.parse(body).Actors);
      console.log("------------------------------------------------------");
    }
  });
}; //end of movieThis function

//--------------------------------------------------------------------------------------
// 4. 'do-what-it-says' -> Using the 'fs' node package, LIRI will take the text
//                         inside of random.txt and use it to call one of the commands
//  -- Default to run -> 'spotify-this-song' for "I Want it That Way,"
function simonSays() {

  // We will read the existing bank file
  fs.readFile("./assets/random.txt", "utf8", function(err, data) {
    if (err) {
      return console.log(err);
    }

    // Break down all the numbers inside
    simonSaid = data.split(",");
    action = simonSaid[0];
    mediaTitle = simonSaid[1];
    theSwitcher();
  });
};

theSwitcher();

//--------------------------------------------------------------------------------------

// **Bonus**
//  In addition to outputing to the terminal, output data to a .txt file called 'log.txt'.