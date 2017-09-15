import React, { Component } from 'react';
import './App.css';

import { getRandomMovies, getGenres } from './helpers/requests.js';

import FilterButtons from './FilterButtons.js';
import Movie from './movie.js';

class App extends Component {
  constructor(){
    super();

    this.state = {
      filterView: 'genres',
      genres: [],
      movies: [],
      dates: [],
      filterBy: '', 
      filterItem: ''
    }
    this.toggleFilter = this.toggleFilter.bind(this)
    this.filterStates = this.filterStates.bind(this)
  }
  componentDidMount(){

     Promise.all(getRandomMovies)
      .then((results) => {
        const movieList = [];

        results.forEach((pageRes) => {
          pageRes.data.results.forEach((movies) => {
            movieList.push(movies)
          })
        });
        this.setState({
          movies: movieList
        }, this.getFilters)
      });
    
  }
  getFilters(){
    const movies = this.state.movies;
    
    // FILTER BY DATE 
    let dates = movies.map((movie)=>{ return movie.release_date.substring(0,4) })
    dates = new Set(dates);
    const uniqueDates = Array.from(dates);
    uniqueDates.sort();

    this.setState({
      dates: Array.from(uniqueDates)
    });


    //FILTER BY GENRE 

    getGenres()
    .then((res)=>{
      this.setState({
        genres: res.data.genres
      })
    });


  }
  toggleFilter(e){
    let filterView = e.target.id;

    this.setState({
      filterView
    })
  }
  filterStates(filterBy, filterItem){
    this.setState({
      filterBy,
      filterItem
    });
  }
  filterMovies(){
    let d = new Date();
    let key = d.getTime();
    
    const movies = this.state.movies;
    const filterBy = this.state.filterBy;
    const filterItem = this.state.filterItem;

    switch(filterItem) {

      case 'DATES': 
        return;

      case 'GENRES':
        return;

      default:
        return (
        // eslint-disable-next-line
            movies.map((movie, index) => {
                return <Movie key={index + key} info={movie} />
            })
          );
       
    }

  }
  render() {
    return (
      <div className="App">
        <h1>MovieFilters</h1>
        <div className="filterButtons">
          <button onClick={this.toggleFilter} id="Dates">Dates</button>
          <button onClick={this.toggleFilter} id="Genres">Genres</button>
        </div>
        <div className="container">
          <h2>{this.state.filterView} Filter</h2>
          {
            this.state.filterView === 'Dates' ? 
              <FilterButtons filter={this.filterStates} comparison={'DATES'} filterData={this.state.dates} /> 
               : 
             <FilterButtons filter={this.filterStates} comparison={'GENRES'} filterData={this.state.genres} />
          }
          
          
          <div className="movies">
            {this.filterMovies()}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
