import React, { useEffect, useRef, useState } from "react";
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
  const [exchangeConfirm1, setExchangeConfirm1] = useState(false);
  const [exchangeConfirm2, setExchangeConfirm2] = useState(false);
  const [hasClickedConfirm, setHasClickedConfirm] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

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
        }
        if (res2.ok) {
          const data2 = await res2.json();
          if (data2.itemId) setConfirmedItem2(data2.itemId);
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
        refetchOtherUserItems();
      }
    };

    const handleExchangeConfirm = ({ userId, confirm }) => {
      if (userId === chattingWithId) {
        setExchangeConfirm2(confirm);
      }
    };

    const handleExchangeDone = ({ userId, targetId }) => {
      if (
        (userId === currentUserId && targetId === chattingWithId) ||
        (userId === chattingWithId && targetId === currentUserId)
      ) {
        alert("✅ แลกเปลี่ยนสำเร็จแล้ว!");
        setExchangeConfirm1(false);
        setExchangeConfirm2(false);
        setConfirmedItem1(null);
        setConfirmedItem2(null);
        setSelectedItem1(null);
        setHasClickedConfirm(false);
      }
    };

    socket.on("receive-message", handleReceive);
    socket.on("selected-item", handleReceiveItem);
    socket.on("exchange-confirm", handleExchangeConfirm);
    socket.on("exchange-done", handleExchangeDone);

    return () => {
      socket.off("receive-message", handleReceive);
      socket.off("selected-item", handleReceiveItem);
      socket.off("exchange-confirm", handleExchangeConfirm);
      socket.off("exchange-done", handleExchangeDone);
    };
  }, [currentUserId, chattingWithId]);

  useEffect(() => {
    if (exchangeConfirm1 && exchangeConfirm2 && confirmedItem1 && confirmedItem2) {
      handleExchange();
    }
  }, [exchangeConfirm1, exchangeConfirm2]);

  useEffect(() => {
    socket.emit("request-exchange-status", { userId: currentUserId, targetId: chattingWithId });
  }, [currentUserId, chattingWithId]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    const msg = { senderId: currentUserId, receiverId: chattingWithId, text, createdAt: new Date() };
    socket.emit("send-message", msg);
    setText("");
  };

  const confirmMyItem = async () => {
    if (!selectedItem1) return;
    try {
      setConfirmedItem1(selectedItem1);
      setHasClickedConfirm(true);
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

  const toggleExchangeConfirm = () => {
    if (!confirmedItem1 || !confirmedItem2) {
      alert("⚠️ กรุณาใส่ของก่อน");
      return;
    }
    const newConfirm = !exchangeConfirm1;
    setExchangeConfirm1(newConfirm);
    socket.emit("exchange-confirm", {
      userId: currentUserId,
      targetId: chattingWithId,
      confirm: newConfirm,
    });
  };

  const handleExchange = async () => {
    try {
      const res = await fetch("http://localhost:5001/delete-items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ item1: confirmedItem1, item2: confirmedItem2 }),
      });
      const result = await res.json();
      socket.emit("exchange-done", {
        userId: currentUserId,
        targetId: chattingWithId,
      });
      setExchangeConfirm1(false);
      setExchangeConfirm2(false);
      setSelectedItem1(null);
      setConfirmedItem1(null);
      setConfirmedItem2(null);
      setHasClickedConfirm(false);
      setUser1Items((prev) => prev.filter((i) => i._id !== confirmedItem1));
      setUser2Items((prev) => prev.filter((i) => i._id !== confirmedItem2));
    } catch (err) {
      console.error(err);
      alert("❌ เกิดข้อผิดพลาดในการแลกเปลี่ยน");
    }
  };

  const refetchOtherUserItems = async () => {
    try {
      const res = await fetch(`http://localhost:5001/items-by-user/${chattingWithId}`);
      const data = await res.json();
      setUser2Items(data);
    } catch (err) {
      console.error("❌ Failed to refetch other user items:", err);
    }
  };
  return(

    <div style={{
      backgroundColor: "#0d0d0d",
      minHeight: "100vh",
      padding: 30,
      fontFamily: "Segoe UI, sans-serif",
      color: "#fff",
      display: "flex",
      justifyContent: "center",
    }}>
      <div style={{
        width: "100%",
        maxWidth: 1200,
        backgroundColor: "#1e1e1e",
        borderRadius: 16,
        boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}>
        {/* Header */}
        <div style={{
          backgroundColor: "#2a2a2a",
          color: "#fff",
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between", // 👈 สำคัญ! ทำให้ซ้าย-ขวาห่างกัน
          borderBottom: "1px solid #444"
        }}>
          {/* ซ้าย: โปรไฟล์ + ชื่อ */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {chattingWithProfile?.imageUrl && (
              <img src={chattingWithProfile.imageUrl} style={{ width: 40, height: 40, borderRadius: "50%" }} alt="profile" />
            )}
            <div>
              <h2 style={{ margin: 0, fontSize: 18 }}>{chattingWithProfile?.name || chattingWithId}</h2>
              <span style={{ fontSize: 12, color: "#8bc34a" }}>● Online</span>
            </div>
          </div>

          {/* ขวา: ปุ่ม Back */}
          <button
            onClick={() => {
              window.history.back(); 
            }}
            style={{
              background: "transparent",
              border: "none",
              color: "#fff",
              fontSize: 16,
              cursor: "pointer",
              padding: "6px 12px",
            }}
          >
            ⬅ กลับ
          </button>
        </div>


        {/* Chat */}
        <div style={{
          padding: 20,
          backgroundColor: "#121212",
          height: 420,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}>
          {messages.map((m, i) => {
            const isSelf = m.senderId === currentUserId;
            const time = m.createdAt ? new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
            return (
              <div key={i} style={{
                alignSelf: isSelf ? "flex-end" : "flex-start",
                maxWidth: "70%",
                backgroundColor: isSelf ? "#4a90e2" : "#2c2c2c",
                color: "#fff",
                padding: "10px 14px",
                borderRadius: 16,
                borderBottomRightRadius: isSelf ? 0 : 16,
                borderBottomLeftRadius: isSelf ? 16 : 0,
                position: "relative",
              }}>
                <div>{m.text}</div>
                <div style={{
                  fontSize: 10,
                  color: "#aaa",
                  marginTop: 4,
                  textAlign: "right",
                }}>{time}</div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={sendMessage} style={{
          display: "flex",
          padding: 16,
          backgroundColor: "#1a1a1a",
          borderTop: "1px solid #333",
          gap: 10,
        }}>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="พิมพ์ข้อความ..."
            style={{
              flex: 1,
              padding: "10px 14px",
              borderRadius: 10,
              border: "1px solid #444",
              backgroundColor: "#2b2b2b",
              color: "#fff",
              fontSize: 14,
            }}
          />
          <button type="submit" style={{
            padding: "10px 16px",
            backgroundColor: "#4a90e2",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            fontWeight: "bold",
          }}>
            ส่ง
          </button>
        </form>

        {/* Exchange Panel */}
        <div style={{ padding: 20, backgroundColor: "#1e1e1e", borderTop: "1px solid #333" }}>
          <h4 style={{ marginBottom: 10 }}>📦 เลือก item ของฉัน</h4>
          <div style={{ display: "flex", gap: 10 }}>
            <select
              value={selectedItem1 || ""}
              onChange={(e) => setSelectedItem1(e.target.value)}
              style={{
                flex: 1,
                padding: "8px 12px",
                borderRadius: 8,
                backgroundColor: "#2a2a2a",
                color: "#fff",
                border: "1px solid #444",
              }}
            >
              <option value="">-- เลือก --</option>
              {user1Items.map((item) => (
                <option key={item._id} value={item._id}>{item.title}</option>
              ))}
            </select>
            {selectedItem1 && (
              <button onClick={confirmMyItem} style={{
                backgroundColor: hasClickedConfirm ? "#4caf50" : "#2196f3",
                color: "white",
                padding: "8px 16px",
                border: "none",
                borderRadius: 8,
                fontWeight: "bold",
                cursor: "pointer",
              }}>
                {hasClickedConfirm ? "✅ เรียบร้อย!" : "✅ ยืนยัน"}
              </button>
            )}
          </div>

          <h4 style={{ marginTop: 20 }}>🎁 item ของอีกฝ่าย</h4>
          <div style={{ backgroundColor: "#2c2c2c", padding: 10, borderRadius: 6 }}>
            {confirmedItem2 ? (
              <p>🕵️ อีกฝ่ายเลือก: <strong>{user2Items.find((i) => i._id === confirmedItem2)?.title || "ไม่พบ item"}</strong></p>
            ) : (
              <p>⏳ รออีกฝ่ายเลือก item</p>
            )}
          </div>

          <button
            onClick={toggleExchangeConfirm}
            style={{
              marginTop: 20,
              width: "100%",
              backgroundColor: exchangeConfirm1 ? "#e53935" : "#43a047",
              color: "#fff",
              padding: "12px",
              border: "none",
              borderRadius: 8,
              fontWeight: "bold",
              fontSize: 16,
              cursor: "pointer",
            }}
          >
            {exchangeConfirm1 ? "❌ ยกเลิกการแลกเปลี่ยน" : "✅ ยืนยันการแลกเปลี่ยน"} (
            {(exchangeConfirm1 ? 1 : 0) + (exchangeConfirm2 ? 1 : 0)}/2)
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatApp;
