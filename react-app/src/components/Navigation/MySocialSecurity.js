import React from "react";
import "./Navigation.css";

function MySocialSecurity() {
  return (
    <>
      <div className="nav-bar__element">
        <div className="nav-bar__element">
          {/* <a href="https://www.linkedin.com/in/minh-tran-36501a251/" className="nav-ad" target="_blank"> */}
          <span
            onClick={() => window.open("https://www.linkedin.com/in/minh-tran-36501a251/", "_blank")}
            className="nav-linkedin"
          >
            LinkedIn
          </span>
          {/* </a> */}
        </div>
      </div>
      <div className="nav-bar__element">
        <div className="nav-bar__element">
          {/* <a href="https://github.com/itsmingyoo" className="nav-ad" target="_blank"> */}
          {/* GitHub */}
          {/* </a> */}

          <span onClick={() => window.open("https://github.com/itsmingyoo", "_blank")} className="nav-github">
            GitHub
          </span>
        </div>
      </div>
    </>
  );
}

export default MySocialSecurity;
