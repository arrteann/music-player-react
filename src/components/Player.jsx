import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";
// import { audioPlayer } from "../utils";

const Player = ({
  currentSong,
  setCurrentSong,
  isPlaying,
  setIsPlaying,
  audioRef,
  songInfo,
  setSongInfo,
  songs,
  setSongs,
}) => {
  // Active Library Song
  const activeLibrary = (nextPrev) => {
    const songsActivate = songs.map((singleSong) => {
      if (singleSong.id === nextPrev.id) {
        return {
          ...singleSong,
          active: true,
        };
      } else {
        return {
          ...singleSong,
          active: false,
        };
      }
    });
    setSongs(songsActivate);
  };
  // Event Handler
  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  const dragHandler = (event) => {
    audioRef.current.currentTime = event.target.value;
    setSongInfo({ ...songInfo, currentTime: event.target.value });
  };

  const skipHandler = async (direction) => {
    const currentSongIndex = songs.findIndex(
      (song) => song.id === currentSong.id
    );
    if (direction === "skip-forward") {
      const forwardIndex = (currentSongIndex + 1) % songs.length;
      await setCurrentSong(songs[forwardIndex]);
      await activeLibrary(songs[forwardIndex]);
    } else if (direction === "skip-back") {
      const backIndex = (currentSongIndex - 1) % songs.length;
      if (backIndex === -1) {
        await setCurrentSong(songs[songs.length - 1]);
        await activeLibrary(songs[backIndex]);
        if (isPlaying) audioRef.current.play();
        return;
      }
      await setCurrentSong(songs[backIndex]);
      await activeLibrary(songs[backIndex]);
    }
    if (isPlaying) audioRef.current.play();
  };

  // Track Styles
  const animatedTrackStyle = {
    transform: `translateX(${songInfo.animatePercentage}%)`,
  };
  const TrackStyle = {
    background: `linear-gradient(to right,${currentSong.color[0]}, ${currentSong.color[1]})`,
  };
  return (
    <div className="player-container">
      {/* TIME CONTROL */}
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <div style={TrackStyle} className="track">
          <input
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            onChange={dragHandler}
            type="range"
          />
          <div style={animatedTrackStyle} className="animated-track"></div>
        </div>
        <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
      </div>

      {/* PLAYER CONTROL */}
      <div className="play-control">
        <FontAwesomeIcon
          onClick={() => skipHandler("skip-back")}
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
        />
        <FontAwesomeIcon
          className="play"
          onClick={playSongHandler}
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          onClick={() => skipHandler("skip-forward")}
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
        />
      </div>
    </div>
  );
};

export default Player;
