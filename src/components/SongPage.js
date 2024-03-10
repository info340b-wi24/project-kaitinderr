import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import Recommendation from './Recommendation';
import { useParams } from 'react-router-dom';

function SongPage() {
    const [song, setSong] = useState({});
    const [ratings, setRatings] = useState({});
    const { songKey } = useParams();

    const db = getDatabase();
        const songRef = ref(db, `songs/${songKey}`);
        const ratingsRef = ref(db, `ratings/${songKey}`);

        useEffect(() => {
            const offFunctionSong = onValue(songRef, (snapshot) => {
                const data = snapshot.val();
                setSong(data);
            });
            return () => {
                offFunctionSong();
            };
        }, [songKey]);

        useEffect(() => {
            const offFunctionRatings = onValue(ratingsRef, (snapshot) => {
                const ratingsObj = snapshot.val();
                let totalScore = 0;
                let numRankings = 0;
        
                if (ratingsObj) {
                    numRankings = Object.keys(ratingsObj).length;
                    totalScore = Object.values(ratingsObj).reduce((acc, rating) => {
                        return acc + (Number(rating.score) || 0);
                    }, 0);
                }
        
                setRatings({
                    totalScore: totalScore,
                    numRankings: numRankings,
                    averageScore: numRankings > 0 ? (totalScore / numRankings).toFixed(2) : 'No ratings'
                });
            });
        
            return () => offFunctionRatings();
        }, [songKey, ratingsRef]);

    if (!song) return <div>Loading...</div>;


    return (
        <main>
            <div className="banner">
                <img src={song.backgroundBannerURL} alt={song.artist} />
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-4 py-2">
                        <section>
                            <div className="card">
                                <img src={song.albumCoverURL} className="card-img-top album_img" alt={song.albumName} />
                                <div className="card-body">
                                    <div className="row mb-3">
                                        <div className="col">
                                            <div className="ranks d-flex">
                                                <p className="rank_text mr-2">Score: {ratings.averageScore}</p>
                                                <p className="rank_text mr-2">|</p>
                                                <p className="rank_text">Ratings: {ratings.numRankings}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="info">
                                        <p className="info_label">Artist(s):</p>
                                        <p>{song.artist}</p>
                                        <p className="info_label">Album:</p>
                                        <p>{song.albumName}</p>
                                        <p className="info_label">Release date:</p>
                                        <p>{song.releaseDate}</p>
                                        <p className="info_label">Length:</p>
                                        <p>{song.length}</p>
                                        <p className="info_label">Songwriter(s):</p>
                                        <p>{song.songWriters}</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                    <div className="col-md-8 py-2">
                        <section>
                            <div className="card">
                                <div className="card-body d-flex flex-column">
                                    <h1 className="song_title">{song.songName}</h1>
                                    <h2 className="lyrics_header">Lyrics</h2>
                                    <p className="lyrics">{song.lyrics}</p>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
                <Recommendation songkey={songKey}/>
            </div>
        </main>
    );
}

export default SongPage;
