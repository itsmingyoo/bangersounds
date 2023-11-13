import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import WaveSurfer from "wavesurfer.js";
// import styled from "styled-components";
import { FaPlayCircle, FaPauseCircle } from "react-icons/fa";
import "./Waveforms.css";

const Waveform = ({ audio }) => {
  const isPlayingState = useSelector((s) => s.songs.isPlaying);
  const containerRef = useRef();
  const waveSurferRef = useRef({
    isPlaying: () => false,
  });
  const [isPlaying, toggleIsPlaying] = useState(false);
  console.log("containerRef", containerRef);
  console.log("waveSurferRef", waveSurferRef);

  useEffect(() => {
    const waveSurfer = WaveSurfer.create({
      container: containerRef.current,
      barWidth: 2,
      barHeight: 0.5,
      cursorWidth: 0,
      waveColor: "#666666",
      progressColor: "#f50f50",
      height: 150,
      barGap: 1,
    });
    waveSurfer.load(audio);
    waveSurfer.on("ready", () => {
      waveSurferRef.current = waveSurfer;
    });

    return () => {
      waveSurfer.destroy();
    };
  }, [audio]);

  return (
    <div id="waveform-container">
      <button
        onClick={() => {
          waveSurferRef.current.playPause();
          toggleIsPlaying(waveSurferRef.current.isPlaying());
        }}
        type="button"
        id="waveform-button"
      >
        {isPlaying ? <FaPauseCircle size="3em" /> : <FaPlayCircle size="3em" />}
      </button>
      <div ref={containerRef} />
    </div>
  );
};

Waveform.propTypes = {
  audio: PropTypes.string.isRequired,
};

export default Waveform;
