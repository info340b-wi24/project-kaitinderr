import React from 'react';
import { Link } from 'react-router-dom';
import SONG_DATA from '../data/songs.json';

function Songs() {
    return (
      <ul>
        {SONG_DATA.map(song => (
          <li key={song.songName}>
            <Link to={`/${encodeURIComponent(song.songName)}`}>{song.songName}</Link>
          </li>
        ))}
      </ul>
    );
  }

export default Songs;