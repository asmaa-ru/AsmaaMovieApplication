import React from 'react'
import './App.css';

class SimilarMovie extends React.Component {

    render() {
        return (
                    <tr key={this.props.Smovie.id}>
                        <td colspan="3">
                            <img alt="Movie Poster" style={{borderRadius:"8px"}} width="80" src={this.props.Smovie.poster} />
                        </td>
                        <td>
                            <h4>{this.props.Smovie.title}</h4>
                            <p>{this.props.Smovie.overview}</p>
                        </td>
                    </tr>
            );
    }
}
export default SimilarMovie