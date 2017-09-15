import React, { Component } from 'react';
import './movie.css';

class Movie extends Component {
	render(){
		const { backdrop_path : img, title, vote_average } = this.props.info;
		return(
				<li>
					<img src={`http://image.tmdb.org/t/p/w500/${img}`} alt=""/>
					<div className="overlay">
						<h2>{title}</h2>
						<p>{vote_average}</p>
					</div>
				</li>

			)
	}
}

export default Movie;