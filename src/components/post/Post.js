import React from "react";
import Avatar from "@mui/material/Avatar";
import "./Post.css";

const Post = ({ username, caption, imageUrl }) => {
  return (
    <div className="post">
      <div className="post__header">
        <Avatar
          className="post__avatar"
          alt="rafeh qazi"
          src="https://cdn4.iconfinder.com/data/icons/party-line/2048/2618_-_Man-512.png"
        />

        <h3>{username}</h3>
      </div>

      <img src={imageUrl} alt="" className="post__image" />

      <h4 className="post__text">
        {" "}
        <strong>{username}</strong> : {caption}
      </h4>
    </div>
  );
};

export default Post;
