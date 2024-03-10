import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import KpopGame from './components/KpopGame.js';
import SongList from './components/SongList.js';
import SongPage from './components/SongPage.js';
import NavBar from './components/NavBar.js';
import Footer from './components/Footer.js';
import SignInPage from './components/SignInPage.js';

function App(props) {
  const [currentUser, setCurrentUser] = useState(props.userData[0]);

  const navigateTo = useNavigate();

  function loginUser(user) {
    setCurrentUser(user);
    navigateTo('/');
  }

  return (
    <div className="App">
      <NavBar />
      <Routes>
          <Route path="/" element={<SongList songs={props.songData} currentUser={currentUser}/>} />
          <Route path="/game" element={<KpopGame songs={props.songData} />} />
          <Route path="/signin" element={<SignInPage users={props.userData} currentUser={currentUser} loginCallback={loginUser}/>} />
          <Route path="/songs/:songKey" element={<SongPage songs={props.songData} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      <Footer />
    </div>
  );
}

export default App;