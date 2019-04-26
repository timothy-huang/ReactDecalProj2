import React from "react";

import SongCard from "./SongCard";
import SearchBar from "./SearchBar";

import "../styles/RightContainer.css";

class RightContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      songs: []
    };
  }

  render() {
    return (
      <div className="container">
        <div className="row-container">
          <div className="title">Slidify</div>
          <SearchBar />
        </div>
        <div className="song-container">
          <SongCard number="1" title="Midsummer Madness - 88rising" />
          <SongCard number="2" title="New Light - John Mayer" />
          <SongCard number="3" title="Palace - Sam Smith" />
          <SongCard number="4" title="Head in the Cloud - 88rising" />
          <SongCard number="5" title="Gravity - John Mayer" />
          <SongCard number="6" title="New Light - John Mayer" />
        </div>
      </div>
    );
  }
}

export default RightContainer;
