import React, { useState, useEffect } from 'react';

function getRandomIndex(data) {
  return Math.floor(Math.random() * data.length);
}

function KpopGame(props) {
  const maxGuesses = 5;
  const [currentSongIndex, setCurrentSongIndex] = useState(getRandomIndex(props.songs));
  const [hintIndex, setHintIndex] = useState(0);
  const [userGuess, setUserGuess] = useState('');
  const [reveal, setReveal] = useState(false);
  const [correctGuess, setCorrectGuess] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());
  const [elapsedTime, setElapsedTime] = useState(0);
  const [guessesLeft, setGuessesLeft] = useState(maxGuesses);

  useEffect(() => {
    if (!reveal) {
      const timer = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [reveal, startTime]);

  const getRank = () => {
    switch (hintIndex) {
      case 0:
        return 'S';
      case 1:
        return 'A';
      case 2:
        return 'B';
      case 3:
        return 'C';
      default:
        return 'F';
    }
  };

  const resetGame = () => {
    setCurrentSongIndex(getRandomIndex(props.songs));
    setReveal(false);
    setHintIndex(0);
    setUserGuess('');
    setCorrectGuess(false);
    setStartTime(Date.now());
    setElapsedTime(0);
    setGuessesLeft(maxGuesses);
  };

  const handleGuess = (e) => {
    setUserGuess(e.target.value);
  };

  const checkGuess = () => {
    const newGuessesLeft = guessesLeft - 1;
    setGuessesLeft(newGuessesLeft);

    if (userGuess.toLowerCase() === props.songs[currentSongIndex].songName.toLowerCase()) {
      setCorrectGuess(true);
      setReveal(true);
    } else {
      if (newGuessesLeft <= 0) {
        setReveal(true);
      } else {
        setHintIndex(hintIndex + 1);
      }
    }
    setUserGuess('');
  };

  const renderHints = () => {
    const hints = [
      `The artist of the song is "${props.songs[currentSongIndex].artist}"`,
      `The album name of this song is "${props.songs[currentSongIndex].albumName}"`,
      `The length (duration) of the song is "${props.songs[currentSongIndex].length}"`,
      `The song was released on "${props.songs[currentSongIndex].releaseDate}"`,
      `The songwriters are "${props.songs[currentSongIndex].songWriters}"`,
    ];

    return hints.slice(0, hintIndex + 1).map((hint, index) => (
      <li key={index} className="list-group-item">{hint}</li>
    ));
  };

  const renderAnswerCard = () => {
    const timeTaken = (elapsedTime / 1000).toFixed(2);
    const rank = getRank();
    const guessesUsed = maxGuesses - guessesLeft;
    const songName = props.songs[currentSongIndex].songName;
    const artist = props.songs[currentSongIndex].artist;

    return (
      <div>
        <h5>The name of the song is "{songName}" by {artist}</h5>
        <p>Rank: {rank}</p>
        <p>Time taken: {timeTaken} seconds</p>
        <p>Guesses used: {guessesUsed}</p>
      </div>
    );
  };

  return (
    <main>
      <div className="container my-5 justify-content-center">
        <div className="row">
          <div className="col-md-6">
            <div className="card text-center">
              <div className="card-body">
                {reveal ? (
                  <>
                    <h5 className="card-title">{props.songs[currentSongIndex].songName}</h5>
                    <img src={props.songs[currentSongIndex].albumCover} alt={props.songs[currentSongIndex].artist} className="img-fluid" />
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
                <h2>{reveal ? "Answer" : "Clues"}</h2>
              </div>
              <div className="card-body">
                {reveal ? renderAnswerCard() : <ul className="list-group list-group-flush">{renderHints()}</ul>}
                {!reveal && <p className="text-center mt-3">Guesses left: {guessesLeft}</p>}
              </div>
            </div>
            {!reveal && (
              <div className="input-group mt-5 mb-3">
                <input type="text" className="form-control" value={userGuess} onChange={handleGuess} placeholder="Enter your guess" />
                <button className="btn btn-primary" onClick={checkGuess}>Submit Guess</button>
              </div>
            )}
            <button className="btn btn-secondary mt-3" onClick={resetGame}>New Game</button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default KpopGame;
