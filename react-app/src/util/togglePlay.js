// Global States in Store
import { setPlayingState, playUserSongAction } from "../store/songs";

export const togglePlayPause = async (
  song,
  dispatch,
  currentlyPlaying,
  isPlayingState
) => {
  dispatch(playUserSongAction(song));

  if (currentlyPlaying) {
    if (currentlyPlaying.id === song.id) {
      dispatch(setPlayingState(!isPlayingState));
    } else {
      dispatch(setPlayingState(true));
    }
  }
};

// export const togglePlayPause = (
//   song,
//   dispatch,
//   currentlyPlaying,
//   isPlayingState
// ) => {
//   // if its the same song, pause it
//   if (currentlyPlaying && currentlyPlaying.id === song.id) {
//     dispatch(setPlayingState(!isPlayingState));
//   }
//   // else play song
//   else {
//     dispatch(playUserSongAction(song));
//     dispatch(setPlayingState(true));
//   }
// };
