var dot = require("dotenv").config();
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var omdb = require("omdb");
var fs = require("fs");
var keys = require('./keys.js');

//These are all the instructions the user can enter
//my-tweets
//spotify-this-song
//movie-this
//do-what-it-says
//twitter user is @MarioRe59364418


//declare variables that store user´s input
var userInstruction = process.argv[2];
var instructionValue = process.argv[3];


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


function movies() {

    var queryUrl = "http://www.omdbapi.com/?t=" + instructionValue + "&y=&plot=short&apikey=trilogy";
    //console.log(queryUrl);
    //console.log(instructionValue);    
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
        console.log(keys);
        
        }        
        });
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

        
        
      
        
        //console.log(response); 
      }
    });
    

    
    

}

function spotify(){
    console.log(instructionValue);
    console.log('Spotify api selected');    
}






function doWhatItSays(){
    console.log(instructionValue);
    console.log('Something else selected');

   
}