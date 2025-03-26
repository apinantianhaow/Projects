import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Background from "../components/Background";
import Category from "../components/Category";
import Footer from "../components/Footer";
import PostCard from "../components/Postcard";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);

  return (
    <div>
      <Navbar />
      <Background />
      <Category />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
