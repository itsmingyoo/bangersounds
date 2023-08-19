import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      closeModal();
    }
  };

  const handleDemoSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login("demo@aa.io", "password"));
    if (data) {
      setErrors(data);
    } else {
      closeModal();
    }
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    const errObj = {};

    // Edge Case Error handlers
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

    // setErrors if there are any
    if (Object.values(errObj).length > 0) {
      //   setSubmitted(false);
      return setErrors(errObj);
    }

    if (password === confirmPassword) {
      const data = await dispatch(signUp(username, email, password, first_name, last_name));
      if (data) {
        setErrors(data);
      } else {
        closeModal();
      }
    } else {
      setErrors(["Confirm Password field must be the same as the Password field"]);
    }
  };

  const toggleShowPassword = () => {
    setShowPw(!showPw);
  };

  return (
    <div className="login-container">
      <div className="login-div">Sign In</div>
      <form onSubmit={handleSubmit} className="login-modal">
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>Email</label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label>Password</label>
        <input
          type={showPw ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label className="show-pw-label">
          <input type="checkbox" onChange={toggleShowPassword} />
          Show Password
        </label>
        <button type="submit">Log In</button>
      </form>
      <form onSubmit={handleDemoSubmit}>
        <button id="demo-user" type="submit">
          DemoUser
        </button>
      </form>
    </div>
  );
}

export default LoginFormModal;
