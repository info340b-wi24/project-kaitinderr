import React, { useState } from 'react';
import { getDatabase, ref, push as firebasePush } from 'firebase/database';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function SongForm({ showModal, handleClose }) {
    const [alertMessage, setAlertMessage] = useState(null);
    const [formValid, setFormValid] = useState(false);
    const [songData, setSongData] = useState({
        songName: '',
        albumName: '',
        artist: '',
        songWriters: '',
        lyrics: '',
        releaseDate: '',
        length: '',
        albumCover: null, // WIP
        backgroundBanner: null, // WIP
    });

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setSongData({ ...songData, [name]: value });
        setFormValid(event.target.form.checkValidity());
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!formValid) {
            setAlertMessage('Please fill in all required fields.');
            return;
        }

        const db = getDatabase();
        const songsRef = ref(db, 'songs');
        firebasePush(songsRef, songData).then(() => {
            setAlertMessage('Song added successfully!');
            setTimeout(() => {
                handleClose();
                setAlertMessage(null);
            }, 1000);

        }).catch((err) => {
            setAlertMessage('Failed to add song!');
            console.log(err.message);
        });
    };

    return (
        <div>
            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add Song</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {alertMessage &&
                        <p>{alertMessage}</p>
                    }
                    <form onSubmit={handleSubmit}>
                        <div className="form-group py-2">
                            <input type="text" className="form-control" name="name" value={songData.name} onChange={handleChange} placeholder="Song Name" required />
                        </div>
                        <div className="form-group py-2" >
                            <input type="text" className="form-control" name="album" value={songData.album} onChange={handleChange} placeholder="Album" required />
                        </div>
                        <div className="form-group py-2">
                            <input type="text" className="form-control" name="artist" value={songData.artist} onChange={handleChange} placeholder="Artist(s)" required />
                        </div>
                        <div className="form-group py-2">
                            <input type="text" className="form-control" name="writers" value={songData.writers} onChange={handleChange} placeholder="Song Writers" required/>
                        </div>
                        <div className="form-group py-2">
                            <textarea className="form-control" name="lyrics" value={songData.lyrics} onChange={handleChange} placeholder="Lyrics"></textarea>
                        </div>
                        <div className="form-group py-2">
                            <input type="text" className="form-control" name="length" value={songData.length} onChange={handleChange} placeholder="Length (e.g., 2:34)" required />
                        </div>
                        <div className="form-group">
                            <p>Release Date:</p>
                            <input type="date" className="form-control" name="releaseDate" value={songData.releaseDate} onChange={handleChange} required />
                        </div>
                        <div className="form-group py-2">
                            <p>Song Cover:</p>
                            <input type="file" className="form-control-file" name="picture" onChange={handleChange} required/>
                        </div>
                        <div className="form-group py-2">
                            <p>Background Banner:</p>
                            <input type="file" className="form-control-file" name="banner" onChange={handleChange} required/>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default SongForm;
