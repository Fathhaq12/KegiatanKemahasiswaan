import React, { useState, useEffect, useRef } from "react";
import logo from "../gambar/Himatif.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("isLoggedIn");
  const [user, setUser] = useState({ username: "", role: "" });
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Simulasi ambil data user dari localStorage (atau bisa dari API/profile)
  useEffect(() => {
    if (isLoggedIn) {
      // Ambil userData dari localStorage, fallback ke default jika tidak ada
      let userData = { username: "User", role: "mahasiswa" };
      try {
        const stored = localStorage.getItem("userData");
        if (stored) {
          const parsed = JSON.parse(stored);
          // Cek kemungkinan field username dari backend: username, email, atau safeUserData.username
          if (parsed.username) userData.username = parsed.username;
          else if (parsed.safeUserData && parsed.safeUserData.username)
            userData.username = parsed.safeUserData.username;
          else if (parsed.email) userData.username = parsed.email;
          if (parsed.role) userData.role = parsed.role;
          else if (parsed.safeUserData && parsed.safeUserData.role)
            userData.role = parsed.safeUserData.role;
        }
      } catch (e) {}
      setUser(userData);
    }
  }, [isLoggedIn, localStorage.getItem("userData")]);

  // Tutup dropdown jika klik di luar
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdown(false);
      }
    }
    if (dropdown) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdown]);

  // Hide login/signup hanya jika sudah login, bukan jika di halaman login/register
  const hideAuth = isLoggedIn;

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      await axios.post(
        "http://localhost:5000/api/logout",
        { refreshToken },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: false,
        }
      );
    } catch (err) {
      console.error("Logout error:", err);
    }
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userData");
    localStorage.removeItem("isLoggedIn");
    setDropdown(false);
    navigate("/login");
  };

  // Ganti profileLogo dengan string URL, bukan import
  const profileLogo = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    user.username || "User"
  )}&background=3273dc&color=fff&rounded=true&size=64`;

  const handleProfileClick = (e) => {
    e.preventDefault();
    const profileSection = document.getElementById("profile-section");
    if (window.location.pathname !== "/") {
      window.location.href = "/#profile-section";
    } else {
      profileSection?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className="navbar is-link"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          <img src={logo} alt="Logo" style={{ height: "48px" }} />
        </Link>
        <a
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <Link className="navbar-item" to="/">
            HIMATIF
          </Link>
          <Link className="navbar-item" to="/kegiatan">
            Kegiatan
          </Link>
          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">More</a>
            <div className="navbar-dropdown">
              <Link className="navbar-item is-link" to="/input-kegiatan">
                Input Kegiatan
              </Link>
              <a
                className="navbar-item is-link"
                href="#profile-section"
                onClick={handleProfileClick}
              >
                Profile HIMATIF
              </a>
            </div>
          </div>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {isLoggedIn && user.role === "admin" && (
                <Link className="button is-warning" to="/admin">
                  Admin
                </Link>
              )}
              {isLoggedIn ? (
                <div
                  className="navbar-item"
                  style={{ position: "relative" }}
                  ref={dropdownRef}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                    onClick={() => setDropdown((d) => !d)}
                  >
                    <figure
                      className="image is-32x32"
                      style={{ marginRight: 8 }}
                    >
                      <img
                        className="is-rounded"
                        src={profileLogo}
                        alt="Profile"
                        style={{ height: 32, width: 32, objectFit: "cover" }}
                      />
                    </figure>
                    <span style={{ color: "#fff", fontWeight: 600 }}>
                      {user.username}
                    </span>
                  </div>
                  {dropdown && (
                    <div
                      className="box"
                      style={{
                        position: "absolute",
                        right: 0,
                        top: 40,
                        minWidth: 180,
                        zIndex: 1000,
                        padding: 0,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                      }}
                    >
                      <div
                        style={{
                          padding: "12px 16px",
                          borderBottom: "1px solid #eee",
                        }}
                      >
                        <strong>{user.username}</strong>
                        <div style={{ fontSize: 13, color: "#888" }}>
                          {user.role}
                        </div>
                      </div>
                      <Link
                        to="/edit-profile"
                        className="dropdown-item"
                        style={{
                          display: "block",
                          padding: "10px 16px",
                          color: "#3273dc",
                        }}
                        onClick={() => setDropdown(false)}
                      >
                        Edit Profile
                      </Link>
                      <button
                        className="dropdown-item"
                        style={{
                          display: "block",
                          width: "100%",
                          textAlign: "left",
                          padding: "10px 16px",
                          background: "none",
                          border: "none",
                          color: "#f14668",
                        }}
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                !hideAuth && (
                  <>
                    <Link
                      className="button has-background-warning-75 has-text-warning-75-invert"
                      to="/register"
                    >
                      <strong>Sign up</strong>
                    </Link>
                    <Link className="button is-light" to="/login">
                      Log in
                    </Link>
                  </>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
