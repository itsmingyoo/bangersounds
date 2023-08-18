import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { thunkDeleteComment } from "../../store/songs";

const LatestComments = ({ user, userComments }) => {
  const dispatch = useDispatch();
  const [hoveredStates, setHoveredStates] = useState(Array(userComments.length).fill(false));

  const handleDelete = (c) => {
    dispatch(thunkDeleteComment(c.songId, c.id));
  };

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
    <div>
      <div>
        <div>(comment icon) Latest Comments</div>
        <div>
          <NavLink to="/profile/comments" style={{ cursor: "pointer" }}>
            View All
          </NavLink>
        </div>
      </div>
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
            return (
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
            );
          })}
      </div>
      <div>on (song.name) "user's comment"</div>
      <div>time ago</div>
    </div>
  );
};

export default LatestComments;
