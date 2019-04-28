import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/lab/Slider';
import "../styles/PlaybackBar.css";

class PlaybackBar extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isPlaying: false,
        volume: 0,
        progress_ms: 0, // Need this to update in real time.
        total_ms: 1 // Want to grab the song's length in total milliseconds from the API.
      };
    }

    handleChange = name => (e, value) => {
        this.setState({
          [name]: value
        });
    };

    
    render() {
    
        return (
            <div className="bar">
                <div className="button-container">
                    <Button variant="contained"> Back </Button>
                    <Button variant="contained" onClick={this.handleChange("isPlaying", true)}> Play </Button>
                    <Button variant="contained"> Next </Button>
                </div>
                <div className="volume-bar">
                <div className="volume"> Volume </div>
                <Slider
                    min={0}
                    max={1}
                    value={this.state.volume}
                    onChange={this.handleChange("volume")}
                />
                </div>
                <div className="progress-bar">
                <Slider
                    min={0}
                    max={this.state.total_ms}
                    value={this.state.progress_ms}
                /> 
                </div>
            </div>
            );
        }
    }

    export default PlaybackBar;
  