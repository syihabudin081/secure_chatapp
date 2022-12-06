import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/storage";
import CryptoJS from "crypto-js";
import { storage } from "../config/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Link } from "react-router-dom";

function EncryptFile() {
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState("");
  const [progresspercent, setProgresspercent] = useState(0);
  const [imgUrl, setImgUrl] = useState(null);
  const [decryptedFile, setDecryptedFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleEncrypt = () => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const encrypted = CryptoJS.AES.encrypt(event.target.result, password);
      const encryptedFile = new Blob([encrypted], { type: file.type });

      if (!file) return;
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, encryptedFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgresspercent(progress);
        },
        (error) => {
          alert(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      setImgUrl(downloadURL)
          });
        }
      );
    };
    reader.readAsDataURL(file);
  };

  const handleDecrypt = () => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const encrypted = event.target.result;
      const decrypted = CryptoJS.AES.decrypt(encrypted, password);
      const decryptedFile = new Blob([decrypted], { type: file.type });
      setDecryptedFile(decryptedFile);
      // Do something with the decrypted file, such as save it to disk or display it on the page
    };
    reader.readAsDataURL(file);
  };

  return (
    // <div>
    //   <input type="file" onChange={handleFileChange} />
    //   <input
    //     type="password"
    //     onChange={handlePasswordChange}
    //     className="bg-red-200"
    //   />
    //   <button onClick={handleEncrypt}>Encrypt and Save to Firebase</button>
    // </div>
    <div className="h-100 w-full flex flex-col items-center justify-center bg-teal-lightest font-sans ">
      <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 ">
        <div className="mb-4 ">
          <div className="flex justify-between bg-blue-400 p-3 rounded full items-center">
            <div className="flex gap-1 items-center">
              {" "}
              <img
                className="w-8 h-8 mr-2"
                src="https://cdn-icons-png.flaticon.com/512/2387/2387679.png"
                alt="logo"
              />
              <h1 className="text-white font-bold">Encrypt Image</h1>
            </div>

            <Link to="/chatpage">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-lg  h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/150/150519.png"
                  className="w-6 h-6"
                />
              </button>
            </Link>
          </div>

          <div class="flex justify-start my-6">
            <div class="mb-3 w-96">
              <label
                for="formFile"
                class="form-label inline-block mb-2 text-gray-700"
              >
                Default file input example
              </label>
              <input
                class="form-control
  block
  w-full
  px-3
  py-1.5
  text-base
  font-normal
  text-gray-700
  bg-white bg-clip-padding
  border border-solid border-gray-300
  rounded
  transition
  ease-in-out
  m-0
  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                type="file"
                id="formFile"
                onChange={handleFileChange}
              />
            </div>
          </div>
          <div className="flex-col my-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3  text-grey-darker"
              placeholder="Password"
              type="password"
              onChange={handlePasswordChange}
            />
          </div>
          <a href={imgUrl} download>download</a>
          <button
            type="button"
            class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            onClick={handleEncrypt}
          >
            Add todo
          </button>
        </div>
      </div>
      <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 ">
        <div className="mb-4 ">
          <div className="flex justify-between bg-blue-400 p-3 rounded full items-center">
            <div className="flex gap-1 items-center">
              {" "}
              <img
                className="w-8 h-8 mr-2"
                src="https://cdn-icons-png.flaticon.com/512/2387/2387679.png"
                alt="logo"
              />
              <h1 className="text-white font-bold">Decrypt Imaget</h1>
            </div>

            <Link to="/chatpage">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-lg  h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/150/150519.png"
                  className="w-6 h-6"
                />
              </button>
            </Link>
          </div>

          <div class="flex justify-start my-6">
            <div class="mb-3 w-96">
              <label
                for="formFile"
                class="form-label inline-block mb-2 text-gray-700"
              >
                Default file input example
              </label>
              <input
                class="form-control
  block
  w-full
  px-3
  py-1.5
  text-base
  font-normal
  text-gray-700
  bg-white bg-clip-padding
  border border-solid border-gray-300
  rounded
  transition
  ease-in-out
  m-0
  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                type="file"
                id="formFile"
                onChange={handleFileChange}
              />
            </div>
          </div>
          <div className="flex-col my-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3  text-grey-darker"
              placeholder="Password"
              type="password"
              onChange={handlePasswordChange}
            />
          </div>
          
          <button
            type="button"
            class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            onClick={handleDecrypt}
          >
            Add todo
          </button>
        </div>
      </div>

      <img src={decryptedFile} />
    </div>
  );
}

export default EncryptFile;
