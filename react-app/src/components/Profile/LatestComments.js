import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { thunkDeleteComment } from "../../store/songs";
import { FaComment } from "react-icons/fa";

const LatestComments = ({ user, userComments, songs }) => {
  const dispatch = useDispatch();
  const [hoveredStates, setHoveredStates] = useState(Array(userComments.length).fill(false));

  const handleDelete = (c) => {
    dispatch(thunkDeleteComment(c.songId, c.id));
  };

  console.log("usercomments", [...userComments].reverse().slice(0, 3));

  // BUGGED CODE - WHEN THERE IS RAPID MOUSE MOVEMENTS OVER MULTIPLE DIVS THEY ARENT ABLE TO GRAB THE UPDATED STATE - SO WE NEED TO PASS A FUNCTION INTO THE SETHOVEREDSTATES
  // const handleMouseEnter = (index) => {
  //   const updatedHoveredStates = [...hoveredStates];
  //   updatedHoveredStates[index] = true;
  //   setHoveredStates(updatedHoveredStates);
  // };

  // const handleMouseLeave = (index) => {
  //   const updatedHoveredStates = [...hoveredStates];
  //   updatedHoveredStates[index] = false;
  //   setHoveredStates(updatedHoveredStates);
  // };

  // by using a function within setHoveredStates, you ensure that the function receives the latest state as its argument,so you dont end up using a stale state value when modifying the hoveredStates array - STILL BUGGY - BUT SOMEWHAT FIXES IT - IT SOMETIMES STILL OCCURS
  const handleMouseEnter = (index) => {
    setHoveredStates((prevStates) => {
      const updatedStates = [...prevStates];
      updatedStates[index] = true;
      return updatedStates;
    });
  };

  const handleMouseLeave = (index) => {
    setHoveredStates((prevStates) => {
      const updatedStates = [...prevStates];
      updatedStates[index] = false;
      return updatedStates;
    });
  };

  return (
    <div className="latest-comments__main-container">
      <div className="latest-comments-top">
        <div>
          <FaComment /> Latest Comments
        </div>
        <div>
          <NavLink to="/profile/comments" style={{ cursor: "pointer" }}>
            View All
          </NavLink>
        </div>
      </div>
      <div className="divider"></div>
      <div>
        {userComments
          ?.reverse()
          .slice(0, 3)
          .map((c, index) => {
            let currentDate = new Date();
            let commentDate = new Date(c.createdAt);
            const timeDifference = Math.floor((currentDate - commentDate) / 1000);
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
            const songInfo = songs.filter((s) => c.songId === s.id);
            console.log("songInfo", songInfo);
            return (
              <div
                id="user-comment__container2"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
              >
                <div>
                  <div key={c.id} className="user-displayname">
                    <a href={`/songs/${songInfo[0].id}`} id="song-comment-info">
                      on {songInfo[0].title}
                    </a>
                  </div>
                  <div className="user-comment">"{c.comment}"</div>
                </div>
                <div id="user-time-delete" className="user-time-delete">
                  <div
                    className={`user-comment__date ${hoveredStates[index] ? "hidden" : ""}`}
                    style={{ fontSize: "12px", width: "fit-content" }}
                  >
                    {timeAgoString}
                  </div>
                  {user && c.userId === user.id && hoveredStates[index] && (
                    <button
                      onClick={() => handleDelete(c)}
                      className={`user-delete user-delete2 ${hoveredStates[index] ? "display-comment-date" : ""}`}
                    >
                      <i class="fa-solid fas fa-trash" style={{ color: "#000000" }}></i>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default LatestComments;
