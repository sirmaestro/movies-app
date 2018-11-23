import * as React from "react";
import { List, TextField } from '@material-ui/core';
import MovieListItem from './MovieListItem';

interface IProps {
    movies: any[],
    selectNewMovie: any,
    searchMovie : any
}

interface IState {
    searchValue: any
}

export default class MovieList extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props)
        this.state = {
            searchValue: null
            }

        this.handleKeyPress = this.handleKeyPress.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

	public render() {
		return (
			<div className="container movie-list-wrapper">
                <div className="row meme-list-heading">
                    <div className="input-group">
                        <TextField
                            id="search-movie"
                            label="Search Movie"
                            type="search"
                            onKeyDown={this.handleKeyPress}
                            onChange={this.handleChange}
                            margin="normal"
                            variant="outlined"
                            />
                    </div>  
                </div>
                <div className="row meme-list-table">
                    <List>
                        {this.props.movies.map(movie => <MovieListItem key={movie.Title} movie={movie}/>)}
                    </List>
                </div>
            </div>
		);
    }

    private handleKeyPress(event : any) {
        if(event.key === 'Enter'){
            this.props.searchMovie(this.state.searchValue)
        }
    }

    private handleChange(event : any) {
        this.state = {
            searchValue : event.target.value
        }
    }
}