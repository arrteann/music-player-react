import React, { useState, useRef } from "react";

// Import Styles
import "./styles/app.scss";

// Import Components
import Player from "./components/Player";
import Song from "./components/Song";
import Nav from "./components/Nav";

// Import Data
import data from "./data";
import Library from "./components/Library";

function App() {
  // Audio Ref
  const audioRef = useRef(null);

  // States
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animatePercentage: 0,
  });
  const [libraryStatus, setLibraryStatus] = useState(false);

  // Event Handler
  const timeUpdateHandler = (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    const roundedCurrent = Math.round(currentTime);
    const roundedDuration = Math.round(duration);
    const animatePercentage = Math.round(
      (roundedCurrent / roundedDuration) * 100
    );
    setSongInfo({
      currentTime,
      duration,
      animatePercentage,
    });
  };

  const autoSkipHandler = async () => {
    const currentSongIndex = songs.findIndex(
      (song) => song.id === currentSong.id
    );
    const forwardIndex = (currentSongIndex + 1) % songs.length;
    await setCurrentSong(songs[forwardIndex]);
    if (isPlaying) audioRef.current.play(); 
    return;
  };

  return (
    <div className={`App ${libraryStatus ? "library-active" : ""} `}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} />
      <Player
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        audioRef={audioRef}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        songs={songs}
        setSongs={setSongs}
      />
      <Library
        songs={songs}
        setCurrentSong={setCurrentSong}
        setSongs={setSongs}
        audioRef={audioRef}
        isPlaying={isPlaying}
        libraryStatus={libraryStatus}
      />

      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        onEnded={autoSkipHandler}
        ref={audioRef}
        src={currentSong.audio}
      ></audio>
    </div>
  );
}

export default App;
