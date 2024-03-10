import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, push } from 'firebase/database';

function Recommendation() {
    const [selectedSongName, setSelectedSongName] = useState('');
    const [songs, setSongs] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [newRecommendation, setNewRecommendation] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const db = getDatabase();
        const songsRef = ref(db, 'songs');
        const recommendationsRef = ref(db, 'recommendations');

        const offSongs = onValue(songsRef, (snapshot) => {
            const songsVal = snapshot.val();
            const loadedSongs = [];
            for (let key in songsVal) {
                loadedSongs.push({
                    ...songsVal[key],
                    key: key
                });
            }
            setSongs(loadedSongs);
        });

        const offRecommendations = onValue(recommendationsRef, (snapshot) => {
            const recommendationsVal = snapshot.val();
            const loadedRecommendations = [];
            for (let key in recommendationsVal) {
                loadedRecommendations.push({
                    ...recommendationsVal[key],
                    key: key
                });
            }
            setRecommendations(loadedRecommendations);
        });

        return () => {
            offSongs();
            offRecommendations();
        };
    }, []);


    const handleSongChange = (event) => {
        setSelectedSongName(event.target.value);
        setErrorMessage('');
    };

    const handleInputChange = (event) => {
        setNewRecommendation(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const selectedSong = songs.find(song => song.songName === selectedSongName);
        if (selectedSong) {
            const db = getDatabase();
            const recommendationsRef = ref(db, 'recommendations');
            const recommendationData = {
                text: `[${selectedSong.songName}] ${newRecommendation}`,
                album: selectedSong.albumName,
                cover: selectedSong.albumCoverURL
            };

            push(recommendationsRef, recommendationData)
                .then(() => {
                    setNewRecommendation('');
                    setErrorMessage('');
                })
                .catch((error) => {
                    setErrorMessage("Failed to upload recommendation: " + error.message);
                });
        } else {
            setErrorMessage("No song selected.");
        }
    };

    const songOptions = songs.map(song => (
        <option key={song.key} value={song.songName}>{song.songName}</option>
    ));

    const recommendationList = recommendations.map((recommendation, index) => (
        <div key={index} className="py-2">
            <div className="card">
                <div className="recommendation_content">
                    <img className="album_img_recommendations" src={recommendation.cover} alt={recommendation.album} />
                    <p className="recommendation_text_area">{recommendation.text}</p>
                </div>
            </div>
        </div>
    ));

    return (
        <div className="col-md-12 col-lg-4 py-2 px-lg-4">
            <div className="recommendations">
                <h3 className="recommendations_title">Recommendations</h3>
            </div>
            {recommendationList}
            <div className="recommendation_form">
                <h4>Enter your recommendation:</h4>
                <form onSubmit={handleSubmit} className="form">
                    <label htmlFor="select_song">Select a Song:
                        <select className="select_song" value={selectedSongName} onChange={handleSongChange}>
                            <option value=""></option>
                            {songOptions}
                        </select>
                    </label>
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