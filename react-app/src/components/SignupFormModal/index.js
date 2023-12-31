import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    const errObj = {};
    if (password !== confirmPassword) errObj.password = "Confirm Password field must be the same as the Password field";
    if (password.length < 6 || confirmPassword.length < 6)
      errObj.password = "Password requires a minimum of 6 characters.";
    if (username.length < 6) errObj.username = "Username requires a minimum of 6 characters.";
    if (email.length < 6) errObj.email = "Email requires a minimum of 6 characters.";
    if (email.length > 32) errObj.email = "Email requires a minimum of 6 characters.";
    if (!email.includes("@")) errObj.email = "Invalid email.";
    if (username.includes(" ")) errObj.username = "Username cannot have a space.";
    if (password.includes(" ") || confirmPassword.includes(" "))
      errObj.password = "Password can contain unique characters but no space.";
    if (username.length > 32) errObj.username = "Username must be between 6 and 32 characters";
    if (first_name.length > 32) errObj.first_name = "First name can be up to 32 characters";
    if (last_name.length > 32) errObj.last_name = "Last name can be up to 32 characters";
    if (first_name.includes(" ")) errObj.first_name = "First name cannot include spaces";
    if (last_name.includes(" ")) errObj.last_name = "Last name cannot include spaces";

    if (Object.values(errObj).length > 0) {
      return setErrors(errObj);
    }

    if (password === confirmPassword) {
      const data = await dispatch(signUp(username, email, password, first_name, last_name));
      if (data) {
        setErrors(data);
      } else {
        closeModal();
        history.push("/discover");
      }
    } else {
      setErrors(["Confirm Password field must be the same as the Password field"]);
    }
  };
  return (
    <div id="signup-container">
      <div id="signup-text">Create an account</div>
      <form onSubmit={handleSubmit} className="form-input-container">
        <div className="input-group">
          <input
            className="signup-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@gmail.com"
            required
          />
          <label className="user-label">
            {submitted && errors.email && <div className="errors">{errors.email}</div>}
          </label>
        </div>

        <div className="input-group">
          <input
            className="signup-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
          <label className="user-label">
            {submitted && errors.username && <div className="errors">{errors.username}</div>}
          </label>
        </div>

        <div className="input-group">
          <input
            className="signup-input"
            type="text"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            required
          />
          <label className="user-label">
            {submitted && errors.first_name && <div className="errors">{errors.first_name}</div>}
          </label>
        </div>

        <div className="input-group">
          <input
            className="signup-input"
            type="text"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            required
          />
          <label className="user-label">
            {submitted && errors.last_name && <div className="errors">{errors.last_name}</div>}
          </label>
        </div>

        <div className="input-group">
          <input
            className="signup-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <label className="user-label">
            {submitted && errors.password && <div className="errors">{errors.password}</div>}
          </label>
        </div>

        <div className="input-group">
          <input
            className="signup-input"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            required
          />
          <label className="user-label">
            {submitted && errors.confirmPassword && <div className="errors">{errors.confirmPassword}</div>}
          </label>
        </div>
        <div>
          <button type="submit" id="signup-modal-button" className="orange-btn">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}
export default SignupFormModal;
