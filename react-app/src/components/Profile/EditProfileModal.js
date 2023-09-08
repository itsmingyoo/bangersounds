import React, { useState, useRef, useEffect } from "react";
import { setUser } from "../../store/session";
import { useDispatch } from "react-redux";

const EditProfileModal = ({ userRef, closeModal }) => {
  const dispatch = useDispatch();

  const [dn, setDn] = useState(userRef.current.displayName ?? "");
  const [fn, setFn] = useState(userRef.current.firstName ?? "");
  const [ln, setLn] = useState(userRef.current.lastName ?? "");
  const [city, setCity] = useState(userRef.current.profileCity ?? "");
  const [country, setCountry] = useState(userRef.current.profileCountry ?? "");
  const [bio, setBio] = useState(userRef.current.profileBio ?? "");

  console.log(userRef);

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      first_name: fn,
      last_name: ln,
      display_name: dn,
      profile_city: city,
      profile_country: country,
      profile_bio: bio,
    };
    try {
      let update = await fetch(`/api/profile/${userRef.current.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      update = await update.json();
      console.log(update);
      await dispatch(setUser(update.user));
      closeModal();
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
