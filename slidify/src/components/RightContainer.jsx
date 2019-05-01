import React from "react";

import SongCard from "./SongCard";
import SearchBar from "./SearchBar";

import "../styles/RightContainer.css";
import styles from "../styles/SongCard.css";

class RightContainer extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);

    this.state = {
      keyword: "",
      songs: props.songs
    };
  }

  onSubmit(props) {
    const { search } = this.props;
    const { keyword } = this.state;
    if (keyword !== "") {
      search(keyword);
      this.setState({ keyword: "" });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.songs !== this.state.songs) {
      this.setState({ songs: nextProps.songs });
    }
  }

  handleKeyPress(ev, props) {
    if (ev.key === "Enter") {
      this.onSubmit(props);
    }
  }

  render() {
    const { keyword } = this.state;
    const { startPlayback } = this.props;

    return (
      <div className="container">
        <div className="row-container">
          <div className="title">Slidify</div>

          <form className="search-form">
            <input
              type="text"
              placeholder="Search"
              value={keyword}
              onChange={e => this.setState({ keyword: e.target.value })}
              onKeyPress={this.handleKeyPress}
            />
          </form>
        </div>
        <div className="song-container">
          {this.state.songs.map((song, index) => (
            // <SongCard
            //   number={index}
            //   title={song.name}
            //   key={song.id}
            //   songId={song.id}
            //   startPlayback={this.props.startPlayback}
            // />
            <div
              className="song-card"
              onClick={() => startPlayback(song.id)}
              key={song.id}
            >
              <div className="song-number">{index}</div>
              <div className="song-title">{song.name}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default RightContainer;
