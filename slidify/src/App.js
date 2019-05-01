import React, { Component } from "react";

import RightContainer from "./components/RightContainer.jsx";
import LeftContainer from "./components/LeftContainer.jsx";
import PlaybackBar from "./components/PlaybackBar.jsx";

import Spotify from "spotify-web-api-js";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: false,
      devices: [],
      songs: [],
      search: "",
      currentDevice: ""
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  render() {
    return (
      <div>
        <LeftContainer />
        <RightContainer />
        <PlaybackBar />
      </div>
    );
  }
}

export default App;
