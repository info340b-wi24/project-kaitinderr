import React, { useState } from 'react';
import Recommendation from './Recommendation';

function SongPage(props) {

    return (
        <body>
            <header>
                <nav className="nav-bar">
                    <a href="index.html" className="icon"><img src="img/mango-icon.png" alt="mango icon" /></a>
                    <div id="hamburger"><a href="#"><i className="fa fa-bars" aria-label="menu"></i></a></div>
                    <div id="links">
                        <ul className="nav-options">
                            <li className="nav-page"><a href="index.html">Home</a></li>
                            <li className="nav-page"><a href="game.html">Game</a></li>
                            <li className="nav-page"><a href="#">Sign in</a></li>
                        </ul>
                    </div>
                </nav>
            </header>
            <div className="banner">
                <img src={props.song.backgroundBanner} alt={props.song.artist} />
            </div>
            <main>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 py-2">
                            <section>
                                <div className="card">
                                    <img src={props.song.albumCover} className="card-img-top album_img"
                                        alt={props.song.albumName} />
                                    <div className="card-body">
                                        <div className="row mb-3">
                                            <div className="col">
                                                <div className="ranks d-flex">
                                                    <p className="rank_text mr-2">Rank: {props.song.rank}</p>
                                                    <p className="rank_text mr-2">|</p>
                                                    <p className="rank_text">Score: {(props.song.totalScore / props.song.numRankings).toFixed(2)}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="info">
                                            <p className="info_label">Artist(s):</p>
                                            <p>{props.song.artist}</p>
                                            <p className="info_label">Album:</p>
                                            <p>{props.song.albumName}</p>
                                            <p className="info_label">Release date:</p>
                                            <p>{props.song.releaseDate}</p>
                                            <p className="info_label">Length:</p>
                                            <p>{props.song.length}</p>
                                            <p className="info_label">Songwriter(s):</p>
                                            <p>{props.song.songWriters}</p>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                        <div className="col-md-8 py-2">
                            <section>
                                <div className="card">
                                    <div className="card-body d-flex flex-column">
                                        <h1 className="song_title">{props.song.songName}</h1>
                                        <h2 className="lyrics_header">Lyrics</h2>
                                        <p>{props.song.lyrics}</p>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                   <Recommendation song={props.song}/>
                </div>
            </main>
            <footer className="mt-auto">
                <div className="container">
                    <p>&copy; 2024 Mango Music</p>
                </div>
            </footer>
        </body>

    )
}

export default SongPage;
