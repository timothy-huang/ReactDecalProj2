import React from 'react';
import "../styles/EmptyState.css";

function EmptyState() {
  return (
    <div className="empty-state-container">
    <img className="music" src={require("../images/music.png") }/>
      <div className="empty-state-text">Your playlist is empty. 
      Search for your favorite songs and filter with sliders on the left.</div>
    </div>
  );
}

export default EmptyState;
