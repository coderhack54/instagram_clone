import logo from './logo.svg';
import './App.css';
import Post from "./components/post/Post";
import { useState } from "react";

function App() {
  const [posts, setPosts] = useState([
    {
      username: "anmol",
      caption: "DOPE",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/K6ka_self-portrait_2022-08-09_serious_face.jpg/700px-K6ka_self-portrait_2022-08-09_serious_face.jpg",
    },
    {
      username: "sssonny",
      caption: "Enjoying the build",
      imageUrl:
        "https://zimtherapy.com/wp-content/uploads/2022/03/Individual-Man-700px.jpg",
    },
    {
      username: "cleverqazi",
      caption: "WE got this",
      imageUrl:
        "https://cdn.shopify.com/s/files/1/0865/4558/products/otus.jpg?v=1432665626",
    },
  ]);
  return (
    <div className="app">
      {/* Header */}
      <div className="app__header">
        <img
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt="Instagram Logo"
          className="app__headerImage"
        />
      </div>
      <h1>hello</h1>
      {posts.map((post) => (
        <Post
          username={post.username}
          caption={post.caption}
          imageUrl={post.imageUrl}
        />
      ))}

      {/* Posts */}
      {/* Post */}
    </div>
  );
}

export default App;
