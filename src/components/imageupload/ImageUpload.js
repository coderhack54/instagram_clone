import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { storage } from "../../firebase";
import { db } from "../../firebase";
import "./ImageUpload.css";
import { collection, serverTimestamp } from "firebase/firestore";

import {
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { addDoc, doc } from "firebase/firestore";

const ImageUpload = ({ username }) => {
  const [caption, setCaption] = useState("");
  const [progress, setProgress] = useState(0);
  const postCollectionRef = collection(db, "posts");
  const [image, setImage] = useState(null);
  const handleChange = (e) => {
    if (e.target.files[0]) setImage(e.target.files[0]);
  };
  const handleUpload = () => {
    const imageref = ref(storage, `images/${image.name}`);
    const uploadTask = uploadBytesResumable(imageref, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        console.log("error in uploadtask on", error);
        // alert(error.message);
      },
      () => {
        //complete function
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // post image inside database
          const addData = async () => {
            try {
              await addDoc(postCollectionRef, {
                timestamp: serverTimestamp(),
                caption: caption,
                imageUrl: downloadURL,
                username: username,
              });
              setProgress(0);
              setImage(null);
              setCaption("");
            } catch (err) {
              console.log(err.message);
            }
          };
          addData();
        });
      }
    );
  };

  useEffect(() => {
    console.log("the value of files is ", image);
  }, [image]);

  return (
    <div className="imageupload">
      <progress
        max="100"
        className="imageupload__progress"
        value={progress}
      ></progress>
      <input
        type="text"
        value={caption}
        placeholder="enter a caption ..."
        onChange={(e) => setCaption(e.target.value)}
      />
      <input type="file" onChange={handleChange} />
      <Button onClick={handleUpload}>Upload</Button>
    </div>
  );
};

export default ImageUpload;
