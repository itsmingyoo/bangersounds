import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./SongDetailsPage.css";

function SongDetailsPage() {
  const { songId } = useParams();
  const song = useSelector((s) => s.songs.Songs[Number(songId)]);
  console.log(song);
  if (!song) return null;
  return (
    <>
      {/* TOP MAIN - MEDIA PLAYER AND SONG CONTENT */}
      <div id="song-details__main-container">
        {/* Left side = Song Content at the top, and waveforms at the bottom */}
        <div id="song-details__left-side">
          {/* top = song content */}
          <div>
            <button>Play/Pause</button>
            <div id="song-details__content">
              <span>{song.title}</span>
              <span>{song.artistInfo.displayName}</span>
              <span>(Album PIC) In album: 'ALBUM NAME'</span>
            </div>
          </div>

          {/* bottom = waveform */}
          <div>imagine this was a waveform</div>
        </div>

        {/* Right side = PFP */}
        <div id="song-details__right-side">Profile Picture</div>
      </div>

      {/* BOT MAIN - COMMENTS AND SONG NAV BAR AND SUGGESTIONS SIDE BAR*/}
      <div>
        {/* COMMENT INPUT BOX & LIKE/REPOST/SHARE/DELETE NAV BAR */}
        <div>
          <input type="text" placeholder="Make a comment here" />
          <div id="song-details__nav-bar">
            <div id="song-details__nav-bar-buttons">
              <button>Like</button>
              <button>Reposted</button>
              <button>Share</button>
              <button>Copy Link</button>
              <button>More</button>
              <button>Free Download</button>
            </div>
            <div id="song-details__stats">
              <span>1 Play(s)</span>
              <span>1 Like(s)</span>
              <span>1 Repost(s)</span>
            </div>
          </div>
        </div>

        {/* RELATED TRACKS AND SUGGESTIONS SIDE BAR */}
        <div></div>
      </div>
    </>
  );
}

export default SongDetailsPage;
