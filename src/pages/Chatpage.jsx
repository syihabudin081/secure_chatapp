/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { useState } from "react";
import {
  
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import db from "../config/firebase";
import CryptoJS from "crypto-js";

function Chatpage() {
 
  const [todos, setTodos] = useState([]);

  let navigate = useNavigate();


  const handleLogout = () => {
    sessionStorage.removeItem("Auth Token");
    navigate("/login");
  };



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

  const decrypttext = (ciphertext) => {
    var decrypted = CryptoJS.AES.decrypt(
      ciphertext,
      "Secret Passphrase"
    ).toString(CryptoJS.enc.Utf8);

    var decrypted2 = CryptoJS.DES.decrypt(
      decrypted,
      "Secret Passphrase"
    ).toString(CryptoJS.enc.Utf8);
    return decrypted2;
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
            <Link to="/addtodo">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-lg  h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/8238/8238019.png"
                  className="w-6 h-6"
                />
              </button>
            </Link>
           
            <Link to="/encryptfile">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-lg  h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
              >
                <img
                  src=" https://cdn-icons-png.flaticon.com/512/44/44289.png"
                  className="w-6 h-6"
                />
              </button>
            </Link>
            <button
                type="button"
                className="inline-flex items-center justify-center rounded-lg  h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
                onClick={handleLogout}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/4400/4400828.png"
                  className="w-6 h-6"
                />
              </button>
          </div>
        </div>

        <div>
          {todos != null ? (
            todos.map((data, index) => (
              <div
                className="flex mb-4 items-center justify-center "
                key={data.id}
              >
                <div className="w-full flex flex-col text-grey-darkest text-xs md:text-base ">
                  <p className="w-full text-grey-darkest font-semibold text-sm md:text-lg">
                    {decrypttext(data.name)}
                  </p>
                  <p className="w-full text-grey-darkest text-xs md:text-base font-light">
                    {decrypttext(data.desc)}
                  </p>
                </div>
                
                  <p className="w-full text-grey-darkest text-xs md:text-base font-light">
                    {decrypttext(data.date)}
                  </p>
               

                {data.status === true ? (
                  <img
                    src="https://img.icons8.com/fluency/512/ok.png"
                    className="w-8 h-8"
                    onClick={() => {
                      handleUpdate(data.id, data.status);
                    }}
                  /> 
                ) : (
                 <img
                    src="https://img.icons8.com/external-flatart-icons-outline-flatarticons/512/external-unchecked-basic-ui-elements-flatart-icons-outline-flatarticons.png"
                    className="w-8 h-8"
                    onClick={() => {
                      handleUpdate(data.id, data.status);
                    }}
                  />
                )}

                <img
                  className="w-8 h-8"
                  onClick={() => {
                    handleDelete(data.id);
                  }}
                  src="https://img.icons8.com/fluency/512/delete-forever.png"
                />
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
