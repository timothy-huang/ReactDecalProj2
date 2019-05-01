import React from "react";

import SongCard from "./SongCard";
import SearchBar from "./SearchBar";
import EmptyState from "./EmptyState";

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

        {this.state.songs.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="song-container">
            {this.state.songs.map((song, index) => (
              <SongCard
                number={index + 1}
                key={song.id}
                song={song}
                startPlayback={this.props.startPlayback}
                setCurrentlyPlaying={this.props.setCurrentlyPlaying}
                currentlyPlaying={song.id === this.props.currentlyPlaying.id}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default RightContainer;
