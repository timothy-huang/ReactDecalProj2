import React from "react";

import RightContainer from "./components/RightContainer.jsx";
import LeftContainer from "./components/LeftContainer.jsx";
import PlaybackBar from './components/PlaybackBar.jsx';

function App() {
  return (
    <div>
      <LeftContainer />
      <RightContainer />
      <PlaybackBar />
    </div>
  );
}

export default App;
