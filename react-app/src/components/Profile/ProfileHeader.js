import React from "react";
import { useSelector } from "react-redux";
import ProfilePicture from "../SongDetailsPage/ProfilePicture";
import WaveForm from "../SongDetailsPage/WaveForm";

const ProfileHeader = () => {
  const user = useSelector((s) => s.session.user);
  return (
    <div className="profile-header-container">
      <div className="profile-header-wrapper">
        {user.profileBackground === "" || user.profileBackground === null ? (
          <div style={{ height: "100%" }}>
            <div
              className="profile-linear-gradient"
              style={{ height: "240px" }}
            >
              <div className="profile-linear-gradient-buffer backgroundGradient-hidden"></div>
              <div
                className="profile-linear-gradient-buffer"
                style={{
                  background:
                    "linear-gradient(135deg, rgb(132, 122, 145) 0%, rgb(36, 42, 46) 100%)",
                }}
              ></div>
              <div
                className="profile-header-user-info-wrapper"
                style={{ zIndex: "999" }}
              >
                <div
                  className="profile-header-picture"
                  style={{ zIndex: "999" }}
                >
                  <ProfilePicture user={user} />
                </div>
                <div
                  className="profile-header-user-info"
                  style={{ zIndex: "999" }}
                >
                  <div>
                    {user.displayName === null
                      ? "Display Name"
                      : user.displayName}
                  </div>
                  <div>
                    {user.firstName ? user.firstName : "First Name"}{" "}
                    {user.lastName ? user.lastName : "Last Name"}
                  </div>
                  <div>
                    {user.profileCity ? user.profileCity : "City"},{" "}
                    {user.profileCountry ? user.profileCountry : "Country"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            className="profile-header-user-info-wrapper"
            style={{
              backgroundImage: `url(${user.profileBackground})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
            <div className="profile-header-picture">
              <ProfilePicture user={user} />
            </div>
            <div className="profile-header-user-info">
              <div>{user.displayName}</div>
              <div>
                {user.firstName} {user.lastName}
              </div>
              <div>
                {user.profileCity}, {user.profileCountry}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;
