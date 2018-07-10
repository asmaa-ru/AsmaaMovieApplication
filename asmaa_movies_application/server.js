var fs = require('fs');
var data = fs.readFileSync('MyFavoriteMovies.json');
var MyFavoriteMovies = JSON.parse(data);

const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

app.get("/MyFavoriteMovies", (request, response) => {
    // var movie1 = {title: "new movie", overview: "new description"}
    // var movie2 = {title: "movie name", overview: "description"}
    // response.json([movie1,movie2])
    response.send(MyFavoriteMovies);
});

app.get("/addToFavorites/:id/:title/:overview/:poster", (request, response) => {

   var movie = {
        id: Number(request.params.id),
        title: request.params.title,
        overview: request.params.overview,
        poster_path: request.params.poster
    }

    MyFavoriteMovies["MyFavoriteMoviesList"].push(movie);

    //MyFavoriteMovies[word] = score;

    var Textdata = JSON.stringify(MyFavoriteMovies, null, 2);
    fs.writeFile('MyFavoriteMovies.json', Textdata, MovieAdded);
    //fs.writeFile('words.json', Textdata, MovieAdded);
    function MovieAdded(err) {
        console.log("the movie is added successfully");
    }
    response.send(MyFavoriteMovies);
});

app.get("/RemoveFromFavorites/:id", (request, response) => {
    var movieID = Number(request.params.id);
    var movies = MyFavoriteMovies["MyFavoriteMoviesList"];

    MyFavoriteMovies.MyFavoriteMoviesList = movies.filter((movie) => {
        return movie.id !== movieID
    });

    var Textdata = JSON.stringify(MyFavoriteMovies, null, 2);

    fs.writeFile('MyFavoriteMovies.json', Textdata, MovieRemoved);

    function MovieRemoved(err) {
        console.log("movie was removed successfully");
    }
    response.send(MyFavoriteMovies);
});



app.listen(port, () => console.log(`Server is Listening on port ${port}`))