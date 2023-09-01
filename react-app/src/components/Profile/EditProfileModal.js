import React, { useState } from "react";
import { setUser } from "../../store/session";
import { useDispatch } from "react-redux";

const EditProfileModal = ({ user }) => {
  const dispatch = useDispatch();
  const [dn, setDn] = useState(user.displayName ?? "");
  const [fn, setFn] = useState(user.firstName ?? "");
  const [ln, setLn] = useState(user.lastName ?? "");
  const [city, setCity] = useState(user.profileCity ?? "");
  const [country, setCountry] = useState(user.profileCountry ?? "");
  const [bio, setBio] = useState(user.profileBio ?? "");

  console.log(user);

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      first_name: fn,
      last_name: ln,
      dislay_name: dn,
      profile_city: city,
      profile_country: country,
      profile_bio: bio,
    };
    try {
      let update = await fetch(`/api/profile/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      update = await update.json();
      console.log(update);
      await dispatch(setUser(update));
      return update;
    } catch (e) {
      return e;
    }
  };
  return (
    <div>
      <div>image</div>
      <div>
        <form onSubmit={onSubmit}>
          <div>
            <div>Display name*</div>
            <input
              type="text"
              placeholder="prepopulate unless no display name"
              value={dn}
              onChange={(e) => setDn(e.target.value)}
            />
          </div>
          <div>
            <div>First name</div>
            <input
              type="text"
              placeholder="prepopulate unless no fn"
              value={fn}
              onChange={(e) => setFn(e.target.value)}
            />
            <div>Last name</div>
            <input
              type="text"
              placeholder="prepopulate unless no ln"
              value={ln}
              onChange={(e) => setLn(e.target.value)}
            />
          </div>
          <div>
            <div>City</div>
            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
            <div>Country</div>
            <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} />
          </div>
          <div>
            <div>Bio</div>
            <textarea
              type="text"
              placeholder="Tell the world a little about yourself. The shorter the better."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
