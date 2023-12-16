import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setPlayingState, playUserSongAction } from "../../store/songs";
import PlayContent from "./PlayContent";
import WaveForm from "./WaveForm";
import ProfilePicture from "./ProfilePicture";
import SongStats from "./SongStatsNavBar";
import AddComment from "./AddComment";
import Thumbnail from "./Thumbnail";
import CommentBox from "./Comments";
import { thunkGetSongComments } from "../../store/songs";
import "./SongDetailsPage.css";

function SongDetailsPage() {
  let { songId } = useParams();
  const dispatch = useDispatch();
  const songs = useSelector((s) => Object.values(s.songs.Songs));
  const isPlayingState = useSelector((s) => s.songs.isPlaying);
  const currentlyPlaying = useSelector((s) => s.songs.CurrentlyPlaying);
  const previousSong = useSelector((s) => s.songs.PreviousSong);
  const song = useSelector((s) => s.songs.Songs[Number(songId)]);
  const comments = song.comments;
  const user = useSelector((u) => u.session.user);
  const isUserSong = song?.artistId === user?.id;

  songId = Number(songId);

  if (!song) return null;

  const togglePlayPause = async (song) => {
    dispatch(playUserSongAction(song));
    if (currentlyPlaying) {
      if (currentlyPlaying.id === song.id)
        dispatch(setPlayingState(!isPlayingState));
      else dispatch(setPlayingState(true));
    }
  };

  return (
    <div id="song-details__wrapper">
      <div id="song-detail__main-container">
        <div id="song-details__top-container">
          <div id="song-details__left-side">
            <PlayContent
              {...{
                song,
                songs,
                isPlayingState,
                currentlyPlaying,
                togglePlayPause,
                comments,
              }}
            />
            <WaveForm />
          </div>
          <Thumbnail
            {...{
              song,
              songs,
              isPlayingState,
              currentlyPlaying,
              togglePlayPause,
              comments,
            }}
          />
        </div>

        <div id="song-details__bot-wrapper">
          <div id="song-details__bot-container">
            <div id="song-details__song-stats-container">
              <ProfilePicture
                {...{
                  user,
                  song,
                  songs,
                  isPlayingState,
                  currentlyPlaying,
                  togglePlayPause,
                  comments,
                }}
              />
              <AddComment
                {...{
                  song,
                  songs,
                  isPlayingState,
                  currentlyPlaying,
                  togglePlayPause,
                  comments,
                }}
              />
            </div>
            <SongStats
              {...{
                song,
                songs,
                isPlayingState,
                currentlyPlaying,
                togglePlayPause,
                comments,
                songId,
                isUserSong,
                user,
              }}
            />
            {/* SONG DESCRIPTION AND ADS & COMMENTS SECTION */}
            <div id="song-details__description-comments">
              <div>{song.description}</div>
              <CommentBox
                {...{
                  song,
                  songs,
                  isPlayingState,
                  currentlyPlaying,
                  togglePlayPause,
                  comments,
                  user,
                  dispatch,
                }}
              />
            </div>
          </div>

          {/* <div id="song-details__side-bar">
            INSERT REUSABLE CONTENT HERE FOR BLOCK OF 'RELATED TRACKS', 'SUGGESTIONS'
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default SongDetailsPage;
