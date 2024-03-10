import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { Link } from 'react-router-dom';


function getRandomIndex(data) {
  return Math.floor(Math.random() * data.length);
}

function KpopGame() {
  const [songData, setSongData] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(null);
  const [hintIndex, setHintIndex] = useState(0);
  const [userGuess, setUserGuess] = useState('');
  const [reveal, setReveal] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());
  const [elapsedTime, setElapsedTime] = useState(0);
  const [guessesLeft, setGuessesLeft] = useState(5);
  const maxGuesses = 5;

  useEffect(() => {
    const db = getDatabase();
    const songsRef = ref(db, "songs");

    const offFunction = onValue(songsRef, (snapshot) => {
      const valueObj = snapshot.val();
      if (valueObj) {
        const objKeys = Object.keys(valueObj);
        const objArray = objKeys.map(key => {
          const songObj = valueObj[key];
          return { ...songObj, key };
        });
        setSongData(objArray);
      } else {
        setSongData([]);
      }
    });

    return () => offFunction();
  }, []);

  useEffect(() => {
    if (songData.length > 0) {
      setCurrentSongIndex(getRandomIndex(songData));
    }
  }, [songData]);

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
    if (songData.length > 0) {
      setCurrentSongIndex(getRandomIndex(songData));
    }
    setHintIndex(0);
    setUserGuess('');
    setReveal(false);
    setStartTime(Date.now());
    setElapsedTime(0);
    setGuessesLeft(maxGuesses);
  };

  const handleGuess = (e) => {
    setUserGuess(e.target.value);
  };

  const checkGuess = () => {
    setGuessesLeft(prevGuesses => {
      const newGuessesLeft = prevGuesses - 1;
      if (userGuess.toLowerCase() === songData[currentSongIndex]?.songName.toLowerCase()) {
        setReveal(true);
      } else if (newGuessesLeft <= 0) {
        setReveal(true);
      } else {
        setHintIndex(prevHintIndex => prevHintIndex + 1);
      }
      return newGuessesLeft;
    });
    setUserGuess('');
  };

  if (currentSongIndex === null || songData.length === 0) return <div>Loading...</div>;

  const song = songData[currentSongIndex];

  const renderHints = () => {
    const hints = [
      `The artist of the song is "${song.artist}"`,
      `The album name of this song is "${song.albumName}"`,
      `The length (duration) of the song is "${song.length}"`,
      `The song was released on "${song.releaseDate}"`,
      `The songwriters are "${song.songWriters}"`,
    ];

    return hints.slice(0, hintIndex + 1).map((hint, index) => (
      <li key={index}>{hint}</li>
    ));
  };

  const renderAnswerCard = () => {
    const timeTaken = (elapsedTime / 1000).toFixed(2);
    const guessesUsed = maxGuesses - guessesLeft;
    const rank = getRank();
    return (
      <div>
        <h5>The name of the song is "{song.songName}" by {song.artist}</h5>
        <p>Time taken: {timeTaken} seconds</p>
        <p>Guesses used: {guessesUsed}</p>
        <p>Rank: {rank}</p>
      </div>
    );
  };

  return (
    <main className="container my-5 justify-content-center">
      <div className="row">
        <div className="col-md-6">
          <div className="card text-center">
            <div className="card-body">
              {reveal ? (
                <>
                  <Link to={`/songs/${song.key}`}>
                    <h5 className="card-title">{song.songName}</h5>
                    <img src={song.albumCoverURL} alt={`${song.artist} album cover`} className="img-fluid" />
                  </Link>
                </>
              ) : (
                <img src="./img/question_mark.jpeg" alt="What's the song?" className="img-fluid" />
              )}
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">{reveal ? "Answer" : "Hints"}</div>
            <div className="card-body">
              {reveal ? renderAnswerCard() : <ul>{renderHints()}</ul>}
              {!reveal && <p>Guesses left: {guessesLeft}</p>}
            </div>
          </div>
          {!reveal && (
            <div className="input-group mt-3">
              <input type="text" className="form-control" value={userGuess} onChange={handleGuess} placeholder="Enter your guess" />
              <button className="btn btn-primary" onClick={checkGuess}>Submit Guess</button>
            </div>
          )}
          <button className="btn btn-secondary mt-3" onClick={resetGame}>New Game</button>
        </div>
      </div>
    </main>
  );
}

export default KpopGame;
