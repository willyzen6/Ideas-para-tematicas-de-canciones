import './App.css';
import React, { useState, useEffect } from "react";
import ideas from "./ideas";
import useSound from 'use-sound';
import 'font-awesome/css/font-awesome.min.css';
import Typewriter from "typewriter-effect";
import baner from './baner.png';

function App() {
  const getRandomIdea = () => {
    const randomIndex = Math.floor(Math.random() * ideas.length);
    return ideas[randomIndex];
  };

  const [currentIdea, setCurrentIdea] = useState("");
  const handleClick = () => {
    setCurrentIdea(getRandomIdea());
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(currentIdea);
  };

  const [play, { stop }] = useSound(`${process.env.PUBLIC_URL}/typewriterrr.mp3`, { volume: 0.5 });

  const IdeaDisplay = ({ text }) => (
    <div className="idea-text" style={{
      maxWidth: '40%',
      margin: '0 auto',
    }}>
      <Typewriter
        onInit={(typewriter) => {
          play();
          typewriter
            .typeString(text)
            .callFunction(() => {
              stop();
            })
            .start();
        }}
        options={{
          autoStart: true,
          delay: 20,
          deleteSpeed: Infinity,
        }}
      />
    </div>
  );

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
  };

  const buttonStyle = {
    marginTop: "2rem",
    fontSize: "2rem",
    borderRadius: "10px",
    border: "2px solid lightgray",
    cursor: "pointer"
  };

  return (
    <div style={containerStyle} className="gradient-background" onClick={handleClick}>
      <h1>Click para obtener una Tematica</h1>
      {currentIdea && <IdeaDisplay text={currentIdea} />}
      {currentIdea && (
        <button style={buttonStyle} onClick={handleCopy}>
          <i className="fa fa-clipboard" aria-hidden="true"></i>
        </button>,
        <a href="https://open.spotify.com/artist/4UAk2bBGHOxm2PjC83m0gO?si=H_9GoD6tTGyFLiDOdDuZbg" target="_blank" rel="noopener noreferrer">
        <img className="imgs" src={baner} alt="Baner" />
      </a>
      )}
    </div>
    
  );
}

export default App;