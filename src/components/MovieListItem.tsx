import * as React from "react";
import { ListItem, Avatar, ListItemText } from '@material-ui/core';

interface IProps {
    currentMovie: any,
    movie: any,
    handleSelectMovie: any
}

export default class MovieListItem extends React.Component<IProps, {}> {
    constructor(props: any) {
        super(props)

        this.handleSelectMovie = this.handleSelectMovie.bind(this)
    }

	public render() {
		return (
			<ListItem className="movie-list-item" onClick={this.handleSelectMovie} selected={this.props.currentMovie == null ? false : this.props.currentMovie.Title === this.props.movie.Title}>
                <Avatar style={{ height : 60, width : 60}} src={this.props.movie.Poster} />
                <ListItemText primary={this.props.movie.Title} secondary={this.props.movie.Year} />
            </ListItem>
		);
    }

    private handleSelectMovie(){
        this.props.handleSelectMovie(this.props.movie)
    }
}