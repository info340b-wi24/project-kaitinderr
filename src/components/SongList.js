import React, { useState } from 'react';
import _ from 'lodash';

function SongCard(props) {
    const [totalScore, setTotalScore] = useState(props.song.totalScore);
    const [numRankings, setNumRankings] = useState(props.song.numRankings);

    return (
        <div className="d-flex col-md-6 col-xl-3">
            <div className="card mb-2 border-0">
                <div className="card-body ranking-card">
                    <div className="col-sm">
                        <h3 className="card-title mb-2"><a href="wonderland_song_page.html"
                            className="text-decoration-none text-reset">{props.song.songName}</a></h3>
                        <div className="row">
                            <div className="col-sm-6">
                                <img src={props.song.albumCover} className="card-img album-cover mb-3" alt={props.song.songName}/>
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
                                    <p>{releaseDate}</p>
                                </div>
                            </div>
                        </div>
                        <span><strong>Rank:</strong> 1 </span>
                        <span><strong>Score:</strong> {(totalScore/numRankings).toFixed(2)} </span>
                        <span><strong>Ratings:</strong> {numRankings} </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SongList(props) {
    let sortedSongs = _.sortBy(props.songs, props.songs)
}