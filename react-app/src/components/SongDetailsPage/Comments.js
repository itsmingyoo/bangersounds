import React from "react";
import { thunkDeleteComment } from "../../store/songs";

const CommentBox = ({ song, songs, isPlayingState, currentlyPlaying, togglePlayPause, comments, user, dispatch }) => {
  let allComments = Object.values(comments);
  let songComments = allComments.filter((s) => song.id === s.songId);

  // console.log("is user comment", isUserComment);
  const handleDelete = (c) => {
    dispatch(thunkDeleteComment(song.id, c.id));
  };

  return (
    <div id="user-comment__main">
      {songComments.map((c) => {
        // Create Current Date
        let currentDate = new Date(); //.toString().split(" ");
        console.log("currentDate", currentDate); // idx 4 is time (hh:mm:ss)

        // Modify CreatedAt to be the same format as the currentDate
        let commentDate = new Date(c.createdAt); //.toString().split(" "); // idx 4
        console.log("commentDate", commentDate);

        // Calculate difference and convert from milliseconds to seconds by dividing by 1000
        const timeDifference = Math.floor((currentDate - commentDate) / 1000);
        console.log(timeDifference); // seconds

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
            <div id="user-comment__container">
              <div>
                <div key={c.id} className="user-displayname">
                  {c.user.displayName}
                </div>
                <div className="user-comment">{c.comment}</div>
              </div>
              <div className="user-comment__date">{timeAgoString}</div>
            </div>
            {c.userId === user.id && <button onClick={() => handleDelete(c)}>Delete</button>}
          </>
        );
      })}
    </div>
  );
};

export default CommentBox;
