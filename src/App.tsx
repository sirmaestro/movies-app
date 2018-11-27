import * as React from 'react';
import './App.css';

import { Grid, Button, AppBar, Toolbar, IconButton, Typography, Paper, List } from '@material-ui/core';
import Modal from 'react-responsive-modal';
import MovieList from './components/MovieList';
import AddIcon from '@material-ui/icons/Add';
import StarIcon from '@material-ui/icons/Grade';
import SavedMovieListItem from './components/SavedMovieListItem';

interface IState {
  currentMovie: any,
  movies: any[],
  savedMovies: any[],
  loading: boolean,
  open: boolean
}

class App extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props)
    this.state = {
      currentMovie: null,
      movies: [],
      savedMovies: [],
      loading: true,
      open: false
    }

    this.fetchSavedMovies()
    this.handleSelectMovie = this.handleSelectMovie.bind(this)
    this.fetchMovies = this.fetchMovies.bind(this)
    this.handleAddMovie = this.handleAddMovie.bind(this)
    this.handleSelectSavedMovie = this.handleSelectSavedMovie.bind(this)
  }
  
  public render() {
    return (
      <div className="App" style={{backgroundColor: "#fafafa"}}>
        <AppBar position="static">
          <Toolbar>
            <img src="/logo.png" alt="Watcholic Logo" width="100px" height="100px"/>
            <Typography variant="h4" color="inherit" style={{ flexGrow: 1 }}>
              Watcholic App
            </Typography>
            <IconButton color="inherit" onClick={this.onOpenModal}>
              <StarIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <div>
          <Grid container={true} justify="center" alignItems="center" style={{ padding: 20, margin: -16 }}>
            <MovieList movies={this.state.movies} handleSelectMovie={this.handleSelectMovie} searchMovie={this.fetchMovies} currentMovie={this.state.currentMovie} />
          </Grid>
        </div>

        <Button variant="fab" color="secondary" aria-label="Add" style={{ position: 'fixed', bottom: 50, right: 50, left: 'auto', top: 'auto' }} onClick={this.handleAddMovie}>
          <AddIcon />
        </Button>

        <Modal open={this.state.open} onClose={this.onCloseModal}>
          <Paper style={{ top: "50%", right: "auto", bottom: "auto", left: "50%" }}>
            <Typography variant="h6" color="inherit" style={{ alignContent: "center" }}>
              Favourite Movies
            </Typography>
            <List>
              {this.state.savedMovies.map(movie => <SavedMovieListItem key={movie.Title} movie={movie} handleSelectSavedMovie={this.handleSelectSavedMovie} handleDeleteMovie={this.handleDeleteMovie} />)}
            </List>
          </Paper>
        </Modal>
      </div>
    );
  }

  // Modal open
  private onOpenModal = () => {
    this.setState({ open: true });
  };

  // Modal close
  private onCloseModal = () => {
    this.setState({ open: false });
  };

  // Change selected movie
  private handleSelectMovie(movie: any) {
    this.setState({
      currentMovie: movie
    })
  }

  // GET movies
  private fetchSavedMovies() {
    let url = "https://" + "msa2018moviesapi.azurewebsites.net/api/movie"

    fetch(url, {
      method: 'GET'
    })
      .then(res => res.json())
      .then(json => {
        this.setState({
          savedMovies: json,
          loading: false
        })
        console.log(json)
      });
  }

  // GET movies
  private fetchMovies(searchTerm: any) {
    let url = "https://" + "www.omdbapi.com/?apikey=147a6c7c&type=movie&s=" + searchTerm.split(' ').join('+')
    
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
      });
  }

  // Delete movie
  private handleDeleteMovie(movie: any) {
    let url = "https://" + "msa2018moviesapi.azurewebsites.net/api/movie/" + movie.id

    fetch(url, {
      method: 'DELETE'
    })
      .then((response: any) => {
        if (!response.ok) {
          // Error State
          alert(response.statusText)
        } else {
          location.reload()
        }
      })
  }

  // Change selected movie
  private handleSelectSavedMovie(movie: any) {
    let url = "https://" + "msa2018moviesapi.azurewebsites.net/api/movie/" + movie.id
    if (this.state.currentMovie === null) {
      return
    }
    console.log(this.state.currentMovie)

    const data = {
      id: movie.id,
      title: this.state.currentMovie.Title,
      year: this.state.currentMovie.Year,
      genre: "",
      posterLink: this.state.currentMovie.Poster,
      dateCreated: ""
    }

    fetch(url, {
      body: JSON.stringify(data),
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      method: 'PUT'
    })
      .then((response: any) => {
        if (!response.ok) {
          // Error State
          alert(response.statusText)
        } else {
          location.reload()
        }
      })
  }

  private handleAddMovie() {
    let url = "https://msa2018moviesapi.azurewebsites.net/api/movie"
    if (this.state.currentMovie === null) {
      return
    }
    console.log(this.state.currentMovie)

    const data = {
      title: this.state.currentMovie.Title,
      year: this.state.currentMovie.Year,
      genre: "",
      posterLink: this.state.currentMovie.Poster,
      dateCreated: ""
    }

    fetch(url, {
      body: JSON.stringify(data),
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      method: 'POST'
    })
      .then((response: any) => {
        if (!response.ok) {
          // Error State
          alert(response.statusText)
        } else {
          location.reload()
        }
      })
  }
}

export default App;
