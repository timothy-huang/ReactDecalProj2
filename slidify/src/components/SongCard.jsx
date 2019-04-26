import React from "react";
import "../styles/SongCard.css";

const SongCard = props => {
  return (
    <div className="song-card">
      <div className="song-number">{props.number}</div>
      <div className="song-title">{props.title}</div>
    </div>
  );
};

export default SongCard;