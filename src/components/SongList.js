import React, { useState } from 'react';

function SongCard(props) {

    return (
        <div className="d-flex col-md-6 col-xl-3">
            <div className="card mb-2 border-0">
                <div className="card-body ranking-card">
                    <div className="col-sm">
                        <h3 className="card-title mb-2"><a href="#"
                            className="text-decoration-none text-reset">{props.song.songName}</a></h3>
                        <div className="row">
                            <div className="col-sm-6">
                                <img src={props.song.albumCover} className="card-img album-cover mb-3" alt={props.song.songName} />
                                <select className="mb-3">
                                    <option value="">Select Score</option>
                                    <option value="5">5</option>
                                    <option value="4">4</option>
                                    <option value="3">3</option>
                                    <option value="2">2</option>
                                    <option value="1">1</option>
                                </select>
                                <button type="submit" className="">Submit</button>
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
    const sortedSongs = props.songs.map(song => ({
        ...song,
        score: song.totalScore / song.numRankings
    })).sort((a, b) => b.score - a.score);

    let counter = 0;
    const sortedSongCards = sortedSongs.map(song => {
        counter++;
        return <SongCard song={song} key={song.songName} position={counter}/>
    })

    return (
        <main class="mx-auto text-center">
            <h1>K-Pop Song Rankings</h1>
            <input type="text" placeholder="Search..." class="search" />
            <div class="container">
                <div class="row">
                    {sortedSongCards}
                </div>
            </div>
        </main>
    )
}