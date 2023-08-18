import React from "react";
import ProfilePicture from "../SongDetailsPage/ProfilePicture";

const Profile = ({ user }) => {
  console.log(user);
  return (
    <div>
      <div>
        <ProfilePicture user={user} />
      </div>
      <div>
        <div>{user.displayName}</div>
        <div>
          {user.firstName} {user.lastName}
        </div>
        <div>
          {user.profileCity} {user.profileCountry}
        </div>
      </div>
      <div>
        {user.profileBackground === "" ? (
          <div
            style={{
              background: "linear-gradient(135deg, rgb(89, 89, 150) 0%, rgb(11, 11, 15) 100%)",
              height: "100%",
              width: "100%",
            }}
          >
            LINEAR GRADIENT BG
          </div>
        ) : (
          <img src={user.profileBackground} alt="bgpicture" />
        )}
      </div>
    </div>
  );
};

export default Profile;
