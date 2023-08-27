import React from "react";
import { BiRepost } from "react-icons/bi";
import { FaComment } from "react-icons/fa";
import LikeButton from "../../LikeButton";
import RepostButton from "../../RepostButton";

const LikesTitle = ({ s, user, userLikes }) => {
  const isRepost = Object.keys(s.reposts).includes(user.id.toString());
  console.log("isrepost true or false", isRepost);
  return (
    <div id="likes-title__container">
      <div>{s.artistInfo.displayName}</div>
      <div>{s.title}</div>
      <div id="likes__nav-bar">
        <span>#Plays</span>
        <span>
          <LikeButton song={s} user={user} isLiked={true} /> {Object.values(s.likes).length}
        </span>
        <span>
          {/* <BiRepost /> {Object.values(s.reposts).length} */}
          <RepostButton song={s} user={user} isRepost={isRepost} /> {Object.values(s.reposts).length}
        </span>
        <span>
          <FaComment /> {s.comments.length}
        </span>
      </div>
    </div>
  );
};

export default LikesTitle;
