import React from "react";

function PostCard({ post }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition-all">
      <img
        src={`http://localhost:5000/uploads/${post.images[0]}`}
        alt={post.title}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h2 className="text-xl font-bold text-[#1E1E1E] mb-2">{post.title}</h2>
    </div>
  );
}

export default PostCard;
