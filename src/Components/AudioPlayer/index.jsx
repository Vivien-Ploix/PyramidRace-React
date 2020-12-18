import "./style.scss";
import React from "react";
import { useAudioPlayer } from "react-use-audio-player";

const AudioPlayer = ({ file }) => {
  const { togglePlayPause, ready, loading, playing } = useAudioPlayer({
    src: file,
    format: "mp3",
    autoplay: true,
    onend: () => console.log("sound has ended!"),
  });

  // if (!ready && !loading) return <div>No audio to play</div>;
  // if (loading) return <div>Loading audio</div>;

  return (
    <div className="audio-button" onClick={togglePlayPause}>
      {playing ? (
        <i className="fas fa-pause"></i>
      ) : (
        <i className="fas fa-play"></i>
      )}
    </div>
  );
};

export default AudioPlayer;
