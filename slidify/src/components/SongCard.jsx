import React, { Component } from "react";
import "../styles/SongCard.css";

class SongCard extends Component {
  render() {
    const {
      startPlayback,
      song,
      number,
      setCurrentlyPlaying,
      currentlyPlaying
    } = this.props;
    let cardClass = currentlyPlaying ? "song-card-focused" : "song-card";

    return (
      <div
        className={cardClass}
        onClick={() => {
          startPlayback(song.id);
          setCurrentlyPlaying(song);
        }}
      >
        <div className="song-number">{number}</div>
        <div className="song-title">{song.name}</div>
        {song.artists.map(artist => (
          <div className="artist">{artist.name}</div>
        ))}
      </div>
    );
  }
}

export default SongCard;
