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
  const [selectedItem2, setSelectedItem2] = useState(null);

  // ✅ โหลดโปรไฟล์และไอเท็ม
  useEffect(() => {
    const fetchProfile = async (userId) => {
      const res = await fetch(`http://localhost:5001/profile/${userId}`);
      return await res.json();
    };

    const fetchItems = async (userId) => {
      const res = await fetch(`http://localhost:5001/items-by-user/${userId}`);
      return await res.json();
    };

    const load = async () => {
      const current = await fetchProfile(currentUserId);
      const partner = await fetchProfile(chattingWithId);
      const items1 = await fetchItems(currentUserId);
      const items2 = await fetchItems(chattingWithId);

      console.log("🔎 current profile", current);   
      console.log("🔎 partner profile", partner);   

      setCurrentUserProfile(current);
      setChattingWithProfile(partner);
      setUser1Items(items1);
      setUser2Items(items2);
    };

    load();
  }, [currentUserId, chattingWithId]);

  // ✅ โหลดข้อความเก่า
  useEffect(() => {
    fetch(`http://localhost:5001/messages/${currentUserId}/${chattingWithId}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setMessages(data);
        } else {
          setMessages([]);
        }
      })
      .catch(() => setMessages([]));
  }, [currentUserId, chattingWithId]);

  // ✅ รับข้อความ real-time
  useEffect(() => {
    const handleReceive = (msg) => {
      if (
        (msg.senderId === chattingWithId && msg.receiverId === currentUserId) ||
        (msg.senderId === currentUserId && msg.receiverId === chattingWithId)
      ) {
        setMessages((prev) => [...prev, msg]);
      }
    };

    socket.on("receive-message", handleReceive);
    return () => socket.off("receive-message", handleReceive);
  }, [currentUserId, chattingWithId]);

  // ✅ ส่งข้อความ
  const sendMessage = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const msg = { senderId: currentUserId, receiverId: chattingWithId, text };
    socket.emit("send-message", msg);
    setText("");
  };

  // ✅ แลกเปลี่ยน
  const handleExchange = async () => {
    if (!selectedItem1 || !selectedItem2) {
      alert("⚠️ กรุณาเลือก item ทั้งสองฝั่งก่อน");
      return;
    }

    try {
      const res = await fetch("http://localhost:5001/delete-items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ item1: selectedItem1, item2: selectedItem2 }),
      });

      const result = await res.json();
      alert(result.message || "✅ แลกเปลี่ยนสำเร็จ");

      // ลบ item ออกจาก UI
      setUser1Items((prev) => prev.filter((i) => i._id !== selectedItem1));
      setUser2Items((prev) => prev.filter((i) => i._id !== selectedItem2));
      setSelectedItem1(null);
      setSelectedItem2(null);
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

        <h4>🎁 เลือก item ของอีกฝ่าย</h4>
        <select value={selectedItem2 || ""} onChange={(e) => setSelectedItem2(e.target.value)}>
          <option value="">-- เลือก --</option>
          {user2Items.map((item) => (
            <option key={item._id} value={item._id}>
              {item.title}
            </option>
          ))}
        </select>

        <br />
        <button onClick={handleExchange} style={{ marginTop: 10 }}>
          ✅ ยืนยันแลกเปลี่ยน
        </button>
      </div>
    </div>
  );
}

export default ChatApp;