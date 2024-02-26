import React, { useState } from 'react';
import SONG_DATA from '../data/songs.json';
// Assuming your song data is imported or fetched here

function getRandomIndex(data) {
    return Math.floor(Math.random() * data.length);
}

function KpopGame() {
  const [currentSongIndex, setCurrentSongIndex] = useState(getRandomIndex(SONG_DATA)); // To cycle through songs for the game
  const [hintIndex, setHintIndex] = useState(0); // To show hints progressively
  const [userGuess, setUserGuess] = useState('');
  const [reveal, setReveal] = useState(false); // Reveal the answer
  const [correctGuess, setCorrectGuess] = useState(false);

  const hints = [
    `The artist of the song is "${SONG_DATA[currentSongIndex].artist}"`,
    `The album name of this song is "${SONG_DATA[currentSongIndex].albumName}"`,
    `The length (duration) of the song is "${SONG_DATA[currentSongIndex].length}"`,
    `The song was released on "${SONG_DATA[currentSongIndex].releaseDate}"`,
    `The songwriters are "${SONG_DATA[currentSongIndex].songWriters}"`,
  ];
  
  const resetGame = () => {
    setCurrentSongIndex(getRandomIndex(SONG_DATA));
    setReveal(false);
    setHintIndex(0);
    setUserGuess('');
    setCorrectGuess(false);
  };
  
  const handleGuess = (e) => {
    setUserGuess(e.target.value);
  };

  const checkGuess = () => {
    if (userGuess.toLowerCase() === SONG_DATA[currentSongIndex].songName.toLowerCase()) {
      setCorrectGuess(true); // Indicate the guess was correct
      setReveal(true); // Reveal the answer immediately
    } else {
      if (hintIndex >= 4) {
        setReveal(true);
      } else {
        setHintIndex(hintIndex + 1);
      }
    }
    setUserGuess(''); // Clear input field
  };

  return (
    <div className="container my-5">
      <h2>Guess the K-Pop Song</h2>
      {!reveal && (
        <>
          {hints.slice(0, hintIndex + 1).map((hint, index) => <p key={index}>{hint}</p>)}
          <input type="text" value={userGuess} onChange={handleGuess} />
          <button onClick={checkGuess}>Guess</button>
        </>
      )}
      {reveal && (
        <>
          <img src={process.env.PUBLIC_URL + '/' + SONG_DATA[currentSongIndex].albumCover} alt={SONG_DATA[currentSongIndex].artist} />
          <p>Song Title: {SONG_DATA[currentSongIndex].songName}</p>
          <p>Album Name: {SONG_DATA[currentSongIndex].albumName}</p>
          <button onClick={resetGame}>New Game</button>
          {correctGuess && <div className="feedback-message">Correct!</div>}
        </>
      )}
    </div>
  );
}

export default KpopGame;