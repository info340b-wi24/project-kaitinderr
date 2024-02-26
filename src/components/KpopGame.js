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

  const hints = [
    `The artist of the song is "${SONG_DATA[currentSongIndex].artist}"`,
    `The album name of this song is "${SONG_DATA[currentSongIndex].albumName}"`,
    `The length (duration) of the song is "${SONG_DATA[currentSongIndex].length}"`,
    `The song was released on "${SONG_DATA[currentSongIndex].releaseDate}"`,
    `The songwriters are "${SONG_DATA[currentSongIndex].songWriters}"`,
  ];
  
  const resetGame = (correctGuess = false) => {
    setReveal(false); // Hide the answer
    setHintIndex(0); // Reset hint counter
    if (correctGuess) {
      // Move to next song only if the guess was correct
      setCurrentSongIndex((prevIndex) => (prevIndex + 1) % SONG_DATA.length);
    }
  };
  
  const handleGuess = (e) => {
    setUserGuess(e.target.value);
  };

  const checkGuess = () => {
    if (userGuess.toLowerCase() === SONG_DATA[currentSongIndex].songName.toLowerCase()) {
      alert('Correct!.');
      resetGame();
    } else {
      if (hintIndex >= 4) {
        alert('Incorrect, you used all your chances.');
        setReveal(true);
      } else {
        alert(`Incorrect. Try again.You have ${4 - hintIndex} hints remaining.`);
        setHintIndex(hintIndex + 1);
      }
    }
    setUserGuess('');
  };


  return (
    <div className="container my-5">
      <h2>Guess the K-Pop Song</h2>
      {!reveal && (
        <>
          {hints.slice(0, hintIndex + 1).map((hint, index) => (
            <p key={index}>{hint}</p>
          ))}
          <p>Hints remaining: {5 - hintIndex}</p>
        </>
      )}
      {reveal && (
        <>
          <img src={SONG_DATA[currentSongIndex].albumCover} alt={SONG_DATA[currentSongIndex].artist} />
          <p>Song Title: {SONG_DATA[currentSongIndex].songName}</p>
          <p>Album Name: {SONG_DATA[currentSongIndex].albumName}</p>
        </>
      )}
      <input type="text" value={userGuess} onChange={handleGuess} disabled={reveal} />
      {!reveal ? (
        <button onClick={checkGuess}>Guess</button>
      ) : (
        <button onClick={resetGame}>New Game</button>
      )}
    </div>
  );
}


export default KpopGame;