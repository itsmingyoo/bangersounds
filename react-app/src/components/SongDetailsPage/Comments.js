import React, { useEffect, useState } from "react";
import { thunkDeleteComment } from "../../store/songs";

const CommentBox = ({ song, songs, isPlayingState, currentlyPlaying, togglePlayPause, comments, user, dispatch }) => {
  let allComments = Object.values(comments);
  let songComments = allComments.filter((s) => song.id === s.songId);

  // Give each index of the songComments its own local state so it wont apply to all the mapped elements
  const [hoveredStates, setHoveredStates] = useState(Array(songComments.length).fill(false));

  // console.log("is user comment", isUserComment);
  const handleDelete = (c) => {
    dispatch(thunkDeleteComment(song.id, c.id));
  };

  // When mouse enters the div, we update the states (like in the reducer), then set the state of the element's current index to be true
  const handleMouseEnter = (index) => {
    const updatedHoveredStates = [...hoveredStates];
    updatedHoveredStates[index] = true;
    setHoveredStates(updatedHoveredStates);
  };

  // Same logic here, but when mouse leaves, we set the state to false
  const handleMouseLeave = (index) => {
    const updatedHoveredStates = [...hoveredStates];
    updatedHoveredStates[index] = false;
    setHoveredStates(updatedHoveredStates);
  };

  useEffect(() => {
    console.log("true", hoveredStates);
    console.log("false", hoveredStates);
  });

  // CONTEXT - MAPPING THROUGH EACH COMMENT, EXTRACTING COMMENT AND INDEX - INDEX IS USED FOR MANAGING EACH ELEMENT'S LOCAL STATE WHICH IS DEFINED ASS AN ARRAY
  return (
    <div id="user-comment__main">
      {/* order by most recent comment */}
      {songComments.reverse().map((c, index) => {
        // Create Current Date
        let currentDate = new Date(); //.toString().split(" ");
        // console.log("currentDate", currentDate); // idx 4 is time (hh:mm:ss)

        // Modify CreatedAt to be the same format as the currentDate
        let commentDate = new Date(c.createdAt); //.toString().split(" "); // idx 4
        // console.log("commentDate", commentDate);

        // Calculate difference and convert from milliseconds to seconds by dividing by 1000
        const timeDifference = Math.floor((currentDate - commentDate) / 1000);
        // console.log(timeDifference); // seconds

        // Create a "time since comment was posted"
        let timeAgoString = "";
        if (timeDifference < 60) {
          timeAgoString = `${timeDifference} seconds ago`;
        } else if (timeDifference < 3600) {
          const minutes = Math.floor(timeDifference / 60);
          timeAgoString = `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
        } else if (timeDifference < 86400) {
          const hours = Math.floor(timeDifference / 3600);
          timeAgoString = `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
        } else if (timeDifference < 2592000) {
          const days = Math.floor(timeDifference / 86400);
          timeAgoString = `${days} ${days === 1 ? "day" : "days"} ago`;
        } else {
          const months = Math.floor(timeDifference / 2592000);
          timeAgoString = `${months} ${months === 1 ? "month" : "months"} ago`;
        }
        return (
          <>
            <div
              id="user-comment__container"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              <div>
                <div key={c.id} className="user-displayname">
                  {c.user.displayName}
                </div>
                <div className="user-comment">{c.comment}</div>
              </div>
              <div id="user-time-delete">
                <div className={`user-comment__date ${hoveredStates[index] ? "display-comment-date" : ""}`}>
                  {timeAgoString}
                </div>
                {user && c.userId === user.id && hoveredStates[index] && (
                  <button
                    onClick={() => handleDelete(c)}
                    className={`user-delete ${hoveredStates[index] ? "display-comment-date" : ""}`}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default CommentBox;
