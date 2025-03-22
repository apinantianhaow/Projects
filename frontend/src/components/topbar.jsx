import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Topbar({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showLogout, setShowLogout] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  // ฟังก์ชัน Logout เมื่อกดปุ่ม
  const handleLogout = () => {
    localStorage.removeItem("user"); // ลบข้อมูล user
    setUser(null); // อัปเดต state ของ Topbar
    setIsLoggedIn(false); // อัปเดต Navbar ให้เป็นสถานะ Logout
    navigate("/"); // กลับไปหน้าแรก (Navbar กลับมา)
  };

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
        position: "relative",
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
      <div style={{ display: "flex", alignItems: "center", gap: "50px", position: "relative" }}>
        <img
          src="/src/assets/icons/Heart.png"
          alt="favorite_icon"
          style={{ width: "23px", height: "23px" }}
        />

        {user ? (
          <>
            {/* รูปโปรไฟล์ (กดซ้ายไปหน้า /profile, กดขวาแสดง Logout) */}
            <img
              src={user.profileImage || "/default-profile.png"}
              alt="profile"
              style={{ width: "45px", height: "45px", borderRadius: "50%", cursor: "pointer" }}
              onClick={() => navigate("/profile")} // ✅ คลิกซ้าย -> ไปหน้า /profile
              onContextMenu={(e) => {
                e.preventDefault(); // ป้องกันเมนูคลิกขวาปกติ
                setShowLogout(!showLogout); // Toggle แสดง/ซ่อนปุ่ม Logout
              }}
            />

            {/* กรอบ Logout (แสดงเมื่อกดขวา) */}
            {showLogout && (
              <div
              style={{
                display: "flex", // ✅ ใช้ flexbox จัดให้อยู่ถัดจากไอคอนโปรไฟล์
                flexDirection: "column", // ✅ ให้ปุ่มอยู่ใต้ไอคอนโปรไฟล์
                alignItems: "center", // ✅ จัดให้อยู่ตรงกลาง
              }}
            >
              <div
                style={{
                  backgroundColor: "#900603", // ✅ สีดำ
                  color: "white", // ✅ ข้อความสีขาว
                  border: "none", // ✅ ไม่มีเส้นขอบ
                  borderRadius: "25px", // ✅ ขอบมนเหมือนในภาพ
                  padding: "10px 20px", // ✅ ปรับขนาดปุ่มให้ใหญ่ขึ้น
                  fontWeight: "bold", // ✅ ตัวหนา
                  fontSize: "12px", // ✅ ขนาดฟอนต์
                  textAlign: "center", // ✅ จัดข้อความตรงกลาง
                  boxShadow: "0 2px 5px rgba(0,0,0,0.2)", // ✅ เพิ่มเงาให้ดูเด่นขึ้น
                  cursor: "pointer",
                }}
                onClick={handleLogout} // ✅ ใช้ handleLogout ที่อัปเดต Navbar ทันที
              >
                LOG OUT
              </div>
            </div>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
}

export default Topbar;
