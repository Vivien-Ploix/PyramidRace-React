import "./style.scss";
import React from "react";
import { useAudioPlayer } from "react-use-audio-player";
import Play from "./assets/play.png";
import Stop from "./assets/pause.png";

const AudioPlayer = ({ file }) => {
  const { togglePlayPause, ready, loading, playing } = useAudioPlayer({
    src: file,
    format: "mp3",
    autoplay: true,
    onend: () => console.log("sound has ended!"),
    volume: 0.1,
  });

  return (
    <div className="audio-button" onClick={togglePlayPause}>
      {playing ? <img src={Stop} /> : <img src={Play} />}
    </div>
  );
};

export default AudioPlayer;
