import React from 'react';

function SongsBanner(props) {
  const {albumCover, albumName, songName} = props;

  return (
    <div className="bannercontainer">
      <img className="song_banner" src={albumCover} alt={albumName} />
      <h1 className="song_title">{songName}</h1>
    </div>
  );
}

export default SongsBanner;