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
var divider = "-----------------------------------------------";
var limit = 20;
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

            movieObj.BegDivider = divider;
            movieObj.Title = "Title: " + response.data.Title;
            movieObj.Year = "Year Released: " + response.data.Year;
            movieObj.IMDBRat = "IMDB Rating: " + response.data.imdbRating;
            movieObj.RTRat = "Rotten Tomatoes Rating: " + response.data.Ratings[1].Value;
            movieObj.Location = "Production Location: " + response.data.Country;
            movieObj.Language = "Language: " + response.data.Language;
            movieObj.Plot = "Plot: " + response.data.Plot;
            movieObj.Actors = "Actors: " + response.data.Actors;
            movieObj.EndDivider = divider;

            for (var key in movieObj) {
                console.log(movieObj[key]);
            }
            fs.appendFile("log.txt", "\n\n" + "Command: " 
                                            + command + " " 
                                            + fullName + "\n\n"
                                            + divider + "\n"
                                            + movieObj.Title + "\n"
                                            + movieObj.Year + "\n"
                                            + movieObj.IMDBRat + "\n"
                                            + movieObj.RTRat + "\n"
                                            + movieObj.Location + "\n"
                                            + movieObj.Language + "\n"
                                            + movieObj.Plot + "\n"
                                            + movieObj.Actors + "\n"
                                            + divider, 
                function (err) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Content Appended to log.txt");
                    }
                })

        }).catch(function (err) {
            console.log(err);
        });

};

var concertF = function () {
    var concertObj = {
        Command: "Command: " + command + " " + fullName,
        Venue: [],
        Location: [],
        Date: []
    }

    fs.appendFileSync("log.txt", "\n\n" + concertObj.Command + "\n\n" + divider);

    let queryUrl = "https://rest.bandsintown.com/artists/" + fullName +
        "/events?app_id=codingbootcamp"

    axios.get(queryUrl).then(
        function (response) {

            for (let i = 0; i < response.data.length; i++) {
                concertObj.Venue.push("Venue: " + response.data[i].venue.name);
                if (response.data[i].venue.country === 'United States') {
                    concertObj.Location.push("Location: " + response.data[i].venue.city + ", "
                                                          + response.data[i].venue.region);
                } else {
                    concertObj.Location.push("Location: " + response.data[i].venue.city + ", "
                                                          + response.data[i].venue.country);
                }
                    concertObj.Date.push("Date: " + moment(response.data[i].datetime).format('L'));
            }

            console.log("\n" + divider);
            for (var k = 0; k < concertObj.Date.length; k++) {

                console.log(concertObj.Venue[k]);
                console.log(concertObj.Location[k]);
                console.log(concertObj.Date[k]);
                console.log(divider);

            }
            for (let k = 0; k < concertObj.Venue.length; k++) {
                fs.appendFile("log.txt", "\n" + concertObj.Venue[k] + "\n"
                                              + concertObj.Location[k] + "\n"
                                              + concertObj.Date[k] + "\n"
                                              + divider, 
                    function (err) {
                        if (err) {
                            console.log(err);
                        }
                })
            }
            console.log("Content Appended to log.txt");
        })
        .catch(function (err) {
            console.log(err);
    });
};

var spotF = function () {
    var spotObj = {
        Command: "Command: " + command + " " + fullName,
        Artist: [],
        TrackName: [],
        PreviewURL: [],
        Album: []
    }
    fs.appendFileSync("log.txt", "\n\n" + spotObj.Command + "\n\n" + divider);
    if (fullName === "") { 
        fullName = "The Sign Ace of Base";
        limit = 1 };

        spotify.search({ type: 'track', query: fullName, limit: limit })
            .then(function (response) {
                for (let j = 0; j < response.tracks.items.length; j++) {
                       spotObj.Artist.push("Artist: " + response.tracks.items[j].artists[0].name);
                       spotObj.TrackName.push("Track Name: " + response.tracks.items[j].name);
                    if (response.tracks.items[j].preview_url == null) {
                        spotObj.PreviewURL.push("Preview URL Not Available");
                    } else {
                        spotObj.PreviewURL.push("Preview URL: " + response.tracks.items[j].preview_url);
                    }
                        spotObj.Album.push("Album: " + response.tracks.items[j].album.name);
                }
                console.log("\n" + divider);
                for (let k = 0; k<spotObj.TrackName.length; k++) {
                    console.log(spotObj.Artist[k]);
                    console.log(spotObj.TrackName[k]);
                    console.log(spotObj.PreviewURL[k]);
                    console.log(spotObj.Album[k]);
                    console.log(divider);
                }

                for (let k = 0; k < spotObj.TrackName.length; k++) {
                    fs.appendFile("log.txt", "\n" + spotObj.Artist[k] + "\n" 
                                                  + spotObj.TrackName[k] + "\n" 
                                                  + spotObj.PreviewURL[k] + "\n" 
                                                  + spotObj.Album[k] + "\n"
                                                  + divider, function (err) {
                        if (err) {
                            console.log(err);
                        }
                    })
                }
                console.log("Content Appended to log.txt");
            })
            .catch(function (err) {
                console.log(err);
        });
    
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
