import React, { useState, useEffect } from 'react';
import { getDatabase, ref, query, limitToFirst, onValue } from 'firebase/database';
import Recommendation from './Recommendation';

function SongPage() {
    const [song, setSong] = useState({});

    useEffect(() => {
        const db = getDatabase();
        const songsRef = ref(db, 'songs');
        
        const firstSongQuery = query(songsRef, limitToFirst(1));

        onValue(firstSongQuery, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const firstSongKey = Object.keys(data)[0];
                const firstSongData = data[firstSongKey];
                setSong(firstSongData);
            }
        });
    }, []);

    if (!song) return <div>Loading...</div>;

    return (
        <body>
            <div className="banner">
                <img src={song.backgroundBannerURL} alt={song.artist} />
            </div>
            <main>
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
                                                    <p className="rank_text mr-2">Rank: {song.rank}</p>
                                                    <p className="rank_text mr-2">|</p>
                                                    <p className="rank_text">Score: {(song.totalScore / song.numRankings).toFixed(2)}</p>
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
                    <Recommendation song={song}/>
                </div>
            </main>
        </body>
    );
}

export default SongPage;
