import React from "react";

const LibrarySong = ({
  song,
  songs,
  setCurrentSong,
  setSongs,
  audioRef,
  isPlaying,
}) => {
  const SongSelectHandler = async () => {
    const selectedSong = songs.filter((state) => state.id === song.id);
    await setCurrentSong(selectedSong[0]);

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
    await setSongs(songsActivate);

    if (isPlaying) audioRef.current.play();
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
