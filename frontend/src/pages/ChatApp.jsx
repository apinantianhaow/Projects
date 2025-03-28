import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5001");

function ChatApp({ currentUserId, chattingWithId }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [currentUserProfile, setCurrentUserProfile] = useState(null);
  const [chattingWithProfile, setChattingWithProfile] = useState(null);
  const [user1Items, setUser1Items] = useState([]);
  const [user2Items, setUser2Items] = useState([]);
  const [selectedItem1, setSelectedItem1] = useState(null);
  const [confirmedItem1, setConfirmedItem1] = useState(null);
  const [confirmedItem2, setConfirmedItem2] = useState(null);

  useEffect(() => {
    const fetchProfile = async (userId) => {
      const res = await fetch(`http://localhost:5001/profile/${userId}`);
      return await res.json();
    };

    const fetchItems = async (userId) => {
      const res = await fetch(`http://localhost:5001/items-by-user/${userId}`);
      return await res.json();
    };

    const fetchConfirmed = async () => {
      try {
        const res1 = await fetch(`http://localhost:5001/selected-item/${currentUserId}`);
        const res2 = await fetch(`http://localhost:5001/selected-item/${chattingWithId}`);
    
        if (res1.ok) {
          const data1 = await res1.json();
          if (data1.itemId) setConfirmedItem1(data1.itemId);
        } else {
          console.warn("🔸 currentUser ไม่มี selected-item ในฐานข้อมูล");
        }
    
        if (res2.ok) {
          const data2 = await res2.json();
          if (data2.itemId) setConfirmedItem2(data2.itemId);
        } else {
          console.warn("🔸 chattingWith ไม่มี selected-item ในฐานข้อมูล");
        }
      } catch (err) {
        console.error("❌ fetchConfirmed error:", err);
      }
    };
    
    

    const load = async () => {
      const current = await fetchProfile(currentUserId);
      const partner = await fetchProfile(chattingWithId);
      const items1 = await fetchItems(currentUserId);
      const items2 = await fetchItems(chattingWithId);

      setCurrentUserProfile(current);
      setChattingWithProfile(partner);
      setUser1Items(items1);
      setUser2Items(items2);
      await fetchConfirmed();
    };

    load();
  }, [currentUserId, chattingWithId]);

  useEffect(() => {
    fetch(`http://localhost:5001/messages/${currentUserId}/${chattingWithId}`)
      .then((res) => res.json())
      .then((data) => Array.isArray(data) ? setMessages(data) : setMessages([]))
      .catch(() => setMessages([]));
  }, [currentUserId, chattingWithId]);

  useEffect(() => {
    const handleReceive = (msg) => {
      if (
        (msg.senderId === chattingWithId && msg.receiverId === currentUserId) ||
        (msg.senderId === currentUserId && msg.receiverId === chattingWithId)
      ) {
        setMessages((prev) => [...prev, msg]);
      }
    };

    const handleReceiveItem = ({ userId, itemId }) => {
      if (userId === chattingWithId) {
        setConfirmedItem2(itemId);
      }
    };

    socket.on("receive-message", handleReceive);
    socket.on("selected-item", handleReceiveItem);

    return () => {
      socket.off("receive-message", handleReceive);
      socket.off("selected-item", handleReceiveItem);
    };
  }, [currentUserId, chattingWithId]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    const msg = { senderId: currentUserId, receiverId: chattingWithId, text };
    socket.emit("send-message", msg);
    setMessages((prev) => [...prev, { ...msg, createdAt: new Date() }]);
    setText("");
  };

  const confirmMyItem = async () => {
    if (!selectedItem1) return;
    try {
      setConfirmedItem1(selectedItem1);
      await fetch("http://localhost:5001/select-item", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: currentUserId, itemId: selectedItem1 }),
      });
      socket.emit("selected-item", { userId: currentUserId, itemId: selectedItem1 });
    } catch (err) {
      console.error("❌ Error confirming item:", err);
    }
  };

  const handleExchange = async () => {
    if (!confirmedItem1 || !confirmedItem2) {
      alert("⚠️ กรุณายืนยัน item ทั้งสองฝั่งก่อนแลกเปลี่ยน");
      return;
    }

    try {
      const res = await fetch("http://localhost:5001/delete-items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ item1: confirmedItem1, item2: confirmedItem2 }),
      });
      const result = await res.json();
      alert(result.message || "✅ แลกเปลี่ยนสำเร็จ");
      setUser1Items((prev) => prev.filter((i) => i._id !== confirmedItem1));
      setUser2Items((prev) => prev.filter((i) => i._id !== confirmedItem2));
      setSelectedItem1(null);
      setConfirmedItem1(null);
      setConfirmedItem2(null);
    } catch (err) {
      console.error(err);
      alert("❌ เกิดข้อผิดพลาดในการแลกเปลี่ยน");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Chat with {chattingWithProfile?.name || chattingWithId}</h2>

      <div style={{ border: "1px solid #aaa", padding: 10, height: 300, overflowY: "scroll" }}>
        {messages.map((m, i) => {
          const isSelf = m.senderId === currentUserId;
          const sender = isSelf ? currentUserProfile : chattingWithProfile;
          return (
            <div key={i} style={{ textAlign: isSelf ? "right" : "left", marginBottom: 10 }}>
              {sender?.imageUrl && (
                <img
                  src={sender.imageUrl}
                  alt="profile"
                  style={{ width: "30px", height: "30px", borderRadius: "50%", marginRight: "5px" }}
                />
              )}
              <strong>{sender?.name || m.senderId}</strong>: {m.text}
            </div>
          );
        })}
      </div>

      <form onSubmit={sendMessage} style={{ marginTop: 10 }}>
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Message..." />
        <button type="submit">Send</button>
      </form>

      <div style={{ marginTop: 20 }}>
        <h4>📦 เลือก item ของฉัน</h4>
        <select value={selectedItem1 || ""} onChange={(e) => setSelectedItem1(e.target.value)}>
          <option value="">-- เลือก --</option>
          {user1Items.map((item) => (
            <option key={item._id} value={item._id}>
              {item.title}
            </option>
          ))}
        </select>
        {selectedItem1 && (
          <button
            onClick={confirmMyItem}
            style={{
              marginLeft: 10,
              padding: "6px 12px",
              backgroundColor: confirmedItem1 ? "#4caf50" : "#2196f3",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              transition: "background-color 0.3s, transform 0.1s",
            }}
            onMouseDown={(e) => e.currentTarget.style.transform = "scale(0.95)"}
            onMouseUp={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            {confirmedItem1 ? "✅ เรียบร้อย!" : "✅ ยืนยัน"}
          </button>
        )}

        <h4 style={{ marginTop: 20 }}>🎁 item ของอีกฝ่าย</h4>
        {confirmedItem2 ? (
          <p>🕵️ อีกฝ่ายเลือก: <strong>{user2Items.find((i) => i._id === confirmedItem2)?.title || "ไม่พบ item"}</strong></p>
        ) : (
          <p>⏳ รออีกฝ่ายเลือก item</p>
        )}

        <button onClick={handleExchange} style={{ marginTop: 20 }}>
          🔁 ยืนยันแลกเปลี่ยน
        </button>
      </div>
    </div>
  );
}

export default ChatApp;