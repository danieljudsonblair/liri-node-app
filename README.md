# liri-node-app

LIRI is a Language Interpretation and Recognition Interface.  More specifically, LIRI is a command line node.js app that takes in commands and user-defined parameters (arguments) and returns data via API requests.

Watch a demonstration [here!](https://www.youtube.com/watch?v=Xxd5pmUV1eA&feature=youtu.be&ab_channel=S1191669)

LIRI was built to return song, artist, and movie data.  It consists of 4 commands:

**concert-this:** returns upcoming concert data of an artist or band
**spotify-this-song:** returns artist, album, and a preview URL of a song
**movie-this:** returns information and ratings of a movie
**do-what-it-says:** returns “random” data from a linked .txt file

LIRI uses a number of npm packages:
-Axios
-Moment 
-DotEnv

and APIs:
-Node-Spotify-API
-OMDB API
-Bands In Town API

The result is a simple command-line tool that takes in a command and arguments, and returns information in the terminal console.  