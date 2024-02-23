function AlbumSection(props) {
    const { albumCover, albumName, artist, rank, totalScore, lyrics } = props;
  
    return (
      <section>
        <div className="album">
          <img className="album_img" src={albumCover} alt={`Album cover for ${albumName}`} />
          <div className="ranks">
            <p className="rank_text">Rank: {rank}</p>
            <p className="rank_text"> | </p>
            <p className="rank_text">Score: {totalScore}</p>
          </div>
          <div className="info">
            <p className="info_label">Artist(s):</p>
            <p>{artist}</p>
            <p className="info_label">Album:</p>
            <p>{albumName}</p>
            <p className="info_label">Lyrics:</p>
          </div>
        </div>
      </section>
    );
  }
  
  export default AlbumSection;