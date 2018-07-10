import React from 'react'
import './App.css';
import $ from 'jquery'

class Cast extends React.Component {

    constructor(props) {
        super(props)

        this.state = { details: <p></p>, detailsOpen: false, castMovies: <p></p>, castMoviesOpen:false }

    }

    moreDetailsHandler(event) {
        this.moreDetails();
    }

    moreDetails() {

        if (this.state.detailsOpen === true) {
            this.setState({ detailsOpen: false, details: <p></p>, castMovies: <p></p>, castMoviesOpen:false })
        }
        else {
            this.setState({ detailsOpen: true})

            const DetailsURL = "https://api.themoviedb.org/3/person/" + this.props.castName.id + "?api_key=cc8440f48408a213fb4d3600d8e696f0"

            $.ajax({
                url: DetailsURL,
                success: (DetailsResult) => {

                    var Rows = []
                    Rows.push(<p>Birthday: {DetailsResult.birthday}</p>)
                    Rows.push(<p>Place of birth: {DetailsResult.place_of_birth}</p>)
                    Rows.push(<p>Biography: {DetailsResult.biography}</p>)
                    Rows.push(<input style={{ fontSize: "12px", marginTop: 0 }} onClick={this.moreMoviesHandler.bind(this)} type="button" value="Movies" className="button" />)
                    this.setState({ details: Rows })
                },
                error: (xhr, status, err) => {
                    console.log("ERROR failed to fetch star details")
                }
            })
        }
    }

    moreMoviesHandler(event){
        this.moreMovies();
    }

    moreMovies(){
        
        if (this.state.castMoviesOpen === true) {
            this.setState({ castMoviesOpen: false, castMovies: <p></p> })
        }
        else {
            this.setState({ castMoviesOpen: true})

            const moreMoviesURL = "https://api.themoviedb.org/3/person/" + this.props.castName.id + "/movie_credits?api_key=cc8440f48408a213fb4d3600d8e696f0"

            $.ajax({
                url: moreMoviesURL,
                success: (moviesResult) => {
                    const moreMovies = moviesResult.cast

                    var Rows = []
                    moreMovies.forEach((m) =>{
                        Rows.push(<figure style={{float:"left"}}><img width="80" src={"https://image.tmdb.org/t/p/w185"+m.poster_path}/> <figcaption>As: {m.character} </figcaption></figure>)
                    })
                    this.setState({ castMovies: Rows })
                },
                error: (xhr, status, err) => {
                    console.log("ERROR failed to fetch cast movies")
                }
            })
        }
    }

    render() {
        return (
            <tr key={this.props.castName.id}>
                <td colspan="3">
                    <img alt="Movie Poster" style={{ borderRadius: "8px" }} width="120" src={this.props.castName.profile} />
                </td>
                <td style={{ float: "left" }}>
                    <h4>{this.props.castName.name}</h4>
                    <p>As: {this.props.castName.character}</p>
                    <input style={{ fontSize: "12px", marginTop: 0 }} onClick={this.moreDetailsHandler.bind(this)} type="button" value="More Details" className="button" />
                    {this.state.details} </td>
                    <td style={{display:"table"}}>{this.state.castMovies}</td>
            </tr>
        );
    }
}
export default Cast