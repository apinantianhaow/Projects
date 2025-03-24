import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Topbar({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) return;

        // ✅ เรียก endpoint ใหม่ให้ตรงกับ backend
        const res = await fetch(`http://localhost:5001/profile/${userId}`);
        if (!res.ok) throw new Error("Profile not found");

        const data = await res.json();
        setProfile(data);
      } catch (err) {
        console.error("❌ Load profile failed:", err.message);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <>
      <div
        style={{
          top: 0,
          left: 0,
          backgroundColor: "white",
          width: "100%",
          height: "80px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 40px",
          zIndex: 999,
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* 🔍 Search */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <img
            src="/src/assets/icons/Search Normal.png"
            alt="search_icon"
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

        {/* 👤 Profile Section */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          {profile?.name && (
            <div style={{ fontWeight: "bold", fontSize: "16px", color: "#333" }}>
              {profile.name}
            </div>
          )}

          {profile?.imageUrl && (
            <img
              src={profile.imageUrl}
              alt="profile"
              style={{
                width: "45px",
                height: "45px",
                borderRadius: "50%",
                cursor: "pointer",
              }}
              onClick={() => navigate("/profile")}
            />
          )}

          <button
            onClick={handleLogout}
            style={{
              backgroundColor: "#900603",
              color: "white",
              padding: "8px 16px",
              border: "none",
              borderRadius: "25px",
              fontWeight: "bold",
              fontSize: "14px",
              cursor: "pointer",
              boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
            }}
          >
            LOG OUT
          </button>
        </div>
      </div>

      
    </>
  );
}

export default Topbar;
