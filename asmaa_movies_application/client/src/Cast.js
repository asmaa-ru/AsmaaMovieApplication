import React from 'react'
import './App.css';

class Cast extends React.Component {

    render() {
        return (
                    <tr key={this.props.castName.id}>
                        <td colspan="3">
                            <img alt="Movie Poster" style={{borderRadius:"8px"}} width="80" src={this.props.castName.profile} />
                        </td>
                        <td style={{float:"left"}}>
                            <h4>{this.props.castName.name}</h4>
                            <p>As: {this.props.castName.character}</p>
                        </td>
                    </tr>
            );
    }
}
export default Cast