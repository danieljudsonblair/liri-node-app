require("dotenv").config();

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

var command = process.argv[2];

switch (command) {
    case "concert-this":
      concert();
      break;
    case "spotify-this-song":
      spot();
      break;
    case "movie-this":
      movie();
      break;
    case "do-what-it-says":
      dothis();
      break;
    };

    

