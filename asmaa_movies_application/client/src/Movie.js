import React from 'react'
import $ from 'jquery'
import Liked from './stared.png'
import Like from './star.png'
import './App.css';
import SimilarMovie from './SimilarMovie'
import Cast from './Cast'

class Movie extends React.Component {
    state = { heart: Like, similarOpen: false, castOpen: false, similars:<p></p>, cast:<p></p>, posters:<p></p>, postersOpen: false}

    constructor(props) {
        super(props)

        fetch('/MyFavoriteMovies')
            .then(response => response.json())
            .then(response => {
                const MovieResults = response.MyFavoriteMoviesList

                MovieResults.forEach((movie) => {
                    if (movie.id === this.props.movie.id)
                        this.setState({ heart: Liked })
                })
            })
            .catch(error => {
                console.log("the error: " + error)
            })


        // Movie Genres

        const moreDetailsURL = "https://api.themoviedb.org/3/movie/" + this.props.movie.id + "?api_key=cc8440f48408a213fb4d3600d8e696f0"

        var mGenres = []
        $.ajax({
            url: moreDetailsURL,
            success: (movieDetailsResult) => {
                console.log("genres fetched successfully")

                const Mgenres = movieDetailsResult.genres


                Mgenres.forEach((genre) => {
                    mGenres.push(genre.name + ", ")
                })

                this.setState({ genres: mGenres })
            },
            error: (xhr, status, err) => {
                console.log("ERROR failed to fetch genres")
            }
        })
    }

    AddToFavoriteMoviesHandler(event) {
        this.AddToFavoriteMovies(this.props.movie.id, this.props.movie.title, this.props.movie.overview, this.props.movie.poster_path)
    }

    AddToFavoriteMovies(id, name, descr, poster) {

        if (this.state.heart === Like) {

            fetch('/addToFavorites/' + id + '/' + name + '/' + descr + '/' + poster);

            this.setState({ heart: Liked });
        }
        else if (this.state.heart === Liked) {
            fetch('/RemoveFromFavorites/' + id);
            this.setState({ heart: Like })
        }

    }

    showSimilarMoviesHandler(event) {
        this.showSimilarMovies();
    }

    showSimilarMovies() {

        if (this.state.similarOpen === true) {
            this.setState({ similarOpen: false, similars: <p></p> })
        }
        else {
            this.setState({ similarOpen: true, castOpen: false, cast: <p></p>, posters: <p></p>, postersOpen: false })

            const SimilarMoviesURL = "https://api.themoviedb.org/3/movie/" + this.props.movie.id + "/similar?api_key=cc8440f48408a213fb4d3600d8e696f0"

            var SimilarMoviesRows = []
            $.ajax({
                url: SimilarMoviesURL,
                success: (SimilarMoviesResult) => {

                    const SimilarMovies = SimilarMoviesResult.results

                    SimilarMovies.forEach((Smovie) => {

                        Smovie.poster = "https://image.tmdb.org/t/p/w185" + Smovie.poster_path

                        const SimilarMovieRow = <SimilarMovie key={Smovie.id} Smovie={Smovie} />
                        SimilarMoviesRows.push(SimilarMovieRow)
                    })

                    this.setState({ similars: SimilarMoviesRows })
                },
                error: (xhr, status, err) => {
                    console.log("ERROR failed to fetch movies")
                }
            })
        }
    }

    showCastHandler(event){
        this.showCast();
    }

    showCast(){
        if (this.state.castOpen === true) {
            this.setState({castOpen: false, cast: <p></p>})
        }
        else {
            this.setState({ castOpen: true, similarOpen: false, similars: <p></p>, posters: <p></p>, postersOpen: false })

            const castURL = "https://api.themoviedb.org/3/movie/" + this.props.movie.id + "/credits?api_key=cc8440f48408a213fb4d3600d8e696f0"

            var castRows = []
            $.ajax({
                url: castURL,
                success: (castResult) => {
                    const castNames = castResult.cast

                    castNames.forEach((castName) => {

                        castName.profile = "https://image.tmdb.org/t/p/w185" + castName.profile_path

                        const castRow = <Cast key={castName.id} castName={castName} />
                        castRows.push(castRow)
                    })

                    this.setState({ cast: castRows })
                },
                error: (xhr, status, err) => {
                    console.log("ERROR failed to fetch cast")
                }
            })
        }
    }

    showPostersHandler(){
       this.showPosters();
    }

    showPosters(){
        if (this.state.postersOpen === true) {
            this.setState({postersOpen: false, posters: <p></p>})
        }
        else {
            this.setState({ postersOpen: true, castOpen: false, similarOpen: false, similars: <p></p>, posters: <p></p> })

            const postersURL = "https://api.themoviedb.org/3/movie/" + this.props.movie.id + "/images?api_key=cc8440f48408a213fb4d3600d8e696f0"

            var postersRows = []
            $.ajax({
                url: postersURL,
                success: (postersResult) => {
                    const postersPaths = postersResult.backdrops

                    postersPaths.forEach((poster) => {

                        poster.image = "https://image.tmdb.org/t/p/w185" + poster.file_path

                        const posterRow =  <img width="110" src={poster.image} />
                        postersRows.push(posterRow)
                    })

                    this.setState({ posters: postersRows })
                },
                error: (xhr, status, err) => {
                    console.log("ERROR failed to fetch cast")
                }
            })
        }
    }

    render() {
        return (
            <table key={this.props.movie.id}>
                <tbody  style={{display:"inline-block"}} >
                    <tr>
                        <td colspan="3">
                            <img alt="Movie Poster" style={{ borderRadius: "8px" }} width="130" src={this.props.movie.poster} />
                        </td>
                        <td>
                            <h3>{this.props.movie.title}</h3>
                            <p>{this.props.movie.overview}</p>
                            <p> {this.state.genres}
                            </p>
                        </td>

                        <td colspan="3">
                            <button onClick={this.AddToFavoriteMoviesHandler.bind(this)} className="button" style={{ backgroundColor: "#fff", padding: 0, outline: "none" }}> <img width="50" style={{ margin: 0, padding: 0 }} src={this.state.heart} /> </button>
                        </td>
                    </tr>
                    <tr><td><input style={{ fontSize: "12px", marginTop: 0 }} onClick={this.showSimilarMoviesHandler.bind(this)} type="button" value="Similar Movies" className="button" />
                    </td><td>
                    <input style={{ fontSize: "12px", marginTop: 0 }} onClick={this.showCastHandler.bind(this)} type="button" value="Cast" className="button" />
                    </td>
                    <td>
                    <input style={{ fontSize: "12px", marginTop: 0 }} onClick={this.showPostersHandler.bind(this)} type="button" value="Posters" className="button" />
                    </td></tr>
                    {this.state.cast}{this.state.similars}
                    {this.state.posters}
 <tr><br /></tr>
                </tbody>
            </table>);
    }
}

export default Movie