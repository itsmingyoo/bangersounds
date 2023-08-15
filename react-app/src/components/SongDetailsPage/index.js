import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import DropDown from "../DropDown";
import { setPlayingState, playUserSongAction } from "../../store/songs";
import addToQueue from "../../images/AddToQueue.ico";
import "./SongDetailsPage.css";
import PlayContent from "./PlayContent";
import WaveForm from "./WaveForm";
import ProfilePicture from "./ProfilePicture";

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
        {/* TOP MAIN - MEDIA PLAYER AND SONG CONTENT */}
        {/* make left side one component and right side one component */}
        <div id="song-details__top-container">
          {/* Left side = Song Content at the top, and waveforms at the bottom */}
          <div id="song-details__left-side">
            <PlayContent {...{ song, songs, isPlayingState, currentlyPlaying, togglePlayPause }} />
            <WaveForm />
          </div>
          <ProfilePicture {...{ song, songs, isPlayingState, currentlyPlaying, togglePlayPause }} />
        </div>

        {/* BOT MAIN - COMMENTS AND SONG NAV BAR AND SUGGESTIONS SIDE BAR*/}
        <div id="song-details__bot-container">
          <div>
            <div>
              {/* COMMENT INPUT BOX & LIKE/REPOST/SHARE/DELETE NAV BAR */}
              <input type="text" placeholder="Make a comment here" />
              <div id="song-details__nav-bar">
                <div id="song-details__nav-bar-buttons">
                  <button>Like</button>
                  <button>Reposted</button>
                  <button>Share</button>
                  <button>Copy Link</button>
                  {/* <button>More</button> */}
                  <DropDown
                    iconClassName={addToQueue}
                    list={list}
                    songId={songId}
                    isUserSong={isUserSong}
                    user={user}
                    isClassName={false}
                  />
                  <button>Free Download</button>
                </div>
                <div id="song-details__stats">
                  <span>1 Play(s)</span>
                  <span>1 Like(s)</span>
                  <span>1 Repost(s)</span>
                </div>
              </div>
            </div>
            {/* SONG DESCRIPTION AND ADS & COMMENTS SECTION */}
            <div id="song-details__description-comments">
              <div>Song Description Here with Ads</div>
              <div>All comments on this song will show here</div>
            </div>
          </div>

          {/* RELATED TRACKS AND SUGGESTIONS SIDE BAR */}
          <div id="song-details__side-bar">
            Side Barrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr
          </div>
        </div>
      </div>
    </div>
  );
}

export default SongDetailsPage;
