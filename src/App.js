import React from 'react';
import KpopGame from './components/KpopGame.js'; // Adjust the path as necessary
import SongList from './components/SongList.js';

function App(props) {
  return (
    <div className="App">
      {/* <KpopGame /> */}
      <SongList songs={props.songData} />
    </div>
  );
}

export default App;