require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var moment = require('moment');
var fs = require("fs");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
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
    var movieObj = {
        BegDivider: "",
        Title: "",
        Year: "",
        IMDBRat: "",
        RTRat: "",
        Location: "",
        Language: "",
        Plot: "",
        Actors: "",
        EndDivider: ""
    }
    if (fullName === "") {
        fullName = "Mr. Nobody";
    }
    let queryUrl = "http://www.omdbapi.com/?t=" + fullName + "&y=&plot=short&apikey=trilogy";

    axios.get(queryUrl).then(
        function (response) {
            movieObj.BegDivider = "-----------------------------------------------";
            movieObj.Title = "Title: " + response.data.Title;
            movieObj.Year = "Year Released: " + response.data.Year;
            movieObj.IMDBRat = "IMDB Rating: " + response.data.imdbRating;
            movieObj.RTRat = "Rotten Tomatoes Rating: " + response.data.Ratings[1].Value;
            movieObj.Location = "Production Location: " + response.data.Country;
            movieObj.Language = "Language: " + response.data.Language;
            movieObj.Plot = "Plot: " + response.data.Plot;
            movieObj.Actors = "Actors: " + response.data.Actors;
            movieObj.EndDivider = "-----------------------------------------------";


            for (var key in movieObj) {
                console.log(movieObj[key]);
            }
            fs.appendFile("log.txt", "\n" + "Command: " + command + " " + fullName + "\n" + JSON.stringify(movieObj, null, 2) + "\n", function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Content Appended to log.txt");
                }
            })

        })

};

var concertF = function () {

    let queryUrl = "https://rest.bandsintown.com/artists/" + fullName +
        "/events?app_id=codingbootcamp"

    axios.get(queryUrl).then(
        function (response) {
            var concertObj = {
                VenLocDate: []
            }
            for (let i = 0; i < response.data.length; i++) {
                console.log("-----------------------------------------------");
                console.log("Venue: " + response.data[i].venue.name);
                concertObj.VenLocDate.push("\n" + "Venue: " + response.data[i].venue.name);
                if (response.data[i].venue.country === 'United States') {
                    console.log("Location: " + response.data[i].venue.city + ", " + response.data[i].venue.region);
                    concertObj.VenLocDate.push("\n" + "Location: " + response.data[i].venue.city + ", " + response.data[i].venue.region);
                    console.log("Date: " + moment(response.data[i].datetime).format('L'));
                    concertObj.VenLocDate.push("\n" + "Date: " + moment(response.data[i].datetime).format('L'));
                    concertObj.VenLocDate.push("\n" + "-----------------------------------------------");
                } else {
                    console.log("Location: " + response.data[i].venue.city + ", " + response.data[i].venue.country);
                    concertObj.VenLocDate.push("\n" + "Location: " + response.data[i].venue.city + ", " + response.data[i].venue.country);
                    console.log("Date: " + moment(response.data[i].datetime).format('L')); + 
                    concertObj.VenLocDate.push("\n" + "Date: " + moment(response.data[i].datetime).format('L'));
                    concertObj.VenLocDate.push("\n" + "-----------------------------------------------");
                }
                if (i === response.data.length - 1) {
                    console.log("-----------------------------------------------");
                }

            }

            fs.appendFile("log.txt", "\n" + "Command: " + command + " " + fullName + "\n" + concertObj.VenLocDate, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Content Appended to log.txt");
                }
            })
        })
};

var spotF = function () {
    var spotObj = {
        Command: "Command: " + command + " " + fullName,
        BegDivider: [],
        Artist: [],
        TrackName: [],
        PreviewURL: [],
        Album: [],
        EndDivider: []
    }
    fs.appendFileSync("log.txt", "\n" + "\n" + spotObj.Command + "\n");
    if (fullName === "") {
        spotify.search({ type: 'track', query: "Ace of Base" })
            .then(function (response) {
                console.log("-----------------------------------------------");
                console.log("Artist: " + response.tracks.items[19].artists[0].name);
                spotObj.Artist.push("Artist: " + response.tracks.items[19].artists[0].name);
                console.log("Track Name: " + response.tracks.items[19].name);
                spotObj.TrackName.push("Track Name: " + response.tracks.items[19].name);
                console.log("Preview URL: " + response.tracks.items[19].preview_url);
                spotObj.PreviewURL.push("Preview URL: " + response.tracks.items[19].preview_url);
                console.log("Album: " + response.tracks.items[19].album.name);
                spotObj.Album.push("Album: " + response.tracks.items[19].album.name);
                console.log("-----------------------------------------------");
            })
    } else {
        spotify.search({ type: 'track', query: fullName })
            .then(function (response) {
                for (let j = 0; j < response.tracks.items.length; j++) {
                    console.log("------------------------------------------------");
                    spotObj.BegDivider.push("------------------------------------------------");
                    console.log("Artist: " + response.tracks.items[j].artists[0].name);
                    spotObj.Artist.push("Artist: " + response.tracks.items[j].artists[0].name);
                    console.log("Track Name: " + response.tracks.items[j].name);
                    spotObj.TrackName.push("Track Name: " + response.tracks.items[j].name);
                    if (response.tracks.items[j].preview_url == null) {
                        console.log("Preview URL Not Available");
                        spotObj.PreviewURL.push("Preview URL Not Available");
                    } else {
                        console.log("Preview URL: " + response.tracks.items[j].preview_url);
                        spotObj.PreviewURL.push("Preview URL: " + response.tracks.items[j].preview_url);
                    }
                    console.log("Album: " + response.tracks.items[j].album.name);
                    spotObj.Album.push("Album: " + response.tracks.items[j].album.name);
                    if (j === response.tracks.items.length - 1) {
                        console.log("------------------------------------------------");
                        spotObj.EndDivider.push("------------------------------------------------");
                    }

                }

                for (let k = 0; k < spotObj.TrackName.length; k++) {
                    fs.appendFile("log.txt", "\n" + spotObj.BegDivider[k] + "\n" + spotObj.Artist[k] + "\n" + spotObj.TrackName[k] + "\n" + spotObj.PreviewURL[k] + "\n" + spotObj.Album[k], function (err) {
                        if (err) {
                            console.log(err);
                        } else {

                        }
                    })
                }
                console.log("Content Appended to log.txt");
            })
            .catch(function (err) {
                console.log(err);
            });
    }
};

var doThisF = function () {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }

        data = data.split(",")
        var rand = Math.floor(Math.random() * data.length * .5) * 2;
        fullName = data[rand + 1];

        switch (data[rand]) {
            case "concert-this":
                concertF();
                break;
            case "spotify-this-song":
                spotF();
                break;
            case "movie-this":
                movieF();
                break;
        }
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
