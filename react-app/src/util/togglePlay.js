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
