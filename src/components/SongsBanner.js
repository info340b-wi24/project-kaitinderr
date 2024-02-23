import React from 'react';

function SongsBanner(props) {
  const {backgroundBanner, artist, songName} = props;

  return (
    <div className="bannercontainer">
      <img className="song_banner" src={backgroundBanner} alt={artist} />
      <h1 className="song_title">{songName}</h1>
    </div>
  );
}

export default SongsBanner;