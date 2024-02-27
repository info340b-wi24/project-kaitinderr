import React, { useState } from 'react';

function getRandomIndex(data) {
    return Math.floor(Math.random() * data.length);
}

function KpopGame(props) {
  const [currentSongIndex, setCurrentSongIndex] = useState(getRandomIndex(props.songs)); // To cycle through songs for the game
  const [hintIndex, setHintIndex] = useState(0); // To show hints progressively
  const [userGuess, setUserGuess] = useState('');
  const [reveal, setReveal] = useState(false); // Reveal the answer
  const [correctGuess, setCorrectGuess] = useState(false);

  const hints = [
    `The artist of the song is "${props.songs[currentSongIndex].artist}"`,
    `The album name of this song is "${props.songs[currentSongIndex].albumName}"`,
    `The length (duration) of the song is "${props.songs[currentSongIndex].length}"`,
    `The song was released on "${props.songs[currentSongIndex].releaseDate}"`,
    `The songwriters are "${props.songs[currentSongIndex].songWriters}"`,
  ];
  
  const resetGame = () => {
    setCurrentSongIndex(getRandomIndex(props.songs));
    setReveal(false);
    setHintIndex(0);
    setUserGuess('');
    setCorrectGuess(false);
  };
  
  const handleGuess = (e) => {
    setUserGuess(e.target.value);
  };

  const checkGuess = () => {
    if (userGuess.toLowerCase() === props.songs[currentSongIndex].songName.toLowerCase()) {
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
          <img src={props.songs[currentSongIndex].albumCover} alt={props.songs[currentSongIndex].songName} />
          <p>Song Title: {props.songs[currentSongIndex].songName}</p>
          <p>Album Name: {props.songs[currentSongIndex].albumName}</p>
          <button onClick={resetGame}>New Game</button>
          {correctGuess && <div className="feedback-message">Correct!</div>}
        </>
      )}
    </div>
  );
}

export default KpopGame;