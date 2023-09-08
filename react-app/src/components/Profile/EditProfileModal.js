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
  const [submittedForm, setSubmittedForm] = useState(false);
  const [errors, setErrors] = useState({});

  console.log(userRef);

  const onSubmit = async (e) => {
    e.preventDefault();
    // VALIDATORS
    setSubmittedForm(true);

    // Error Handlers for Frontend
    const errObj = {};
    // Add error handlers below

    if (fn.length > 32) errObj.fn = "First name can be up to 32 characters";
    if (ln.length > 32) errObj.ln = "Last name can be up to 32 characters";
    if (dn.length > 32) errObj.dn = "Display name can be up to 32 characters";
    if (city.length > 32) errObj.city = "City can be up to 32 characters";
    if (country.length > 32) errObj.country = "Country can be up to 32 characters";
    if (bio.length > 400) errObj.bio = "Bio can be up to 400 characters";

    // ALSO ADD AWS S3 FOR PFP & PF BG

    const formData = {
      first_name: fn,
      last_name: ln,
      display_name: dn,
      profile_city: city,
      profile_country: country,
      profile_bio: bio,
    };

    if (Object.values(errObj).length > 0) {
      setSubmittedForm(false);
      return setErrors(errObj);
    }

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
            {submittedForm && errors.dn && <div className="errors">{errors.dn}</div>}
          </div>
          <div>
            <div>First name</div>
            <input
              type="text"
              placeholder="prepopulate unless no fn"
              value={fn}
              onChange={(e) => setFn(e.target.value)}
            />
            {submittedForm && errors.fn && <div className="errors">{errors.fn}</div>}
            <div>Last name</div>
            <input
              type="text"
              placeholder="prepopulate unless no ln"
              value={ln}
              onChange={(e) => setLn(e.target.value)}
            />
            {submittedForm && errors.ln && <div className="errors">{errors.ln}</div>}
          </div>
          <div>
            <div>City</div>
            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
            {submittedForm && errors.city && <div className="errors">{errors.city}</div>}
            <div>Country</div>
            <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} />
            {submittedForm && errors.country && <div className="errors">{errors.country}</div>}
          </div>
          <div>
            <div>Bio</div>
            <textarea
              type="text"
              placeholder="Tell the world a little about yourself. The shorter the better."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
            {submittedForm && errors.bio && <div className="errors">{errors.bio}</div>}
          </div>
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
