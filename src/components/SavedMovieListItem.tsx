import * as React from "react";
import { ListItem, Avatar, ListItemText } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

interface IProps {
    movie: any,
    handleSelectSavedMovie: any,
    handleDeleteMovie: any
}

export default class SavedMovieListItem extends React.Component<IProps, {}> {
    constructor(props: any) {
        super(props)

        this.handleSelectSavedMovie = this.handleSelectSavedMovie.bind(this)
        this.handleDeleteMovie = this.handleDeleteMovie.bind(this)
    }

	public render() {
		return (
			<ListItem className="movie-list-item" onClick={this.handleSelectSavedMovie}>
                <Avatar style={{ height : 60, width : 60}} src={this.props.movie.posterLink} />
                <ListItemText primary={this.props.movie.title} secondary={this.props.movie.year} />
                <DeleteIcon onClick={this.handleDeleteMovie}/>
            </ListItem>
		);
    }

    private handleSelectSavedMovie(){
        this.props.handleSelectSavedMovie(this.props.movie)
    }

    private handleDeleteMovie(){
        this.props.handleDeleteMovie(this.props.movie)
    }
}