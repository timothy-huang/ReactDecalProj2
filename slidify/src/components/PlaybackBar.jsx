import React, { Component } from "react";
import Slider from "@material-ui/lab/Slider";
import {
  PlayCircleOutline,
  PauseCircleOutline,
  SkipPrevious,
  SkipNext,
  VolumeUp
} from "@material-ui/icons";
import "../styles/PlaybackBar.css";

class PlaybackBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      volume: 0,
      progress_ms: 0, // Need this to update in real time.
      total_ms: 1 // Want to grab the song's length in total milliseconds from the API.
    };

    // this.togglePlay = this.togglePlay.bind(this);
  }

  componentDidMount() {
    this.setState({
      progress_ms: this.props.checkProgress()
    });
  }

  handleChange = name => (e, value) => {
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <div className="bar-container">
        <div className="playback-container">
          <div className="button-container">
            <SkipPrevious style={{ fontSize: 32, color: "#2E3B84" }} />
            {this.props.isPlaying ? (
              <PauseCircleOutline
                style={{
                  fontSize: 48,
                  color: "#2E3B84",
                  marginLeft: 16,
                  marginRight: 16
                }}
                onClick={() => {
                  this.props.pausePlayback();
                }}
              />
            ) : (
              <PlayCircleOutline
                style={{
                  fontSize: 48,
                  color: "#2E3B84",
                  marginLeft: 16,
                  marginRight: 16
                }}
                onClick={() => {
                  this.props.resumePlayback();
                }}
              />
            )}
            <SkipNext style={{ fontSize: 32, color: "#2E3B84" }} />
          </div>{" "}
          <div className="progress-bar">
            <Slider
              min={0}
              max={this.props.duration}
              value={this.state.progress_ms}
              onChange={this.handleChange("progress_ms")}
            />
          </div>
        </div>
        <div className="volume-bar-container">
          <VolumeUp style={{ color: "#2E3B84", marginRight: 16 }} />
          <Slider
            min={0}
            max={100}
            value={this.state.volume}
            onChange={this.handleChange("volume")}
            style={{ color: "#f2f2f2" }}
          />
        </div>
      </div>
    );
  }
}

export default PlaybackBar;
