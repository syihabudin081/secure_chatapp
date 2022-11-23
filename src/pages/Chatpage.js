import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { GlobalContext } from "../context/context";
import { useState } from "react";
import { addDoc, collection, getDocs } from "firebase/firestore";
import db from "../config/firebase";
function Chatpage() {
  // const { user, setUser } = useContext(GlobalContext);
  const [input, setInput] = useState("");
  const [tododatas, setTodo] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    let authToken = sessionStorage.getItem("Auth Token");
    //    let userdata = sessionStorage.getItem("userdata")
    //    setUser(userdata)
    //  console.log(userdata.email);
    if (authToken) {
      navigate("/chatpage");
    }

    if (!authToken) {
      navigate("/login");
    }
   
   
  }, []);

  const readData = async () => {
    console.log("hai");
    const querySnapshot = await getDocs(collection(db, "todo"));
    querySnapshot.forEach((element) => {
      let data = element.data();
      console.log(data);
      setTodo((arr) => [...arr, data]);
    });
  };

  const createdata = async () => {
    try {
      const docRef = await addDoc(collection(db, "todo"), {
        todo: input,
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
    let value = event.target.value;
    setInput(value);
  };

  const handleinput = () => {
    createdata();
    readData();
  };

  return (
    // <div>
    //   {/* component */}
    //   <div className="flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen w-11/12 mx-auto">
    //     <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
    //       <div className="relative flex items-center space-x-4">
    //         <div className="relative">
    //           <span className="absolute text-green-500 right-0 bottom-0">
    //             <svg width={20} height={20}>
    //               <circle cx={8} cy={8} r={8} fill="currentColor" />
    //             </svg>
    //           </span>
    //           <img
    //             src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144"
    //             alt=""
    //             className="w-10 sm:w-16 h-10 sm:h-16 rounded-full"
    //           />
    //         </div>
    //         <div className="flex flex-col leading-tight">
    //           <div className="text-2xl mt-1 flex items-center">
    //             <span className="text-gray-700 mr-3">user1</span>
    //           </div>
    //           <span className="text-lg text-gray-600">Junior Developer</span>
    //         </div>
    //       </div>
    //       <div className="flex items-center space-x-2">
    //         <button
    //           type="button"
    //           className="inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
    //           onClick={handleLogout}
    //         >
    //           <svg
    //             xmlns="http://www.w3.org/2000/svg"
    //             fill="none"
    //             viewBox="0 0 24 24"
    //             stroke-width="1.5"
    //             stroke="currentColor"
    //             class="w-6 h-6"
    //           >
    //             <path
    //               stroke-linecap="round"
    //               stroke-linejoin="round"
    //               d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
    //             />
    //           </svg>
    //         </button>
    //       </div>
    //     </div>
    //     <div
    //       id="messages"
    //       className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
    //     >
    //       <div className="chat-message">
    //         <div className="flex items-end">
    //           <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
    //             <div>
    //               <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
    //                 Can be verified on any platform using docker
    //               </span>
    //             </div>
    //           </div>
    //           <img
    //             src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144"
    //             alt="My profile"
    //             className="w-6 h-6 rounded-full order-1"
    //           />
    //         </div>
    //       </div>
    //       <div className="chat-message">
    //         <div className="flex items-end justify-end">
    //           <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
    //             <div>
    //               <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">
    //                 Your error message says permission denied, npm global
    //                 installs must be given root privileges.
    //               </span>
    //             </div>
    //           </div>
    //           <img
    //             src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144"
    //             alt="My profile"
    //             className="w-6 h-6 rounded-full order-2"
    //           />
    //         </div>
    //       </div>
    //       <div className="chat-message">
    //         <div className="flex items-end">
    //           <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
    //             <div>
    //               <span className="px-4 py-2 rounded-lg inline-block bg-gray-300 text-gray-600">
    //                 Command was run with root privileges. I'm sure about that.
    //               </span>
    //             </div>
    //             <div>
    //               <span className="px-4 py-2 rounded-lg inline-block bg-gray-300 text-gray-600">
    //                 I've update the description so it's more obviously now
    //               </span>
    //             </div>
    //             <div>
    //               <span className="px-4 py-2 rounded-lg inline-block bg-gray-300 text-gray-600">
    //                 FYI https://askubuntu.com/a/700266/510172
    //               </span>
    //             </div>
    //             <div>
    //               <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
    //                 Check the line above (it ends with a # so, I'm running it as
    //                 root )<pre># npm install -g @vue/devtools</pre>
    //               </span>
    //             </div>
    //           </div>
    //           <img
    //             src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144"
    //             alt="My profile"
    //             className="w-6 h-6 rounded-full order-1"
    //           />
    //         </div>
    //       </div>
    //       <div className="chat-message">
    //         <div className="flex items-end justify-end">
    //           <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
    //             <div>
    //               <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">
    //                 Any updates on this issue? I'm getting the same error when
    //                 trying to install devtools. Thanks
    //               </span>
    //             </div>
    //           </div>
    //           <img
    //             src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144"
    //             alt="My profile"
    //             className="w-6 h-6 rounded-full order-2"
    //           />
    //         </div>
    //       </div>
    //       <div className="chat-message">
    //         <div className="flex items-end">
    //           <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
    //             <div>
    //               <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
    //                 Thanks for your message David. I thought I'm alone with this
    //                 issue. Please, ? the issue to support it :)
    //               </span>
    //             </div>
    //           </div>
    //           <img
    //             src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144"
    //             alt="My profile"
    //             className="w-6 h-6 rounded-full order-1"
    //           />
    //         </div>
    //       </div>
    //       <div className="chat-message">
    //         <div className="flex items-end justify-end">
    //           <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
    //             <div>
    //               <span className="px-4 py-2 rounded-lg inline-block bg-blue-600 text-white ">
    //                 Are you using sudo?
    //               </span>
    //             </div>
    //             <div>
    //               <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">
    //                 Run this command sudo chown -R `whoami` /Users/{"{"}
    //                 {"{"}your_user_profile{"}"}
    //                 {"}"}/.npm-global/ then install the package globally without
    //                 using sudo
    //               </span>
    //             </div>
    //           </div>
    //           <img
    //             src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144"
    //             alt="My profile"
    //             className="w-6 h-6 rounded-full order-2"
    //           />
    //         </div>
    //       </div>
    //       <div className="chat-message">
    //         <div className="flex items-end">
    //           <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
    //             <div>
    //               <span className="px-4 py-2 rounded-lg inline-block bg-gray-300 text-gray-600">
    //                 It seems like you are from Mac OS world. There is no /Users/
    //                 folder on linux ?
    //               </span>
    //             </div>
    //             <div>
    //               <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
    //                 I have no issue with any other packages installed with root
    //                 permission globally.
    //               </span>
    //             </div>
    //           </div>
    //           <img
    //             src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144"
    //             alt="My profile"
    //             className="w-6 h-6 rounded-full order-1"
    //           />
    //         </div>
    //       </div>
    //       <div className="chat-message">
    //         <div className="flex items-end justify-end">
    //           <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
    //             <div>
    //               <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">
    //                 yes, I have a mac. I never had issues with root permission
    //                 as well, but this helped me to solve the problem
    //               </span>
    //             </div>
    //           </div>
    //           <img
    //             src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144"
    //             alt="My profile"
    //             className="w-6 h-6 rounded-full order-2"
    //           />
    //         </div>
    //       </div>
    //       <div className="chat-message">
    //         <div className="flex items-end">
    //           <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
    //             <div>
    //               <span className="px-4 py-2 rounded-lg inline-block bg-gray-300 text-gray-600">
    //                 I get the same error on Arch Linux (also with sudo)
    //               </span>
    //             </div>
    //             <div>
    //               <span className="px-4 py-2 rounded-lg inline-block bg-gray-300 text-gray-600">
    //                 I also have this issue, Here is what I was doing until now:
    //                 #1076
    //               </span>
    //             </div>
    //             <div>
    //               <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
    //                 even i am facing
    //               </span>
    //             </div>
    //           </div>
    //           <img
    //             src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144"
    //             alt="My profile"
    //             className="w-6 h-6 rounded-full order-1"
    //           />
    //         </div>
    //       </div>
    //     </div>
    //     <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
    //       <div className="relative flex">
    //         <span className="absolute inset-y-0 flex items-center">
    //           <button
    //             type="button"
    //             className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
    //           >
    //             <svg
    //               xmlns="http://www.w3.org/2000/svg"
    //               fill="none"
    //               viewBox="0 0 24 24"
    //               stroke="currentColor"
    //               className="h-6 w-6 text-gray-600"
    //             >
    //               <path
    //                 strokeLinecap="round"
    //                 strokeLinejoin="round"
    //                 strokeWidth={2}
    //                 d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
    //               />
    //             </svg>
    //           </button>
    //         </span>
    //         <input
    //           type="text"
    //           placeholder="Write your message!"
    //           className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3"
    //         />
    //         <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
    //           <button
    //             type="button"
    //             className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
    //           >
    //             <svg
    //               xmlns="http://www.w3.org/2000/svg"
    //               fill="none"
    //               viewBox="0 0 24 24"
    //               stroke="currentColor"
    //               className="h-6 w-6 text-gray-600"
    //             >
    //               <path
    //                 strokeLinecap="round"
    //                 strokeLinejoin="round"
    //                 strokeWidth={2}
    //                 d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
    //               />
    //             </svg>
    //           </button>
    //           <button
    //             type="button"
    //             className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
    //           >
    //             <svg
    //               xmlns="http://www.w3.org/2000/svg"
    //               fill="none"
    //               viewBox="0 0 24 24"
    //               stroke="currentColor"
    //               className="h-6 w-6 text-gray-600"
    //             >
    //               <path
    //                 strokeLinecap="round"
    //                 strokeLinejoin="round"
    //                 strokeWidth={2}
    //                 d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
    //               />
    //               <path
    //                 strokeLinecap="round"
    //                 strokeLinejoin="round"
    //                 strokeWidth={2}
    //                 d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
    //               />
    //             </svg>
    //           </button>
    //           <button
    //             type="button"
    //             className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
    //           >
    //             <svg
    //               xmlns="http://www.w3.org/2000/svg"
    //               fill="none"
    //               viewBox="0 0 24 24"
    //               stroke="currentColor"
    //               className="h-6 w-6 text-gray-600"
    //             >
    //               <path
    //                 strokeLinecap="round"
    //                 strokeLinejoin="round"
    //                 strokeWidth={2}
    //                 d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    //               />
    //             </svg>
    //           </button>
    //           <button
    //             type="button"
    //             className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
    //           >
    //             <span className="font-bold">Send</span>
    //             <svg
    //               xmlns="http://www.w3.org/2000/svg"
    //               viewBox="0 0 20 20"
    //               fill="currentColor"
    //               className="h-6 w-6 ml-2 transform rotate-90"
    //             >
    //               <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
    //             </svg>
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   <style
    //     dangerouslySetInnerHTML={{
    //       __html:
    //         "\n.scrollbar-w-2::-webkit-scrollbar {\n  width: 0.25rem;\n  height: 0.25rem;\n}\n\n.scrollbar-track-blue-lighter::-webkit-scrollbar-track {\n  --bg-opacity: 1;\n  background-color: #f7fafc;\n  background-color: rgba(247, 250, 252, var(--bg-opacity));\n}\n\n.scrollbar-thumb-blue::-webkit-scrollbar-thumb {\n  --bg-opacity: 1;\n  background-color: #edf2f7;\n  background-color: rgba(237, 242, 247, var(--bg-opacity));\n}\n\n.scrollbar-thumb-rounded::-webkit-scrollbar-thumb {\n  border-radius: 0.25rem;\n}\n",
    //     }}
    //   />
    // </div>

    <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
      <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
        <div className="mb-4 ">
          <div class="flex justify-between bg-blue-400 p-3 rounded full items-center">
            <div class="flex gap-1 items-center">
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
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
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
          {
            
            tododatas != null ? (
            tododatas.map((data, index) => (
              <div className="flex mb-4 items-center">
                <p className="w-full text-grey-darkest">{data.todo}</p>
                <button className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green border-green-500 hover:bg-green-500">
                  Done
                </button>
                <button className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red-500 hover:text-white hover:bg-red-500">
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
