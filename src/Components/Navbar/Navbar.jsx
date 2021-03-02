import React from "react";
import "./navbar.css";

export default function Navbar() {
  return (
    <header className="header">
      <div className="content">
        <a className="logo" href="/home">
          <img src="../../favicon.ico" alt="app logo" />
        </a>
        <nav className="navbar">
          <a href="/profile" className="nav-link">
            profile
          </a>
          <a href="/playlist" className="nav-link">
            playlist
          </a>
        </nav>
      </div>
    </header>
  );
}
