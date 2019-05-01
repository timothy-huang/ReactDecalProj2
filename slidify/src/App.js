import React, { Component } from "react";
import "./App.css";
import Spotify from "spotify-web-api-js";
import ReactDOM from "react-dom";
import RightContainer from "./components/RightContainer.jsx";
import LeftContainer from "./components/LeftContainer.jsx";
import PlaybackBar from "./components/PlaybackBar.jsx";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      devices: [],
      songs: [],
      search: "",
      currentDevice: "",
      isPlaying: false,
      currentlyPlaying: "",
      duration: 0
    };

    this.search = this.search.bind(this);
    this.filter = this.filter.bind(this);
    this.startPlayback = this.startPlayback.bind(this);
    this.setCurrentlyPlaying = this.setCurrentlyPlaying.bind(this);
    this.resumePlayback = this.resumePlayback.bind(this);
    this.pausePlayback = this.pausePlayback.bind(this);
    this.checkProgress = this.checkProgress.bind(this);
  }

  async componentDidMount() {
    if (window.location.hash) {
      // Remove the "#"
      const queryString = window.location.hash.substring(1);
      // Parse the access_token out
      const accessToken = new URLSearchParams(queryString).get("access_token");
      this.spotifyClient = new Spotify();
      this.spotifyClient.setAccessToken(accessToken);

      const { devices } = await this.spotifyClient.getMyDevices();
      // const devices = Object.keys(devicesResp).map(key => devicesResp[key]);

      this.setState({
        authenticated: true,
        devices
        // currentDevice: devices[0].id
      });
    }
    let playbackState = await this.spotifyClient.getMyCurrentPlaybackState();
    let songDuration = playbackState.duration_ms;
    this.setState({
      duration: songDuration
    });
  }

  async startPlayback(songId) {
    try {
      await this.spotifyClient.play({
        device_id: this.state.currentDevice,
        uris: [`spotify:track:${songId}`]
      });
      this.setState({
        isPlaying: true
      });
    } catch (err) {
      console.log("This is the error: " + err);
    }
  }

  async resumePlayback() {
    await this.spotifyClient.play({
      device_id: this.state.currentDevice
    });

    this.setState({
      isPlaying: true
    });
  }

  async pausePlayback() {
    await this.spotifyClient.pause({
      device_id: this.state.currentDevice
    });

    this.setState({
      isPlaying: false
    });
  }

  async search(keyword) {
    const {
      tracks: { items: songs }
    } = await this.spotifyClient.searchTracks(keyword, {
      market: "us",
      limit: 40
    });
    this.setState({ songs });
  }

  async filter(selected) {
    var i;
    var remove = new Array();
    var ids = new Array();
    var new_songs = this.state.songs;
    for (i = 0; i < new_songs.length; i++) {
      ids[i] = new_songs[i].id;
    }
    // An array of features
    const response = await this.spotifyClient.getAudioFeaturesForTracks(ids);
    const features = response.audio_features;
    for (i = 0; i < features.length; i++) {
      if (
        (selected.Danceability &&
          features[i].danceability > selected.Danceability) ||
        (selected.Duration && features[i].duration_ms > selected.Duration) ||
        (selected.Energy && features[i].energy > selected.Energy) ||
        (selected.Loudness && features[i].loudness > selected.Loudness) ||
        (selected.Speechiness &&
          features[i].speechiness > selected.Speechiness) ||
        (selected.Tempo && features[i].tempo > selected.Tempo) ||
        (selected.Valence && features[i].valence > selected.Valence)
      ) {
        remove.push(new_songs[i]);
      }
    }
    for (var j = new_songs.length - 1; j >= 0; j--) {
      if (remove.includes(new_songs[j])) {
        new_songs.splice(j, 1);
      }
    }

    this.setState({ songs: new_songs });
  }

  async setCurrentlyPlaying(song) {
    this.setState({
      currentlyPlaying: song
    });
  }

  async checkProgress() {
    let playbackState = await this.spotifyClient.getMyCurrentPlaybackState();
    let currentProgress = playbackState.progress_ms;
    return currentProgress;
  }

  render() {
    if (!this.state.authenticated) {
      return (
        <div className="login-container">
          <img className="icon" src={require("./images/icon.png")} />
          <p className="welcome">Welcome to Slidify! </p>
          <a
            className="login"
            href={`https://accounts.spotify.com/authorize/?client_id=86df5736814c48ffaa72a7c2629076d9&response_type=token&redirect_uri=${window
              .location.origin +
              window.location
                .pathname}&scope=user-read-playback-state user-modify-playback-state user-top-read user-read-private`}
          >
            Login with Spotify
          </a>
        </div>
      );
    }
    return (
      <div>
        <LeftContainer filter={this.filter} />
        <RightContainer
          songs={this.state.songs}
          search={this.search}
          startPlayback={this.startPlayback}
          setCurrentlyPlaying={this.setCurrentlyPlaying}
          currentlyPlaying={this.state.currentlyPlaying}
        />
        <PlaybackBar
          isPlaying={this.state.isPlaying}
          resumePlayback={this.resumePlayback}
          pausePlayback={this.pausePlayback}
          checkProgress={this.checkProgress}
          duration={this.state.duration}
        />
      </div>
    );
  }
}

export default App;
