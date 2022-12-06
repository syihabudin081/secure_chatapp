/* eslint-disable jsx-a11y/alt-text */

import React, { useState } from "react";
import "flowbite";
import { Link, useNavigate } from "react-router-dom";
import "tw-elements";
import Datepicker from "react-tailwindcss-datepicker";
import CryptoJS from "crypto-js";
import { addDoc, collection } from "firebase/firestore";
import db, { storage } from "../config/firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";

import crypto from "crypto-js";

const aesjs = require("aes-js");

function Addtodo() {
  const navigate = useNavigate();

  const [datevalue, setDateValue] = useState({
    startDate: new Date().toLocaleDateString("en-US"),
  });

  const [file, setFile] = useState("");

  const [input, setInput] = useState({
    name: "",
    date: datevalue.startDate,
    desc: "",
    category: "",
  });

  const [progresspercent, setProgresspercent] = useState(0);
  const [imgUrl, setImgUrl] = useState(null);

  const onChange = (event) => {
    const value = event.target.value;
    //   const encryptedvalue = CryptoJS.AES.encrypt(value, "Secret Passphrase").toString();
    // console.log(encryptedvalue);
    // var decrypted = CryptoJS.DES.decrypt(encryptedvalue, "Secret Passphrase").toString(CryptoJS.enc.Utf8);
    let name = event.target.name;
    // console.log(encryptedvalue);
    // console.log(decrypted);
    setInput({ ...input, [name]: value });
  };

  const handleFileChange = async (event) => {
    const image = event.target.files[0];

    const buffer = await image.arrayBuffer();
    let byteArray = new Int8Array(buffer);
    setFile(image);
    console.log(byteArray);
  };



  const handleSubmit = () => {
    createdata();
   
    navigate("/chatpage");
  };

  const encrypttext = (message) => {
    const encryptedvalue = CryptoJS.DES.encrypt(
      message,
      "Secret Passphrase"
    ).toString();
    const encryptedvalue2 = CryptoJS.AES.encrypt(
      encryptedvalue,
      "Secret Passphrase"
    ).toString();
    return encryptedvalue2;
  };

  const createdata = async () => {
    try {
      const docRef = await addDoc(collection(db, "todo"), {
        name: encrypttext(input.name),
        date: encrypttext(input.date),
        desc: encrypttext(input.desc),
        category: encrypttext(input.category),
        status: false,
      });

      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setDateValue(newValue);
  };

  return (
    <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans ">
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
              <h1 className="text-white font-bold">Todo List</h1>
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
          <div className="flex-col my-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3  text-grey-darker"
              placeholder="Add Todo"
              name="name"
              value={input.name}
              onChange={onChange}
            />
          </div>
          <div class="border border-gray-300 rounded-lg my-4">
            <Datepicker
              value={datevalue}
              onChange={handleValueChange}
              asSingle={true}
              placeholder={"Date"}
            />
          </div>
          <div class="flex ">
            <div class="mb-3 xl:w-96">
              <select
                class="form-select appearance-none
      block
      w-full
      px-3
      py-1.5
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding bg-no-repeat
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                aria-label="Default select example"
                onChange={onChange}
                name="category"
              >
                <option defaultValue disabled>
                  Select category
                </option>
                <option value="Personal">Personal</option>
                <option value="Work">Work</option>
                <option value="Not Personal">Not Personal</option>
              </select>
            </div>
          </div>
          <textarea
            value={input.desc}
            onChange={onChange}
            name="desc"
            id="message"
            rows="4"
            class="block p-2.5 w-full my-4 text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Description"
          ></textarea>

      

          <button
            type="button"
            class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            onClick={handleSubmit}
          >
            Add todo
          </button>
        </div>
      </div>
    </div>
  );
}

export default Addtodo;
