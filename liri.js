require("dotenv").config();

var keys = require("./keys.js");

// var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var artist = process.argv[3];
var movie = artist;




var movieF = function () {
    var axios = require("axios");
    var nodeArgs = process.argv;
    var movieName = "";

    for (var i = 3; i < nodeArgs.length; i++) {

        if (i > 3 && i < nodeArgs.length) {
            movieName = movieName + "+" + nodeArgs[i];
        }
        else {
            movieName += nodeArgs[i];
        }
    }
    if (movieName === "") {
        movieName = "Mr. Nobody";
    }

    let queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

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
        }
    );

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
