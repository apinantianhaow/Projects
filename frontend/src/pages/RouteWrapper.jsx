import React from "react";
import { useParams } from "react-router-dom";
import ChatApp from "./ChatApp"; // ✅ ตรวจให้แน่ใจว่า path ตรงกับที่คุณเก็บ ChatApp.jsx

const RouteWrapper = () => {
  const { currentUserId, chattingWithId } = useParams();

  return (
    <ChatApp
      currentUserId={currentUserId}
      chattingWithId={chattingWithId}
    />
  );
};

export default RouteWrapper;
