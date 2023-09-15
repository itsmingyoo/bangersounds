// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { IoPlaySharp, IoPauseSharp } from "react-icons/io5";
// import { playUserSongAction, setPlayingState } from "../../store/songs";
// import "./AudioContext.css";

// const SongProvider = ({ song }) => {
//   const dispatch = useDispatch();

//   // Local State
//   const [isPlaying, setIsPlaying] = useState(false);

//   // Store States
//   const isPlayingState = useSelector((s) => s.songs.isPlayingState);
//   const currentSong = useSelector((s) => s.songs.CurrentlyPlaying);

//   useEffect(() => {

//   });

//   // Btn Func
//   const togglePlayPause = async () => {
//     setIsPlaying((prev) => !prev);
//     await dispatch(playUserSongAction(song));
//     await dispatch(setPlayingState(!isPlaying));
//   };

//   // if (!isPlayingState) return null;

//   return (
//     <button onClick={togglePlayPause} className="orange-btn-white-txt play-btn">
//       {isPlaying ? <IoPauseSharp /> : <IoPlaySharp />}
//     </button>
//   );
// };

// export default SongProvider;
