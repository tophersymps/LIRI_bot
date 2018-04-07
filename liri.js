
require("dotenv").config();
//Personal Keys Access for Spotify and Twitter. You will have to set up your own API information within the .env file to run this application.
var keys = require("./assets/javascript/keys.js");

var request = require('request');
var Twitter = require("twitter");
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var omdb = (keys.omdb.api_key);
console.log(omdb);

var inputString = process.argv;
var action = inputString[2];



//JohnnyLiri#5 needs to be able to:
//--------------------------------------------------------------------------------------
// 1. 'my-tweets' -> Show last 20 tweets and when they were tweeted...
var myTweets = [];
  
var printTweets = function() {
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
};   
  // Below code sends tweet:
  // client.post("statuses/update", {status: "Here's Johnny!"},  function(error, tweet, response) {
  //   if(error) throw error;
  //   console.log(tweet);  // Tweet body. 
  //   console.log(response);  // Raw response object. 
  // });

//--------------------------------------------------------------------------------------
  // 2. 'spotify-this-song' -> Show information about given song
    //  -- Artist
    //  -- Song's Name
    //  -- Preview link of song on Spotify
    //  -- Album the song is from
    //  -- If no song, default to "The Sign" by Ace of Base.


//--------------------------------------------------------------------------------------
  // 3. 'movie-this' -> Output information about given movie
  var queryURL = "http://www.omdbapi.com/?apikey=" + omdb;
  console.log(queryURL);
//   request("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy", function(error, response, body) {

//   // If the request is successful (i.e. if the response status code is 200)
//   if (!error && response.statusCode === 200) {

//     // Parse the body of the site and recover just the imdbRating
//     // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
//     console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
//   }
// });
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

//Actions:

switch (action) {
  // 1. 'my-tweets'
  case "my-tweets":
    printTweets();
  break;
  // 2. 'spotify-this-song'
  // case "spotify-this-song"
  //   spotifySong();
  // break;
  // // 3. 'movie-this'
  // case "movie-this"
  //   omdbInfo();
  // break;
  // // 4. 'do-what-it-says'
  // case "do-what-it-says"
  //   simonSays();
  // break;
}
