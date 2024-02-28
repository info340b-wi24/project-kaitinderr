import React, { useState } from 'react';
// Assuming your song data is imported or fetched here

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
    <body>
            <main>
            <div className="container my-5">
            <div className="row">
                <div className="col-md-6">
                    <div className="card text-center">
                        <div className="card-body">
                        {reveal ? (
                                <>
                                    <h5 className="card-title">{props.songs[currentSongIndex].songName}</h5>
                                    <img src={ props.songs[currentSongIndex].albumCover} alt={props.songs[currentSongIndex].artist} className="img-fluid" />
                                </>
                            ) : (
                              <img src="./img/question_mark.jpeg" alt="What's the song?" className="img-fluid" />
                            )}
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="card">
                        <div className="card-header">
                            <h2>Clues</h2>
                        </div>
                        <ul className="list-group list-group-flush">
                            {hints.slice(0, hintIndex + 1).map((hint, index) => (
                                <li key={index} className="list-group-item">{hint}</li>
                            ))}
                            {reveal && !correctGuess && (
                                <li className="list-group-item list-group-item-danger">The correct answer was: "{props.songs[currentSongIndex].songName}" by {props.songs[currentSongIndex].artist}</li>
                            )}
                        </ul>
                    </div>
                    {!reveal && (
                        <div className="input-group mt-5 mb-3">
                            <input type="text" className="form-control" value={userGuess} onChange={handleGuess} placeholder="Enter your guess" />
                            <button className="btn btn-primary" onClick={checkGuess}>Submit Guess</button>
                        </div>
                    )}
                    {reveal && correctGuess && <div className="feedback-message mt-3">Correct! The song was: "{props.songs[currentSongIndex].songName}" by {props.songs[currentSongIndex].artist}</div>}
                    <button className="btn btn-secondary mt-3" onClick={resetGame}>New Game</button>
                </div>
            </div>
        </div>
    </main>
    </body>
  );
}

export default KpopGame;


