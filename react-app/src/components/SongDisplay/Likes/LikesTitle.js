import React from "react";
import { BiRepost } from "react-icons/bi";
import { IoHeartSharp, IoShareOutline, IoLinkSharp, IoEllipsisHorizontalSharp } from "react-icons/io5";
import { FaComment } from "react-icons/fa";

const LikesTitle = ({ s, userLikes }) => {
  console.log("userlikes info", s);
  return (
    <div id="likes-title__container">
      <div>{s.artistInfo.displayName}</div>
      <div>{s.title}</div>
      <div id="likes__nav-bar">
        <span>#Plays</span>
        <span>
          <IoHeartSharp /> {Object.values(s.likes).length}
        </span>
        <span>
          <BiRepost /> {Object.values(s.reposts).length}
        </span>
        <span>
          <FaComment /> {s.comments.length}
        </span>
      </div>
    </div>
  );
};

export default LikesTitle;
