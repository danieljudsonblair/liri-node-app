require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var moment = require('moment');
// var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var nodeArgs = process.argv;
var fullName = "";

for (var i = 3; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
        fullName = fullName + "+" + nodeArgs[i];
    }
    else {
        fullName += nodeArgs[i];
    }
}


var movieF = function () {
    if (fullName === "") {
        fullName = "Mr. Nobody";
    }

    let queryUrl = "http://www.omdbapi.com/?t=" + fullName + "&y=&plot=short&apikey=trilogy";

    axios.get(queryUrl).then(
        function (response) {
            console.log("Title: " + response.data.Title);
            console.log("Year Released: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.imdbRating);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
            console.log("Production Location: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
        })
    // fs.appendFile(".txt", ", " + num, function (err) {
    //     if (err) {
    //         console.log(err);
    //     }

};

var concertF = function () {

    let queryUrl = "https://rest.bandsintown.com/artists/" + fullName +
        "/events?app_id=codingbootcamp"

    axios.get(queryUrl).then(
        function (response) {
            console.log(moment());
            for (let i = 0; i < response.data.length; i++) {
                console.log("Venue: " + response.data[i].venue.name);
                if (response.data[i].venue.country === 'United States') {
                    console.log("Location: " + response.data[i].venue.city + ", " + response.data[i].venue.region);
                    console.log("Date: " + moment(response.data[i].datetime).format('L'));
                } else {
                    console.log("Location: " + response.data[i].venue.city + ", " + response.data[i].venue.country);
                    console.log("Date: " + moment(response.data[i].datetime).format('L'));
                }

            }
            // console.log(response.data[0]);
        })
};

switch (command) {
    case "concert-this":
        concertF();
        break;
    case "spotify-this-song":
        spotF();
        break;
    case "movie-this":
        movieF();
        break;
    case "do-what-it-says":
        doThisF();
        break;
};
