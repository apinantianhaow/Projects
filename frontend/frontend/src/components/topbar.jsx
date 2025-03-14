import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Topbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  return (
    <div
      style={{
        backgroundColor: "white",
        width: "100%",
        height: "80px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 40px",
        overflow: "hidden",
        flexWrap: "nowrap",
      }}
    >
      {/* 🔹 Search Section */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <img
          src="/src/assets/icons/Search Normal.png"
          alt="find_icon"
          style={{ width: "22px", height: "22px", marginLeft: "10px" }}
        />
        <input
          type="text"
          placeholder="type to search"
          style={{
            width: "200px",
            padding: "6px",
            border: "none",
            borderRadius: "6px",
            outline: "none",
          }}
        />
      </div>

      {/* 🔹 Profile Section */}
      <div style={{ display: "flex", alignItems: "center", gap: "50px" }}>
        <img
          src="/src/assets/icons/Heart.png"
          alt="favorite_icon"
          style={{ width: "23px", height: "23px" }}
        />

        {user ? (
          <img
            src={user.profileImage || "/default-profile.png"}
            alt="profile"
            style={{ width: "40px", height: "40px", borderRadius: "50%", cursor: "pointer" }}
            onClick={() => navigate("/profile")}
          />
        ) : (
          <a href="https://www.example.com">
            <img
              src="https://www.example.com/image.jpg"
              alt="profile"
              style={{ width: "40px", height: "40px", borderRadius: "50%" }}
            />
          </a>
        )}
      </div>
    </div>
  );
}

export default Topbar;
