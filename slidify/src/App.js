import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Spotify from "spotify-web-api-js";
import ReactDOM from "react-dom";


import RightContainer from "./components/RightContainer.jsx";
import LeftContainer from "./components/LeftContainer.jsx";
import PlaybackBar from './components/PlaybackBar.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      devices: [],
      songs: [],
      currentDevice: "",
      seed_artists: [],
      seed_genres: [],
      seed_tracks: []
    };
    this.search = this.search.bind(this);
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
        // currentDevice: devices[0].id
      });
    }
  }

  async startPlayback(songId) {
    await this.spotifyClient.play({
      device_id: this.state.currentDevice,
      uris: [`spotify:track:${songId}`]
    });
  }

  async search(keyword) {
    const {
      tracks: { items: songs }
    } = await this.spotifyClient.searchTracks(keyword, {
      market: "us"
    });
    this.setState({ songs });
  }


  render() {
    if (!this.state.authenticated) {
      return (
        <a
          href={`https://accounts.spotify.com/authorize/?client_id=86df5736814c48ffaa72a7c2629076d9&response_type=token&redirect_uri=${window
            .location.origin +
            window.location
              .pathname}&scope=user-read-playback-state user-modify-playback-state user-top-read user-read-private`}
        >
          Login with Spotify
        </a>
      );
    }
    return (
      <div className="ui container">
      <LeftContainer />
      <RightContainer songs={this.state.songs} search={this.search} onChange={this.onChange}/>
      <PlaybackBar />
      </div>
    );
  }
}



export default App;
