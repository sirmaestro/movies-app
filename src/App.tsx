import * as React from 'react';
import './App.css';

import logo from './logo.svg';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Grid } from '@material-ui/core';

interface IState {
  currentMovie: any,
  movies: any[],
  loading: boolean,
}

class App extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props)
    this.state = {
      currentMovie: null,
      movies: [],
      loading: true
    }

    this.fetchSavedMovies()
    this.selectNewMovie = this.selectNewMovie.bind(this)

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
            <div/>
          </Grid>
        </div>
        
        {this.state.loading ?  <CircularProgress /> : 
          <div>test</div>}
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
          movies: json,
          loading: false
        })
      })
      .then(json => console.log(json));
  }

	// Change selected movie
	private selectNewMovie(newMovie: any) {
		this.setState({
			currentMovie: newMovie
		})
  }
}

export default App;
