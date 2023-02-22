import logo from './logo.svg';
import './App.css';
import Post from "./components/post/Post";
import { useState, useEffect } from "react";
import { db, auth } from "./firebase";
import { getDocs, collection, onSnapshot } from "firebase/firestore";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { Input } from "@mui/material";
import { query, orderBy } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { updateProfile, signOut } from "firebase/auth";

import { createTheme } from "@mui/material/styles";
import ImageUpload from "./components/imageupload/ImageUpload";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function App() {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);
  const [openSignIn, setOpenSignIn] = useState(false);

  const signUp = async (event) => {
    event.preventDefault();
    try {
      const authUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      updateProfile(auth.currentUser, {
        displayName: username,
      });
    } catch (err) {
      alert(err.message);
    }
  };

  const signIn = async (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password).catch((err) =>
      alert(err.message)
    );
    setOpenSignIn(false);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        // user has logged in...
        // console.log(authUser);
        setUser(authUser);
      } else {
        // user has logged out ...
        setUser(null);
      }
    });
    return () => {
      // perform some cleanup before executing again
      unsubscribe();
    };
  }, [user, username]);

  const postCollectionRef = collection(db, "posts");
  const q = query(postCollectionRef, orderBy("timestamp"));
  useEffect(() => {
    const getPosts = async () => {
      try {
        // const data = await getDocs(postCollectionRef);

        onSnapshot(postCollectionRef, (snapshot) => {
          setPosts(
            snapshot.docs.map((doc) => ({
              post: doc.data(),
              id: doc.id,
            }))
          );
        });
      } catch (err) {
        console.error(err);
      }
    };
    getPosts();
  }, []);
  return (
    <div className="app">
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {" "}
          <form className="app__signup">
            <center>
              <img
                className="app__headerImage"
                height="40px"
                src="https://assets.stickpng.com/images/5a4e432a2da5ad73df7efe7a.png"
                alt=""
              />
            </center>

            <Input
              type="text"
              placeholder={"username"}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder={"email"}
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              placeholder={"password"}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signUp}>
              Sign Up
            </Button>
          </form>
        </Box>
      </Modal>
      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {" "}
          <form className="app__signup">
            <center>
              <img
                className="app__headerImage"
                height="40px"
                src="https://assets.stickpng.com/images/5a4e432a2da5ad73df7efe7a.png"
                alt=""
              />
            </center>

            <Input
              placeholder={"email"}
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              placeholder={"password"}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signIn}>
              Sign In
            </Button>
          </form>
        </Box>
      </Modal>
      {/* Header */}
      <div className="app__header">
        <img
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt="Instagram Logo"
          className="app__headerImage"
        />
        <div className="app__loginContainer">
          <div className="app__loginleft">
            {!user && (
              <Button onClick={() => setOpenSignIn(true)}>Login</Button>
            )}
          </div>
          <div className="app__signupright">
            {user ? (
              <Button onClick={() => signOut(auth)}>Logout</Button>
            ) : (
              <Button onClick={() => setOpen(true)}>Signup</Button>
            )}
          </div>
        </div>
      </div>

      <h1>hello</h1>
      <div className="app__posts">
        {posts?.map(({ id, post }) => (
          <Post
            key={id}
            postId={id}
            user={user}
            username={post.username}
            caption={post.caption}
            imageUrl={post.imageUrl}
          />
        ))}
      </div>
      {user?.displayName ? (
        <ImageUpload username={user.displayName} />
      ) : (
        <h3>Sorry you need to login to upload</h3>
      )}
    </div>
  );
}

export default App;
