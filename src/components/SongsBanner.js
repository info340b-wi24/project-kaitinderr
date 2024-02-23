import React from 'react';

function SongsBanner(props) {
  return (
    <div className="bannercontainer">
      <img className="song_banner" src={props.albumCover} alt={albumName} />
      <h1 className="song_title">{props.songName}</h1>
    </div>
  );
}

export default SongsBanner;