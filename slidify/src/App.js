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
<<<<<<< HEAD
      currentDevice: ""
=======
      search: "",
      currentDevice: "",
      seed_artists: [],
      seed_genres: [],
      seed_tracks: []
>>>>>>> da4244c6d2210b1b0d04871e1db3a575e8204f80
    };

    this.search = this.search.bind(this);
<<<<<<< HEAD
    this.filter = this.filter.bind(this);

=======
    this.startPlayback = this.startPlayback.bind(this);
>>>>>>> da4244c6d2210b1b0d04871e1db3a575e8204f80
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
        devices,
        currentDevice: devices[0].id
      });
    }
  }

  async startPlayback(songId) {
    try {
      await this.spotifyClient.play({
        device_id: this.state.currentDevice,
        uris: [`spotify:track:${songId}`]
      });
    } catch (err) {
      console.log("This is the error: " + err);
    }
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
    var remove = new Array;
    var new_songs = this.state.songs;
    for (i = 0; i < new_songs.length; i++) {
        const features = await this.spotifyClient.getAudioFeaturesForTrack(new_songs[i].id);
        if ((selected.Danceability && (features.danceability > selected.Danceability)) ||
            (selected.Duration && (features.duration_ms > selected.Duration)) ||
            (selected.Energy && (features.energy > selected.Energy)) ||
            (selected.Loudness && (features.loudness > selected.Loudness)) ||
            (selected.Speechiness && (features.speechiness > selected.Speechiness)) ||
            (selected.Tempo && (features.tempo > selected.Tempo)) ||
            (selected.Valence && (features.valence > selected.Valence))) {
                  remove.push(new_songs[i]);
            }

    }
    for (var j = new_songs.length - 1; j >= 0; j--) {
      if (remove.includes(new_songs[j])) {
        new_songs.splice(j,1);
      }
    }

    this.setState({songs: new_songs});
  }


  // add_filter(name, value) {
  //   this.setState( prevState => ({ select_features :
  //       {...prevState.select_features, [name]: value}
  //     }))
  // }



  render() {
    if (!this.state.authenticated) {
      return (
        <div className="login-container">
        <img className="icon" src={require("./images/icon.png")}/>
        <p className="welcome">Welcome to Slidify! </p>
        <a className="login"
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
        <LeftContainer filter={this.filter}/>
        <RightContainer
          songs={this.state.songs}
          search={this.search}
          startPlayback={this.startPlayback}
        />
        <PlaybackBar />
      </div>
    );
  }
}

export default App;
