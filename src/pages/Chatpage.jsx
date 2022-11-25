import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { useState } from "react";
import {
  addDoc,
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import db from "../config/firebase";
import CryptoJS from "crypto-js";

function Chatpage() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    let authToken = sessionStorage.getItem("Auth Token");

    if (authToken) {
      navigate("/chatpage");
    }

    if (!authToken) {
      navigate("/login");
    }

    readData();
  }, []);

  const readData = async () => {
    await getDocs(collection(db, "todo")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTodos(newData);
      
    });
  };

  const createdata = async () => {
    try {
      const docRef = await addDoc(collection(db, "todo"), {
        todo: input,
        status: false,
      });

      console.log("Document written with ID: ", docRef.id);
     
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("Auth Token");
    navigate("/login");
  };

  const handleChange = (event) => {
    let value = encrypttext(event.target.value);

    setInput(value);
  };

  const encrypttext = (message) => {
    
    let ciphertext = CryptoJS.AES.encrypt(
      message,
      "secret key ahahah"
    ).toString();
    return ciphertext;
  };

  const decrypttext = (ciphertext) => {
    let decrypted = CryptoJS.AES.decrypt(
      ciphertext,
      "secret key ahahah"
    ).toString(CryptoJS.enc.Utf8);
    
    return decrypted;
  };

  const handleinput = () => {
    createdata();
    readData();
  };

  const handleDelete = (id) => {
    const docRef = doc(db, "todo", id);

    deleteDoc(docRef)
      .then(() => {
        console.log("Entire Document has been deleted successfully.");
      })
      .catch((error) => {
        console.log(error);
      });
    readData();
  };

  const handleUpdate = async (id, status) => {
    const washingtonRef = doc(db, "todo", id);
    console.log(status);
    if (status === true) {
      await updateDoc(washingtonRef, {
        status: false,
      });
    }
    if (status === false) {
      await updateDoc(washingtonRef, {
        status: true,
      });
    }
    readData();
  };

  return (
    <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
      <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
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
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
              onClick={handleLogout}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                />
              </svg>
            </button>
          </div>
          <div className="flex mt-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
              placeholder="Add Todo"
              name="todo"
              value={input.todo}
              onChange={handleChange}
            />
            <button
              className="flex-no-shrink p-2 border-2 rounded text-teal border-blue-500 hover:text-white hover:bg-blue-300"
              onClick={handleinput}
            >
              Add
            </button>
          </div>
        </div>

        <div>
          {todos != null ? (
            todos.map((data, index) => (
              <div className="flex mb-4 items-center" key={data.id}>
                <p className="w-full text-grey-darkest">
                  {decrypttext(data.todo)}
                </p>
                {data.status === true ? (
                  <button
                    className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded text-white hover:text-white text-green bg-green-500 border-green-500 hover:bg-green-500"
                    onClick={() => {
                      handleUpdate(data.id, data.status);
                    }}
                  >
                    Done
                  </button>
                ) : (
                  <button
                    className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green border-green-500 hover:bg-green-500"
                    onClick={() => {
                      handleUpdate(data.id, data.status);
                    }}
                  >
                    Not Done
                  </button>
                )}

                <button
                  className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red-500 hover:text-white hover:bg-red-500"
                  onClick={() => handleDelete(data.id)}
                >
                  Remove
                </button>
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default Chatpage;
