import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Background2 from "../components/Background2";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";

function Information() {
  const { category, titleSlug } = useParams();
  const [item, setItem] = useState(null);
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await fetch(
          `http://localhost:5001/items/${category}/${titleSlug}`
        );
        if (!res.ok) {
          throw new Error(`Item not found: ${res.status}`);
        }
        const data = await res.json();
        setItem(data);
        if (Array.isArray(data.images) && data.images.length > 0) {
          setMainImage(data.images[0]);
        }
      } catch (error) {
        console.error("Error fetching item:", error);
      }
    };

    fetchItem();
  }, [category, titleSlug]);

  const changeImage = (clickedImage) => {
    setMainImage(clickedImage);
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      gap: "20px",
      maxWidth: "2000px",
      marginTop: "80px",
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
      marginLeft: "60px",
    },
    information: {
      marginTop: "70px",
      flexBasis: "35%",
      maxWidth: "1200px",
      marginLeft: "50px",
    },
    goods: {
      fontSize: "55px",
      fontFamily: "'Inter', sans-serif",
      fontWeight: "400",
      color: "rgba(0, 0, 0, 1)",
      marginLeft: "30px",
    },
    textHeader: {
      fontSize: "30px",
      fontFamily: "'Inter', sans-serif",
      fontWeight: "700",
      color: "rgb(0, 0, 0)",
      marginTop: "30px",
      lineHeight: "1.5",
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
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
      borderRadius: "50%",
      display: "inline-block",
      marginLeft: "6px",
    },
    collectibles: {
      backgroundColor: "rgba(229, 240, 255, 0.61)",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "10px",
      padding: "20px",
      width: "350px",
      borderRadius: "20px",
      marginTop: "20px",
    },
    tradeBy: {
      marginTop: "30px",
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

  // 🔸 Fallback UI ขณะโหลด
  if (!item) {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "200px",
          fontSize: "30px",
          fontFamily: "'Kaisei HarunoUmi', serif",
        }}
      >
        Loading information...
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <Background2 />
      <div style={styles.container}>
        {/* Section รูปภาพ */}
        <section style={styles.section}>
          <div style={styles.sectionDiv}>
            {Array.isArray(item.images) &&
              item.images.map((imgSrc, index) => (
                <img
                  key={index}
                  src={imgSrc || "/fallback.jpg"}
                  alt={`thumbnail-${index}`}
                  onClick={() => changeImage(imgSrc)}
                  style={
                    mainImage === imgSrc
                      ? { ...styles.sectionImg, ...styles.activeImage }
                      : styles.sectionImg
                  }
                />
              ))}
          </div>
          <img
            src={mainImage || "/fallback.jpg"}
            alt="main"
            style={styles.mainImage}
          />
        </section>

        <aside style={styles.information}>
          <h1 style={styles.goods}>{item.title}</h1>
          <h2 style={styles.textHeader}>Description</h2>
          <p style={{ ...styles.textParagraph, whiteSpace: "pre-wrap" }}>
            {item.description}
          </p>

          <h3 style={styles.textHeader}>Category</h3>
          <p style={styles.textParagraph}>{item.category}</p>

          <h4 style={styles.textHeader}>
            Condition{" "}
            <img
              src="/src/assets/icons/circle.png"
              alt="circle"
              style={styles.circle}
            />
          </h4>
          <p style={styles.textParagraph}>{item.condition}</p>
          {item.conditionNote && (
            <p style={styles.textParagraph}>{item.conditionNote}</p>
          )}

          <h5 style={styles.textHeader}>Desired Items</h5>
          <div style={styles.collectibles}>
            <img
              src="/src/assets/icons/Bookmark 2.png"
              alt="Bookmark"
              style={{ width: "37px", height: "37px" }}
            />
            <h6 style={{ fontSize: "30px", fontWeight: "700" }}>
              {item.desiredItems}
            </h6>
            <p style={styles.textParagraph}>{item.desiredNote}</p>
          </div>
        </aside>
      </div>

      <article style={{ width: "100%", padding: "40px" }}>
        <h1
          style={{
            paddingLeft: "210px",
            fontSize: "35px",
            fontWeight: "700",
            marginTop: "60px",
          }}
        >
          Trade by
        </h1>
        <div style={styles.tradeBy}>
          <img
            src={item.uploadedBy?.imageUrl || "/src/assets/icons/profile.png"}
            alt="profile"
            style={{ width: "100px", height: "100px", borderRadius: "50%" }}
          />
          <span style={styles.name}>
            {item.uploadedBy?.username || "Unknown"}
          </span>
          <img
            src="/src/assets/icons/Message Text.png"
            alt="Message"
            style={styles.message}
          />
        </div>
      </article>
      <Footer />
    </div>
  );
}

export default Information;
