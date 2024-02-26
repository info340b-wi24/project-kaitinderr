import React from 'react';

function SongPage(props) {

    return (
        <body>
            <header>
                <nav className="nav-bar">
                    <a href="index.html" className="icon"><img src="img/mango-icon.png" alt="mango icon" /></a>
                    <div id="hamburger"><a href="#"><i className="fa fa-bars" aria-label="menu"></i></a></div>
                    <div id="links">
                        <ul className="nav-options">
                            <li className="nav-page"><a href="index.html">Home</a></li>
                            <li className="nav-page"><a href="game.html">Game</a></li>
                            <li className="nav-page"><a href="#">Sign in</a></li>
                        </ul>
                    </div>
                </nav>
            </header>
            <div className="banner">
                <img src={props.song.backgroundBanner} alt={props.song.artist} />
            </div>
            <main>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 py-2">
                            <section>
                                <div className="card">
                                    <img src={props.song.albumCover} className="card-img-top album_img"
                                        alt={props.song.albumName} />
                                    <div className="card-body">
                                        <div className="row mb-3">
                                            <div className="col">
                                                <div className="ranks d-flex">
                                                    <p className="rank_text mr-2">Rank: {props.song.rank}</p>
                                                    <p className="rank_text mr-2">|</p>
                                                    <p className="rank_text">Score: {(props.song.totalScore / props.song.numRankings).toFixed(2)}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="info">
                                            <p className="info_label">Artist(s):</p>
                                            <p>{props.song.artist}</p>
                                            <p className="info_label">Album:</p>
                                            <p>{props.song.albumName}</p>
                                            <p className="info_label">Release date:</p>
                                            <p>{props.song.releaseDate}</p>
                                            <p className="info_label">Length:</p>
                                            <p>{props.song.length}</p>
                                            <p className="info_label">Songwriter(s):</p>
                                            <p>{props.song.songWriters}</p>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                        <div className="col-md-8 py-2">
                            <section>
                                <div className="card">
                                    <div className="card-body d-flex flex-column">
                                        <h1 className="song_title">{props.song.songName}</h1>
                                        <h2 className="lyrics_header">Lyrics</h2>
                                        <p>{props.song.lyrics}</p>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                    <div className="col-md-12 col-lg-4 py-2 px-lg-4">
                        <section>
                            <div className="recommendations">
                                <h3 className="recommendations_title">Recommendations</h3>
                                <div className="py-2">
                                    <div className="card">
                                        <a href="wonderland_song_page.html">
                                            <img className="album_img_recommendations" src="img/Treasure_EP_Final.png"
                                                alt="Ateez Treasure Episode Final album cover image" />
                                        </a>
                                        <div className="recommendation_text_area">
                                            <p> User1: If you love the cool vibes in Blackpink's Shutdown you
                                                should really try listening to Ateezs' Wonderland! It has the same really cool vibes for
                                                a boy band.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="py-2">
                                    <div className="card">
                                        <a href="dumb_litty_song_page.html">
                                            <img className="album_img_recommendations" src="img/Dumb_Litty.jpg"
                                                alt="KARD Dumb Litty album cover image" />
                                        </a>
                                        <div className="recommendation_text_area">
                                            <p> User2: Kard's Dumb Litty has similar vibes if you want to try a
                                                co-ed Kpop group.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="recommendation_form">
                                    <h4>Enter your recommendation:</h4>
                                    <div>
                                        <button className="button" type="button" aria-label="Choose a Song"><i
                                            className="fa-solid fa-plus"></i> Choose a song</button>
                                    </div>
                                    <form className="form" action="#" method="post">
                                        <label for="recommendation"></label>
                                        <textarea id="recommendation" name="recommendation" required
                                            placeholder="Type your recommendation here..."></textarea>
                                    </form>
                                    <div>
                                        <input className="button" type="submit" value="Submit" aria-label="Submit Recommendation" />
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
            <footer className="mt-auto">
                <div className="container">
                    <p>&copy; 2024 Mango Music</p>
                </div>
            </footer>
        </body>

    )
}

export default SongPage;
