import React, { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import "./Post.css";
import { useState } from "react";
import {
  getDocs,
  collection,
  onSnapshot,
  doc,
  getDoc,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../../firebase";

const Post = ({ postId, user, username, caption, imageUrl }) => {
  const [comments, setComments] = useState();
  const [comment, setComment] = useState();

  const postComment = (event) => {
    event.preventDefault();
    const postCollectionRef = collection(db, `posts/${postId}/comments`);

    addDoc(postCollectionRef, {
      text: comment,
      username: user.displayName,
      timestamp: serverTimestamp(),
    });
    setComment("");
  };

  useEffect(() => {
    const postCollectionRef = collection(db, `posts/${postId}/comments`);
    let unsubscribe;
    if (postId) {
      const q = query(postCollectionRef, orderBy("timestamp"));
      unsubscribe = onSnapshot(postCollectionRef, (snapshot) => {
        snapshot.docs.map((doc) =>
          console.log("this is incoming data", doc.data())
        );
        setComments(snapshot.docs.map((doc) => doc.data()));
      });
    }
    return () => {
      unsubscribe();
    };
  }, [postId]);

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
        <strong>{username}</strong> : {caption}
      </h4>
      <div className="post__comments">
        {comments?.map((comment) => (
          <p>
            <strong>{comment.username}</strong> &nbsp;
            {comment.text}
          </p>
        ))}
      </div>
      <form className="post__commentBox">
        <input
          type="text"
          className="post__input"
          placeholder="Add a comment ..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          className="post__button"
          disabled={!comment}
          type="submit"
          onClick={postComment}
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default Post;
