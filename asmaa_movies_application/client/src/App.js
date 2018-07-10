import React, { Component } from 'react';
import './App.css';
import Movie from './Movie'
import $ from 'jquery'
import loupe from './loupe.png'

class App extends Component {
  
  constructor(props) {
    super(props)

    this.state = {}

    this.showLatestMovies()
  }

 /* componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };
*/
  showLatestMovies() {
    const LatestMoviesURL = "https://api.themoviedb.org/3/movie/now_playing?api_key=cc8440f48408a213fb4d3600d8e696f0"
    //"https://api.themoviedb.org/3/movie/latest?api_key=cc8440f48408a213fb4d3600d8e696f0"

    $.ajax({
      url: LatestMoviesURL,
      success: (LatestMoviesResults) => {
        console.log("movies fetched successfully")

        const LMoviesR = LatestMoviesResults.results

        var movieRows = []

        LMoviesR.forEach((movie) => {
       
          movie.poster = "https://image.tmdb.org/t/p/w185" + movie.poster_path
          const movieRow = <Movie key={movie.id} movie={movie} />
          movieRows.push(movieRow)

        })
        this.setState({ rows: movieRows })
      },
      error: (xhr, status, err) => {
        console.log("ERROR failed to fetch movies")
      }
    })
  }
  SearchMovies(searchedMovie) {
    const searchURL = "https://api.themoviedb.org/3/search/movie?api_key=cc8440f48408a213fb4d3600d8e696f0&query=" + searchedMovie

    $.ajax({
      url: searchURL,
      success: (searchResults) => {
        console.log("movies fetched successfully")
        const MovieResults = searchResults.results
        //console.log(MovieResults[0])

        var movieRows = []

        MovieResults.forEach((movie) => {
          movie.poster = "https://image.tmdb.org/t/p/w185" + movie.poster_path
          const movieRow = <Movie key={movie.id} movie={movie} />
          movieRows.push(movieRow)
        })
        this.setState({ rows: movieRows })
      },
      error: (xhr, status, err) => {
        console.log("ERROR failed to fetch movies")
      }
    })
  }

  FavoriteMovies(){

    fetch('/MyFavoriteMovies')
    .then(response => response.json())
    .then(response => {
      const MovieResults =  response.MyFavoriteMoviesList
      var movieRows = []

      MovieResults.forEach((movie) => {
        movie.poster = "https://image.tmdb.org/t/p/w185/" + movie.poster_path
        const movieRow = <Movie key={movie.id} movie={movie} />
        movieRows.push(movieRow)
      })
      this.setState({ rows: movieRows })
    })
    .catch(error => {
      console.log("the error: "+ error)
    })
    
  }
  latestMoviesHandler(event) {
    this.showLatestMovies()
  }

  FavoriteMoviesHandler(event){
    this.FavoriteMovies()
  }

  searchChangeHandler(event) {
    console.log(event.target.value)
    //const boundObject = this
   // const enteredWord = event.target.value
    // boundObject.SearchMovies(enteredWord)
    this.SearchMovies(event.target.value)

  }
  render() {
    return (
<div className="App">
<header style={{
  backgroundColor: '#000',
  color: '#fff',
  paddingBottom: 10,
  paddingTop: 10
}}>
  <h1 className="App-title">Asmaa Movies Application</h1>
</header>
<table>
  <tr>
    <td>
      <img className="loupe" width="20" src={loupe}/><input className="search" onChange={this.searchChangeHandler.bind(this)} placeholder="search a movie" />
    </td>
    <td> <input className="button" onClick={this.latestMoviesHandler.bind(this)} type="button" value="View Latest Movies" /> </td>
    <td> <input className="button" onClick={this.FavoriteMoviesHandler.bind(this)} type="button" value="My Favorite Movies" /> </td>
  </tr>
  <tr>
    <td>
      <br/>
    </td>
  </tr>
  <tbody>
  </tbody>
</table>
{this.state.rows}
</div>
    );
  }
}

export default App;
