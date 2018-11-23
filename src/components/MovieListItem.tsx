import * as React from "react";
import { ListItem, Avatar, ListItemText } from '@material-ui/core';

interface IProps {
    movie: any
}

export default class MovieListItem extends React.Component<IProps, {}> {
    constructor(props: any) {
        super(props)
    }

	public render() {
		return (
			<ListItem>
                <Avatar style={{ height : 60, width : 60}} src={this.props.movie.Poster} />
                <ListItemText primary={this.props.movie.Title} secondary={this.props.movie.Year} />
            </ListItem>
		);
    }
}