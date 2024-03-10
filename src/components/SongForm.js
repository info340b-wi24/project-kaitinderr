import React, { useState } from 'react';
import { getDatabase, ref as dbRef, push as firebasePush } from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL} from 'firebase/storage';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function SongForm({ showModal, handleClose }) {
    const [alertMessage, setAlertMessage] = useState(null);
    const [formValid, setFormValid] = useState(false);
    const [albumCoverFile, setAlbumCoverFile] = useState(undefined);
    const [bannerFile, setBannerFile] = useState(undefined);
    const [songData, setSongData] = useState({
        songName: '',
        albumName: '',
        artist: '',
        songWriters: '',
        lyrics: '',
        releaseDate: '',
        length: ''
    });

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        if (event.target.files && event.target.files.length > 0) {
            if (name === 'albumCover') {
                const imageFile = event.target.files[0];
                setAlbumCoverFile(imageFile);
            } else if (name === 'backgroundBanner') {
                const imageFile = event.target.files[0];
                setBannerFile(imageFile);
            }
        }

        if (name !== 'albumCover' && name !== 'backgroundBanner') {
            setSongData({ ...songData, [name]: value });
        }

        setFormValid(event.target.form.checkValidity());
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!formValid) {
            setAlertMessage('Please fill in all required fields.');
            return;
        }

        // image stuff
        const storage = getStorage();
        const albumCoverRef = storageRef(storage, "albumCover/"+songData.songName+songData.artist);
        const bannerRef = storageRef(storage, "backgroundBanner/"+songData.artist+songData.songName);

        await uploadBytes(albumCoverRef, albumCoverFile);
        await uploadBytes(bannerRef, bannerFile);
        const albumCoverUrlString = await getDownloadURL(albumCoverRef);
        const bannerUrlString = await getDownloadURL(bannerRef);

        const song = {
            ...songData,
            albumCoverURL: albumCoverUrlString,
            backgroundBannerURL: bannerUrlString
        }

        const db = getDatabase();
        const songsRef = dbRef(db, 'songs');
        firebasePush(songsRef, song).then(() => {
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
                            <input type="text" className="form-control" name="songName" value={songData.songName} onChange={handleChange} placeholder="Song Name" required />
                        </div>
                        <div className="form-group py-2" >
                            <input type="text" className="form-control" name="albumName" value={songData.albumName} onChange={handleChange} placeholder="Album" required />
                        </div>
                        <div className="form-group py-2">
                            <input type="text" className="form-control" name="artist" value={songData.artist} onChange={handleChange} placeholder="Artist(s)" required />
                        </div>
                        <div className="form-group py-2">
                            <input type="text" className="form-control" name="songWriters" value={songData.songWriters} onChange={handleChange} placeholder="Song Writers" required/>
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
                            <input type="file" className="form-control-file" name="albumCover" onChange={handleChange} required/>
                        </div>
                        <div className="form-group py-2">
                            <p>Background Banner:</p>
                            <input type="file" className="form-control-file" name="backgroundBanner" onChange={handleChange} required/>
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
