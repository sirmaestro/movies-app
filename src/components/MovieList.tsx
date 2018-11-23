import * as React from "react";
import { List, TextField } from '@material-ui/core';
import MovieListItem from './MovieListItem';
import MediaStreamRecorder from 'msr';

interface IProps {
    currentMovie: any,
    movies: any[],
    handleSelectMovie: any,
    searchMovie: any
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
        this.handleSelectMovie = this.handleSelectMovie.bind(this)
        this.postAudio = this.postAudio.bind(this);
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
                        <div onClick={this.searchByVoice}><i className="fa fa-microphone" /></div>
                    </div>
                </div>
                <div className="row meme-list-table">
                    <List>
                        {this.props.movies.map(movie => <MovieListItem key={movie.Title} movie={movie} handleSelectMovie={this.handleSelectMovie} currentMovie={this.props.currentMovie} />)}
                    </List>
                </div>
            </div>
        );
    }

    private handleKeyPress(event: any) {
        if (event.key === 'Enter' && this.state.searchValue !== null) {
            this.props.searchMovie(this.state.searchValue)
        }
    }

    private handleChange(event: any) {
        this.state = {
            searchValue: event.target.value
        }
    }

    private handleSelectMovie(movie: any) {
        this.props.handleSelectMovie(movie)
    }

    private searchByVoice() {
        const mediaConstraints = {
            audio: true
        }
        const onMediaSuccess = (stream: any) => {
            const mediaRecorder = new MediaStreamRecorder(stream);
            mediaRecorder.mimeType = 'audio/wav'; // check this line for audio/wav
            mediaRecorder.ondataavailable = (blob: any) => {
                this.postAudio(blob);
                mediaRecorder.stop()
            }
            mediaRecorder.start(3000);
        }

        navigator.getUserMedia(mediaConstraints, onMediaSuccess, onMediaError)

        function onMediaError(e: any) {
            console.error('media error', e);
        }

    }

    private postAudio(blob: any) {
        let accessToken: any;
        fetch('https://westus.api.cognitive.microsoft.com/sts/v1.0/issueToken', {
            headers: {
                'Content-Length': '0',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Ocp-Apim-Subscription-Key': 'd540f77acd43487ea1cda63823d67cc9'
            },
            method: 'POST'
        }).then((response) => {
            // console.log(response.text())
            return response.text()
        }).then((response) => {
            console.log(response)
            accessToken = response
        }).catch((error) => {
            console.log("Error", error)
        });

        fetch('https://westus.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=en-US', {
            body: blob, // this is a .wav audio file    
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer' + accessToken,
                'Content-Type': 'audio/wav;codec=audio/pcm; samplerate=16000',
                'Ocp-Apim-Subscription-Key': 'd540f77acd43487ea1cda63823d67cc9'
            },
            method: 'POST'
        }).then((res) => {
            return res.json()
        }).then((res: any) => {
            console.log(res)
            const textBox = document.getElementById("search-input") as HTMLInputElement
            textBox.value = (res.DisplayText as string).slice(0, -1)
        }).catch((error) => {
            console.log("Error", error)
        });

    }
}