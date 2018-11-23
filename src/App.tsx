import * as React from 'react';
import './App.css';

import logo from './logo.svg';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Grid, Button } from '@material-ui/core';
import MovieList from './components/MovieList';
import AddIcon from '@material-ui/icons/Add';

interface IState {
  currentMovie: any,
  movies: any[],
  savedMovies: any[],
  loading: boolean,
}

class App extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props)
    this.state = {
      currentMovie: null,
      movies: [],
      savedMovies: [],
      loading: true
    }

    this.fetchSavedMovies()
    this.selectNewMovie = this.selectNewMovie.bind(this)
    this.fetchMovies = this.fetchMovies.bind(this)
    this.handleAddMovie = this.handleAddMovie.bind(this)
  }
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Movies App</h1>
        </header>
        
        <div>
          <Grid container={true} justify="center" alignItems="center" spacing={24}>
            <MovieList movies={this.state.movies} selectNewMovie={this.selectNewMovie} searchMovie={this.fetchMovies}/>
          </Grid>
        </div>
        
        {this.state.loading ?  <CircularProgress /> : 
          <div>test</div>}
        <Button variant="fab" color="primary" aria-label="Add" style={{position: 'absolute', bottom: 50, right: 50 } onclick={this.handleAddMovie}}>
          <AddIcon />
        </Button>
      </div>
    );
  }

  // GET movies
  private fetchSavedMovies() {
    let url = "http://msa2018moviesapi.azurewebsites.net/api/movie"
    fetch(url, {
      method: 'GET'
    })
      .then(res => res.json())
      .then(json => {
        let currentMovie = json[0]
        this.setState({
          currentMovie,
          savedMovies: json,
          loading: false
        })
        console.log(json)
      });
  }

  // GET movies
  private fetchMovies(searchTerm : any) {
    let url = "http://www.omdbapi.com/?apikey=147a6c7c&s=" + searchTerm.split(' ').join('+')
    console.log(url)
    fetch(url, {
      method: 'GET'
    })
      .then(res => res.json())
      .then(json => {
        let currentMovie = json[0]
        this.setState({
          currentMovie,
          movies: json.Search,
          loading: false
        })
        console.log(json.Search)
      });
  }
	// Change selected movie
	private selectNewMovie(newMovie: any) {
		this.setState({
			currentMovie: newMovie
		})
  }

  private handleAddMovie() {
    
  }
}

export default App;
