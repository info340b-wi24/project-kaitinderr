import React, { useState } from 'react';
import song from '../data/songs.json';

function Recommendation() {
    const [selectedSongName, setSelectedSongName] = useState('');
    const [recommendations, setRecommendations] = useState([]);
    const [newRecommendation, setNewRecommendation] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSongChange = (event) => {
        setSelectedSongName(event.target.value);
        setErrorMessage('');
    };

    const handleInputChange = (event) => {
        setNewRecommendation(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const selectedSong = song.find(song => song.songName === selectedSongName);
        if (selectedSong) {
            const recommendationText = `[${selectedSong.songName}] ${newRecommendation}`;
            setRecommendations([
                ...recommendations,
                {
                    text: recommendationText,
                    album: selectedSong.albumName,
                    cover: selectedSong.albumCover
                }
            ]);
            setNewRecommendation('');
        } else {
            setErrorMessage("No song selected.");
        }
    };

    return (
        <div className="col-md-12 col-lg-4 py-2 px-lg-4">
            { }
            <div className="recommendations">
                <h3 className="recommendations_title">Recommendations</h3>
                {recommendations.map((recommendation, index) => (
                    <div key={index} className="py-2">
                        <div className="card">
                            <div className="recommendation-content">
                                <img className="album_img_recommendations" src={recommendation.cover} alt={recommendation.album} />
                                <p className="recommendation_text_area">{recommendation.text}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            { }
            <div className="recommendation_form">
                <h4>Enter your recommendation:</h4>
                <form onSubmit={handleSubmit} className="form">
                    { }
                    <select className="select_song" value={selectedSongName} onChange={handleSongChange}>
                        <option value="">Select a Song</option>
                        {song.map(song => (
                            <option key={song.songName} value={song.songName}>{song.songName}</option>
                        ))}
                    </select>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    <textarea
                        className="recommendation_text_area"
                        id="recommendation"
                        name="recommendation"
                        required
                        placeholder="Type your recommendation here..."
                        value={newRecommendation}
                        onChange={handleInputChange}
                    ></textarea>

                    <input className="button" type="submit" value="Submit" aria-label="Submit Recommendation" />
                </form>
            </div>
        </div>
    );
}

export default Recommendation;