import React, { useState } from "react";
import Topbar from "../components/topbar";
import Background2 from "../components/Background2";
import Footer from "../components/Footer";

function Information() {
  // 🔹 ตั้งค่า state สำหรับรูปหลัก
  const [mainImage, setMainImage] = useState("/src/assets/images/exam.png");

  // 🔹 ฟังก์ชันเปลี่ยนรูป
  const changeImage = (clickedImage) => {
    setMainImage(clickedImage);
  };

  // 🔹 กำหนดสไตล์ object ตาม CSS เดิม
  const styles = {
    container: {
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      gap: "20px",
      maxWidth: "2000px",
      marginTop: "120px",
    },
    section: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: "20px",
      maxWidth: "2000px",
      marginLeft: "60px",
      padding: "20px",
    },
    sectionDiv: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      alignItems: "flex-start",
      alignSelf: "flex-start",
    },
    sectionImg: {
      width: "120px",
      height: "120px",
      borderRadius: "20px",
      cursor: "pointer",
    },
    activeImage: {
      outline: "5px solid rgb(255, 230, 0)",
    },
    mainImage: {
      maxWidth: "100%",
      width: "700px",
      height: "800px",
      borderRadius: "20px",
      transition: "opacity 0.3s ease-in-out",
    },
    information: {
      marginTop: "100px",
      flexBasis: "35%",
      maxWidth: "1200px",
      marginLeft: "50px",
    },
    goods: {
      fontSize: "55px",
      fontFamily: "'Inter', sans-serif",
      fontWeight: "700",
      color: "rgba(0, 0, 0, 1)",
    },
    textHeader: {
      fontSize: "35px",
      fontFamily: "'Inter', sans-serif",
      fontWeight: "700",
      color: "rgb(0, 0, 0)",
      marginTop: "40px",
      lineHeight: "1.5",
      display: "inline-flex",
      alignItems: "center",
      gap: "8px"
    },
    textParagraph: {
      fontSize: "25px",
      fontFamily: "'Inter', sans-serif",
      fontWeight: "400",
      color: "rgb(0, 0, 0)",
      lineHeight: "1.5",
    },
    circle: {
      width: "20px",
      height: "20px",
      alignItems: "center",
    },
    collectibles: {
      backgroundColor: "rgba(229, 240, 255, 0.61)",
      display: "flex",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "10px",
      padding: "20px",
      width: "350px",
      borderRadius: "20px",
      marginTop: "20px",
    },
    tradeBy: {
      marginTop: "40px",
      display: "flex",
      gap: "20px",
      alignItems: "center",
      paddingLeft: "210px",
    },
    name: {
      fontFamily: "'Inter', sans-serif",
      fontWeight: "700",
      marginLeft: "20px",
      fontSize: "25px",
    },
    message: {
      width: "40px",
      height: "40px",
    },
  };

  const thumbnails = [
    "/src/assets/images/exam.png",
    "/src/assets/images/gojo.png",
    "/src/assets/images/saiki.png",
    "/src/assets/images/Baby Saiki🥳.png",
  ];

  return (
    <div>
      <Topbar />
      <Background2 />
      <div style={styles.container}>
        {/* Section รูปภาพ */}
        <section style={styles.section}>
          <div style={styles.sectionDiv}>
            {thumbnails.map((imgSrc) => (
              <img
                key={imgSrc}
                src={imgSrc}
                alt="thumbnail"
                onClick={() => changeImage(imgSrc)}
                style={mainImage === imgSrc ? { ...styles.sectionImg, ...styles.activeImage } : styles.sectionImg}
              />
            ))}
          </div>
          {/* รูปหลัก */}
          <img src={mainImage} alt="main" style={styles.mainImage} />
        </section>

        {/* ข้อมูลเกี่ยวกับสินค้า */}
        <aside style={styles.information}>
          <h1 style={styles.goods}>Kate Domina Art</h1>
          <h2 style={styles.textHeader}>Description</h2>
          <p style={styles.textParagraph}>
            Was purchased at an Art Battle Championship night on June 24th, 2014.
            It was painted by Kate Domina, whose pieces now fetch between $1000-$3500.
          </p>
          <h3 style={styles.textHeader}>Category</h3>
          <p style={styles.textParagraph}>Art & Handmade</p>
          <h4 style={styles.textHeader}>
            Condition <img src="/src/assets/icons/circle.png" alt="circle" style={styles.circle} />
          </h4>
          <p style={styles.textParagraph}>
            Lightly used and fully functional, but does not include the original packaging or tags.
          </p>

          {/* รายการสินค้าที่ต้องการแลกเปลี่ยน */}
          <div>
            <h5 style={styles.textHeader}>Desired Items</h5>
            <div style={styles.collectibles}>
              <img src="/src/assets/icons/Bookmark 2.png" alt="Bookmark" style={{ width: "37px", height: "37px" }} />
              <h6 style={{ fontSize: "30px", fontWeight: "700" }}>COLLECTIBLES</h6>
              <p style={styles.textParagraph}>Rabbit plush toy, cute and lovely</p>
            </div>
          </div>
        </aside>
      </div>

      {/* ส่วนของผู้ที่แลกเปลี่ยน */}
      <article style={{ width: "100%", padding: "40px" }}>
        <h1 style={{ paddingLeft: "210px", fontSize: "35px", fontWeight: "700" }}>Trade by</h1>
        <div style={styles.tradeBy}>
          <a href="https://www.example.com">
            <img src="https://www.example.com/image.jpg" alt="profile" style={{ width: "50px", height: "50px", borderRadius: "50%" }} />
          </a>
          <span style={styles.name}>killua zoldyck</span>
          <a href="https://www.example.com">
            <img src="/src/assets/icons/Message Text.png" alt="Message" style={styles.message} />
          </a>
        </div>
      </article>
      <Footer />
    </div>
  );
}

export default Information;
