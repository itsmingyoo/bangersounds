import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setPlayingState, playUserSongAction } from "../../store/songs";
import PlayContent from "./PlayContent";
import WaveForm from "./WaveForm";
import ProfilePicture from "./ProfilePicture";
import SongStats from "./SongStatsNavBar";
import AddComment from "./AddComment";
import Thumbnail from "./Thumbnail";
import "./SongDetailsPage.css";

function SongDetailsPage({ songs, isPlayingState, currentlyPlaying }) {
  const { songId } = useParams();
  const dispatch = useDispatch();
  const song = useSelector((s) => s.songs.Songs[Number(songId)]);
  const user = useSelector((u) => u.session.user);
  const isUserSong = song?.artistId === user?.id;

  if (!song) return null;

  const togglePlayPause = async (song) => {
    dispatch(playUserSongAction(song));
    if (currentlyPlaying) {
      if (currentlyPlaying.id === song.id) dispatch(setPlayingState(!isPlayingState));
      else dispatch(setPlayingState(true));
    }
  };

  const list = [
    { name: "Add to Next Up", to: "#" },
    { name: "Add to Playlist", to: "#" },
    { name: "Station", to: "#" },
    { name: "Report", to: "#" },
  ];
  return (
    <div id="song-details__wrapper">
      <div id="song-detail__main-container">
        <div id="song-details__top-container">
          <div id="song-details__left-side">
            <PlayContent {...{ song, songs, isPlayingState, currentlyPlaying, togglePlayPause }} />
            <WaveForm />
          </div>
          <Thumbnail {...{ song, songs, isPlayingState, currentlyPlaying, togglePlayPause }} />
        </div>

        <div id="song-details__bot-wrapper">
          <div id="song-details__bot-container">
            <div id="song-details__song-stats-container">
              <ProfilePicture song={song} />
              <AddComment song={song} />
            </div>
            <SongStats {...{ song, songId, isUserSong, user }} />
            {/* SONG DESCRIPTION AND ADS & COMMENTS SECTION */}
            <div id="song-details__description-comments">
              <div>Song Description Here with Ads</div>
              <div>All comments on this song will show here</div>
            </div>
          </div>

          <div id="song-details__side-bar">
            INSERT REUSABLE CONTENT HERE FOR BLOCK OF 'RELATED TRACKS', 'SUGGESTIONS'
          </div>
        </div>
      </div>
    </div>
  );
}

export default SongDetailsPage;
