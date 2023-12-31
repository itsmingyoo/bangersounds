import React from "react";
import { BiRepost } from "react-icons/bi";
import { FaComment } from "react-icons/fa";
import { IoPlaySharp } from "react-icons/io5";
import LikeButton from "../../LikeButton";
import RepostButton from "../../RepostButton";

const LikesTitle = ({ s, user, userLikes }) => {
  const isRepost = Object.keys(s.reposts).includes(user.id.toString());

  return (
    <div id="likes-title__container">
      <div>{s.artistInfo.displayName}</div>
      <div>{s.title}</div>
      <div id="likes__nav-bar">
        <span>
          <IoPlaySharp /> 1.1m
        </span>
        <span>
          <LikeButton song={s} user={user} isLiked={true} />{" "}
          {Object.values(s.likes).length}
        </span>
        <span>
          {/* <BiRepost /> {Object.values(s.reposts).length} */}
          <RepostButton song={s} user={user} isRepost={isRepost} />{" "}
          {Object.values(s.reposts).length}
        </span>
        <span>
          <FaComment /> {s.comments.length}
        </span>
      </div>
    </div>
  );
};

export default LikesTitle;
