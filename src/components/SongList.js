import React, { useState, useEffect } from 'react';
import SongForm from './SongForm.js';
import { Link } from 'react-router-dom';
import { getDatabase, ref, onValue, set as firebaseSet } from 'firebase/database';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function SongCard(props) {
    const [selectedScore, setSelectedScore] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    const dismissAlert = () => {
        setShowAlert(false);
    }

    const handleScoreChange = (event) => {
        setSelectedScore(event.target.value);
    };

    const handleSubmitScore = () => {
        if (props.currentUser.userId === null) {
            setShowAlert(true);
            return;
        } else if (!selectedScore) {
            return;
        }

        const db = getDatabase();
        const userRatingRef = ref(db, `ratings/${props.songKey}/${props.currentUser.userId}`);

        firebaseSet(userRatingRef, {
            score: selectedScore
        }).catch(err => console.log(err));
    };

    return (
        <div className="d-flex col-md-6 col-xl-3">
            <div className="card mb-2 border-0">
                <div className="card-body ranking-card">
                    <div className="col-sm">
                        <h2 className="card-title mb-2">
                            <Link to={`/songs/${props.songKey}`} className="text-decoration-none text-reset">
                                {props.song.songName}
                            </Link>
                        </h2>
                        <div className="row">
                            <div className="col-sm-6">
                                <img src={props.song.albumCoverURL} className="card-img album-cover mb-3" alt={props.song.songName} />
                                <select className="mb-3 mx-1" aria-label='select score' value={selectedScore} onChange={handleScoreChange}>
                                    <option value="">Select Score</option>
                                    <option value="5">5</option>
                                    <option value="4">4</option>
                                    <option value="3">3</option>
                                    <option value="2">2</option>
                                    <option value="1">1</option>
                                </select>
                                <button type="button" className="rank-button" onClick={handleSubmitScore}>Submit</button>
                                <Modal show={showAlert} onHide={dismissAlert}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Sign In Required</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        You need to be signed in to use this feature.
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={dismissAlert}>
                                            Close
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </div>
                            <div className="col-sm-6">
                                <div className="ranking-card-content">
                                    <p className="mb-1 category">Album:</p>
                                    <p className="mb-1">{props.song.albumName}</p>
                                    <p className="mb-1 category">Artist(s):</p>
                                    <p className="mb-1">{props.song.artist}</p>
                                    <p className="mb-1 category">Release Date:</p>
                                    <p>{props.song.releaseDate}</p>
                                </div>
                            </div>
                        </div>
                        <span><strong>Rank:</strong> {props.position} </span>
                        <span><strong>Score:</strong> {(props.song.totalScore / props.song.numRankings).toFixed(2)} </span>
                        <span><strong>Ratings:</strong> {props.song.numRankings} </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function SongList(props) {
    const [searchQuery, setSearchQuery] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [songs, setSongs] = useState({});
    const [ratings, setRatings] = useState({});
    const [songData, setSongData] = useState([]);


    const db = getDatabase();
    const songsRef = ref(db, "songs");
    const ratingsRef = ref(db, "ratings");

    useEffect(() => {
        const songOffFunction = onValue(songsRef, (snapshot) => {
            const songsObj = snapshot.val();
            setSongs(songsObj);
        });

        return () => songOffFunction();
    }, []);

    useEffect(() => {
        const ratingsOffFunction = onValue(ratingsRef, (snapshot) => {
            const ratingsObj = snapshot.val();
            setRatings(ratingsObj);
        });

        return () => ratingsOffFunction();
    }, []);

    useEffect(() => {
        const combinedData = Object.keys(songs).map(key => {
            const song = songs[key];
            const songRatings = ratings[key] || {};
            const ratingsArray = Object.values(songRatings);
            const totalScore = ratingsArray.reduce((acc, curr) => acc + parseInt(curr.score || 0, 10), 0);
            const numRankings = ratingsArray.length;
            const averageScore = numRankings > 0 ? (totalScore / numRankings).toFixed(2) : 'No ratings';

            return {
                ...song,
                key,
                totalScore,
                numRankings,
                averageScore,
            };
        });

        setSongData(combinedData);
    }, [songs, ratings]);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    const sortedSongs = songData.map(song => ({
        ...song,
        score: song.totalScore / song.numRankings
    })).sort((a, b) => b.score - a.score);

    // Function to filter the song cards based on search query
    const filteredSongs = sortedSongs.filter(song => {
        return song.songName.toLowerCase().includes(searchQuery.toLowerCase());
    });

    let counter = 0;
    const displayedSongCards = filteredSongs.map(song => {
        counter++;
        return <SongCard song={song} key={song.key} position={counter} currentUser={props.currentUser} songKey={song.key} />
    })

    return (
        <main className="mx-auto text-center">
            <div className="container">
                <div className="col">
                    <h1>K-Pop Song Rankings</h1>
                    <div className='my-3'>
                        <button className="rank-button" onClick={openModal}>Add a Song</button>
                    </div>
                    <SongForm showModal={showModal} handleClose={closeModal} />
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder="Search Song..." className="search" value={searchQuery} onChange={handleSearchInputChange} />
                    </form>
                    <div className="row">
                        {displayedSongCards}
                    </div>
                </div>
            </div>
        </main>
    )
}