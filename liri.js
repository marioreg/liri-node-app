var dot = require("dotenv").config();
var Twitter = require("twitter");
var Spotify = require('node-spotify-api');
var request = require("request");
var omdb = require("omdb");
var fs = require("fs");
var keys = require('./keys.js');
var instructionValue="";
var divider = "\n------------------------------------------------------------\n\n";
//These are all the instructions the user can enter
//my-tweets
//spotify-this-song
//movie-this
//do-what-it-says
//twitter user is @MarioRe59364418

//declare variables that store user´s input

var userInstruction = process.argv[2];
var nodeArgs = process.argv;
//this loop will get argv from 3 to end and convert them into a string with the "+" sign between the spaces
for (var i = 3; i<nodeArgs.length; i++){
instructionValue = instructionValue + "+" + nodeArgs[i];
}
//This removes the "+" sign from the beggining of the string
instructionValue = instructionValue.slice(1);

start();

function start(){
    switch (userInstruction) {
        case "my-tweets":
            tweets();
            break;
        case "spotify-this-song":
            spotify();
            break;
        case "movie-this":
            movies();
            break;
        case "do-what-it-says":
            doWhatItSays();
            break;
        default:
            break;
    }
}


function movies() {
    if (instructionValue!=""){
        var queryUrl = "http://www.omdbapi.com/?t=" + instructionValue + "&y=&plot=short&apikey=trilogy";
        request(queryUrl, function(error, response, body){
            if (!error && response.statusCode === 200){
                var jsonData = JSON.parse(body);
                var display = [
                    "Title: " + jsonData.Title,
                    "Release year: " + jsonData.Year,
                    "IMDB rating: "+ jsonData.Ratings[0].Value,
                    "Rotten tomatoes rating: "+ jsonData.Ratings[1].Value,
                    "Country: "+ jsonData.Country,
                    "Language: "+ jsonData.Language,
                    "Plot: "+ jsonData.Plot,
                    "Actors: "+ jsonData.Actors
                ].join("\n\n");
                console.log(display);
                //call the logTofile function to log result to "log.txt"
                logToFile(display);
            }
            });
    } else {
        var queryUrl = "http://www.omdbapi.com/?t=" + "Mr. Nobody" + "&y=&plot=short&apikey=trilogy";
    request(queryUrl, function(error, response, body){
        if (!error && response.statusCode === 200){
            var jsonData = JSON.parse(body);
            var display = [
                "Title: " + jsonData.Title,
                "Release year: " + jsonData.Year,
                "IMDB rating: "+ jsonData.Ratings[0].Value,
                "Rotten tomatoes rating: "+ jsonData.Ratings[1].Value,
                "Country: "+ jsonData.Country,
                "Language: "+ jsonData.Language,
                "Plot: "+ jsonData.Plot,
                "Actors: "+ jsonData.Actors
            ].join("\n\n");
            console.log(display);
            logToFile(display);
        }
        });
    }
}

function tweets (){
    var Twitter = require('twitter');
    var client = new Twitter(keys.twitter);

    var params = {screen_name: instructionValue, count: 20};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
       if (tweets.length <=20){
        for (var i=0; i<tweets.length; i++){
            var display = [
                "Tweet #"+ (i+1) + " : " + tweets[i].text + "----------creation date: " + tweets[i].created_at,
            ].join("\n\n");
            console.log(display);
            logToFile(display);
        }
       }
      }
    });
}

function spotify(){

    if (instructionValue!=""){
        var spotify = new Spotify(keys.spotify);
        spotify.search({ type: 'track', query: instructionValue, limit: 1 }, function(err, data) {
            if (err) {
              return console.log('Error occurred: ' + err);
            }
            var display = [
                "Artist name: " + data.tracks.items[0].artists[0].name,
                "Song name: " + data.tracks.items[0].name,
                "Album name: " + data.tracks.items[0].album.name,
                "Preview URL: " + data.tracks.items[0].external_urls.spotify
        ].join("\n\n");
        console.log(display);
        logToFile(display);
          });

    } else {

        var spotify = new Spotify(keys.spotify);
        spotify.search({ type: 'track', query: "The sign ace of base", limit: 1 }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        var display = [
            "Artist name: " + data.tracks.items[0].artists[0].name,
            "Song name: " + data.tracks.items[0].name,
            "Album name: " + data.tracks.items[0].album.name,
            "Preview URL: " + data.tracks.items[0].external_urls.spotify
    ].join("\n\n");
    console.log(display);
    logToFile(display);
      });
    }

}

function doWhatItSays (){

    fs.readFile("random.txt", "utf8", function(error, data){

        if (error){
            return console.log(error);
        }
        var randomText = data.split(",");
        userInstruction = randomText[0];
        instructionValue = randomText[1];
        start();
        });
}


function logToFile(varToLog){
    fs.appendFile("log.txt", varToLog + divider, function(err) {
        if (err) throw err;
      });
}