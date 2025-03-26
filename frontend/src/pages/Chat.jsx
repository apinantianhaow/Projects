import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5001");

 function ChatApp({ currentUserId, chattingWithId }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [currentUserProfile, setCurrentUserProfile] = useState(null);
  const [chattingWithProfile, setChattingWithProfile] = useState(null);

  // ✅ โหลดโปรไฟล์ของทั้ง 2 ฝั่ง
  useEffect(() => {
    const fetchProfiles = async () => {
      const fetchProfile = async (id) => {
        const res = await fetch(`http://localhost:5001/profile/${id}`);
        return await res.json();
      };

      const current = await fetchProfile(currentUserId);
      const partner = await fetchProfile(chattingWithId);
      setCurrentUserProfile(current);
      setChattingWithProfile(partner);
    };

    fetchProfiles();
  }, [currentUserId, chattingWithId]);

  // ✅ โหลดข้อความเก่า
  useEffect(() => {
    fetch(`http://localhost:5001/messages/${currentUserId}/${chattingWithId}`)
      .then((res) => res.json())
      .then((data) => setMessages(data));
  }, [currentUserId, chattingWithId]);

  // ✅ รับข้อความใหม่แบบ real-time
  useEffect(() => {
    socket.on("receive-message", (msg) => {
      if (
        (msg.senderId === chattingWithId && msg.receiverId === currentUserId) ||
        (msg.senderId === currentUserId && msg.receiverId === chattingWithId)
      ) {
        setMessages((prev) => [...prev, msg]);
      }
    });
  }, [chattingWithId, currentUserId]);

  // ✅ ส่งข้อความ
  const sendMessage = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newMsg = {
      senderId: currentUserId,
      receiverId: chattingWithId,
      text,
    };
    socket.emit("send-message", newMsg);
    setMessages((prev) => [...prev, { ...newMsg, createdAt: new Date() }]);
    setText("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Chat with {chattingWithProfile?.name || chattingWithId}</h2>

      <div style={{ border: "1px solid #aaa", padding: 10, height: 300, overflowY: "scroll" }}>
        {messages.map((m, i) => {
          const isSelf = m.senderId === currentUserId;
          const senderProfile = isSelf ? currentUserProfile : chattingWithProfile;

          return (
            <div key={i} style={{ textAlign: isSelf ? "right" : "left", marginBottom: 10 }}>
              {senderProfile?.imageUrl && (
                <img
                  src={senderProfile.imageUrl}
                  alt="profile"
                  style={{ width: "30px", height: "30px", borderRadius: "50%", marginRight: "5px" }}
                />
              )}
              <strong>{senderProfile?.name || m.senderId}</strong>: {m.text}
            </div>
          );
        })}
      </div>

      <form onSubmit={sendMessage} style={{ marginTop: 10 }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
export default ChatApp;
