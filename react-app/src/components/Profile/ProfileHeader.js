import React from "react";
import ProfilePicture from "../SongDetailsPage/ProfilePicture";
import WaveForm from "../SongDetailsPage/WaveForm";

const ProfileHeader = ({ user }) => {
  // console.log(user);
  return (
    <div className="profile-header-container">
      <div className="profile-header-wrapper" style={{ height: "380px" }}>
        {/* LINEAR-GRADIENT DEFAULT BG */}
        <div style={{ height: "100%" }}>
          {user.profileBackground === "" ? (
            <div className="profile-linear-gradient" style={{ height: "100%" }}>
              <div className="profile-linear-gradient-buffer backgroundGradient-hidden"></div>
              <div
                className="profile-linear-gradient-buffer"
                style={{ background: "linear-gradient(135deg, rgb(132, 122, 145) 0%, rgb(36, 42, 46) 100%)" }}
              ></div>
              LINEAR GRADIENT BG
            </div>
          ) : (
            <img src={user.profileBackground} alt="bgpicture" />
          )}
        </div>
        <div className="profile-header-user-info-wrapper">
          <div className="profile-header-picture">
            <ProfilePicture user={user} />
          </div>
          <div className="profile-header-user-info">
            <div>{user.displayName}</div>
            <div>
              {user.firstName} {user.lastName}
            </div>
            <div>
              {user.profileCity} {user.profileCountry}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;