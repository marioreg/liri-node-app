var dot = require("dotenv").config();
var Twitter = require("twitter");
var Spotify = require('node-spotify-api');
var request = require("request");
var omdb = require("omdb");
var fs = require("fs");
var keys = require('./keys.js');
var instructionValue="";

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
//This condition removes the "+" sign from the beggining of the string
if( instructionValue.charAt(0) === '+' ){
    instructionValue = instructionValue.slice(1);
}

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
        case "doSomething":
            doSomething();        
            break;
        default:
            break;
    }
        

function movies() {


    if (instructionValue!=""){

        var queryUrl = "http://www.omdbapi.com/?t=" + instructionValue + "&y=&plot=short&apikey=trilogy";
               
        request(queryUrl, function(error, response, body){
            if (!error && response.statusCode === 200){        
            console.log("Title: "+ JSON.parse(body).Title);
            console.log("Release year: " + JSON.parse(body).Year);
            console.log("IMDB rating: "+ JSON.parse(body).Ratings[0].Value);
            console.log("Rotten tomatoes rating: "+ JSON.parse(body).Ratings[1].Value);
            console.log("Country: "+ JSON.parse(body).Country);
            console.log("Language: "+ JSON.parse(body).Language);
            console.log("Plot: "+ JSON.parse(body).Plot);
            console.log("Actors: "+ JSON.parse(body).Actors);
            }        
            });


    } else {

        var queryUrl = "http://www.omdbapi.com/?t=" + "Mr. Nobody" + "&y=&plot=short&apikey=trilogy";
               
    request(queryUrl, function(error, response, body){
        if (!error && response.statusCode === 200){        
        console.log("Title: "+ JSON.parse(body).Title);
        console.log("Release year: " + JSON.parse(body).Year);
        console.log("IMDB rating: "+ JSON.parse(body).Ratings[0].Value);
        console.log("Rotten tomatoes rating: "+ JSON.parse(body).Ratings[1].Value);
        console.log("Country: "+ JSON.parse(body).Country);
        console.log("Language: "+ JSON.parse(body).Language);
        console.log("Plot: "+ JSON.parse(body).Plot);
        console.log("Actors: "+ JSON.parse(body).Actors);
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
            console.log("Tweet #" + (i+1) + " : " + tweets[i].text + "----------creation date: " + tweets[i].created_at);            
        }
       } else {
        for (var i=0; i<20; i++){
            console.log("Tweet #" + (i+1) + " : " + tweets[i].text + "----------creation date: " + tweets[i].created_at);            
        }
       }      
      }
    });  
}

function spotify(){  
    
    if (instructionValue!=""){
        var spotify = new Spotify(keys.spotify);
        spotify.search({ type: 'track', query: instructionValue, limit: 3 }, function(err, data) {
            if (err) {
              return console.log('Error occurred: ' + err);
            } 
                console.log("Artist name: " + data.tracks.items[0].artists[0].name);
                console.log("Song name: " + data.tracks.items[0].name);
                console.log("Album name: " + data.tracks.items[0].album.name);
                console.log("Preview URL: " + data.tracks.items[0].external_urls.spotify);
                        
          });        

    } else {

        var spotify = new Spotify(keys.spotify);
    spotify.search({ type: 'track', query: "The sign ace of base", limit: 1 }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }                
            console.log("Artist name: " + data.tracks.items[0].artists[0].name);
            console.log("Song name: " + data.tracks.items[0].name);
            console.log("Album name: " + data.tracks.items[0].album.name);
            console.log("Preview URL: " + data.tracks.items[0].external_urls.spotify);
      
        
      });
    }
    
}

function doWhatItSays (){
   
    fs.readFile("random.txt", "utf8", function(error, data){

        if (error){
            return console.log(error);
        }
        
        var randomText = data.split(",");        
        for (var i=0; i<randomText.length; i++){
            console.log("Element "+ i + ": " +randomText[i]);            
        }
 
        
        

        });
        
   

}