import React from "react";
import { audioPlayer } from "../utils";

const LibrarySong = ({
  song,
  songs,
  setCurrentSong,
  setSongs,
  audioRef,
  isPlaying,
}) => {
  const SongSelectHandler = () => {
    const selectedSong = songs.filter((state) => state.id === song.id);
    setCurrentSong(selectedSong[0]);

    // Set Songs Activate State
    const songsActivate = songs.map((singleSong) => {
      if (singleSong.id === song.id) {
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

    audioPlayer(isPlaying, audioRef)
  };

  return (
    <div
      onClick={SongSelectHandler}
      className={`library-song ${song.active ? "selected" : ""}`}
    >
      <img alt={song.name} src={song.cover} />
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
