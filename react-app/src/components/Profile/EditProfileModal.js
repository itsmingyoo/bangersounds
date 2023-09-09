import React, { useState, useRef, useEffect, useCallback } from "react";
import { setUser } from "../../store/session";
import { useDispatch } from "react-redux";
import Dropzone from "react-dropzone";

const EditProfileModal = ({ userRef, closeModal }) => {
  const dispatch = useDispatch();

  const [dn, setDn] = useState(userRef.current.displayName ?? "");
  const [fn, setFn] = useState(userRef.current.firstName ?? "");
  const [ln, setLn] = useState(userRef.current.lastName ?? "");
  const [city, setCity] = useState(userRef.current.profileCity ?? "");
  const [country, setCountry] = useState(userRef.current.profileCountry ?? "");
  const [bio, setBio] = useState(userRef.current.profileBio ?? "");
  const [pfp, setPfp] = useState(userRef.current.profileImage ?? null);
  const [bg, setBg] = useState(userRef.current.profileBackground ?? null);

  const [submittedForm, setSubmittedForm] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    console.log(pfp, bg);
  });

  // const onDropPfp = useCallback((acceptedFiles) => {
  //   const reader = new FileReader();

  //   reader.onload = function (e) {
  //     const pfpImage = acceptedFiles[0];
  //     setPfp(pfpImage);
  //   };

  //   reader.readAsDataURL(acceptedFiles[0]);
  // }, []);

  // const onDropBg = useCallback((acceptedFiles) => {
  //   const reader = new FileReader();

  //   reader.onload = function (e) {
  //     const bgImage = acceptedFiles[0];
  //     setBg(bgImage);
  //   };

  //   reader.readAsDataURL(acceptedFiles[0]);
  // }, []);

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

    if (Object.values(errObj).length > 0) {
      setSubmittedForm(false);
      return setErrors(errObj);
    }

    const formData = new FormData();
    formData.append("dislay_name", dn);
    formData.append("first_name", fn);
    formData.append("last_name", ln);
    formData.append("profile_city", city);
    formData.append("profile_country", city);
    formData.append("profile_bio", bio);
    formData.append("profile_image_aws", pfp);
    formData.append("profile_bg_image_aws", bg);

    try {
      let update = await fetch(`/api/profile/${userRef.current.id}`, {
        method: "PUT",
        body: formData,
      });
      update = await update.json();
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
        <form onSubmit={onSubmit} encType="multipart/form-data">
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
          {/* <Dropzone onDrop={onDropPfp} accept={"image/*"} />
          <Dropzone onDrop={onDropBg} accept={"image/*"} /> */}

          <div>
            <label className="new-pfp" htmlFor="new-pfp" style={{ cursor: "pointer" }}>
              <input
                id="new-pfp"
                type="file"
                accept="image/*"
                onChange={(e) => setPfp(e.target.files[0])}
                // className="orange-btn-white-txt cursor-pointer"
                style={{ display: "none", cursor: "pointer" }}
              />
              Upload a Profile Picture
            </label>
          </div>

          <div>
            <label className="new-bg" htmlFor="new-bg" style={{ cursor: "pointer" }}>
              <input
                id="new-bg"
                type="file"
                accept="image/*"
                onChange={(e) => setBg(e.target.files[0])}
                // className="orange-btn-white-txt cursor-pointer"
                style={{ display: "none", cursor: "pointer" }}
              />
              Upload a Background
            </label>
          </div>

          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
