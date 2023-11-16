import React, { useEffect, useState } from "react";
import "./chat.css";
import { getDatabase, ref, push, set, onChildAdded } from "firebase/database";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

const Chat = () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const GoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        setUser({ name: result.user.displayName, email: result.user.email });
        console.log(token, user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const [user, setUser] = useState("");
  const [chat, setChat] = useState([]);

  const [msg, setMsg] = useState("");

  const db = getDatabase();
  const chatListRef = ref(db, "chat");

  const updateHeight = () => {
    const e = document.getElementById("chat");
    if (e) {
      e.scrollTop = e.scrollHeight;
    }
  };

  useEffect(() => {
    onChildAdded(chatListRef, (data) => {
      setChat((chat) => [...chat, data.val()]);
      setTimeout(() => {
        updateHeight();
      }, 100);
    });
  }, []);

  const SendChat = () => {
    const chatRef = push(chatListRef);
    set(chatRef, {
      user,
      massage: msg,
    });
    setMsg("");
  };

  //   const SendChat = () => {
  //     const c = [...chat];
  //     c.push({ name, massage: msg });
  //     setChat(c);
  //     setMsg("");
  //   };

  return (
    <div style={{ backgroundColor: "darkgrey", height: "630px" }}>
      {user.email ? null : (
        // <input
        //   className="nameInput"
        //   type="text"
        //   placeholder="Enter Name to Start Chatting"
        //   onBlur={(e) => setUser(e.target.value)}
        // ></input>
        <button type="btn" className="signIn" onClick={GoogleLogin}>
          Sign In
        </button>
      )}

      {user.email ? (
        <>
          <div className="_3W2ap">
            <div className="_30scZ Mk0Bp">
              <span
                dir="auto"
                aria-label=""
                className="ggj6brxn gfz4du6o r7fjleex g0rxnol2 lhj4utae le5p0ye3 l7jjieqr _11JPr"
                style={{ minHeight: "0px", marginLeft: "44%" }}
              >
                {user.name}
                <span data-icon="psa-verified" className="">
                  <svg
                    viewBox="0 0 18 18"
                    height="18"
                    width="18"
                    preserveAspectRatio="xMidYMid meet"
                    className=""
                    version="1.1"
                    x="px"
                    y="0px"
                    enable-background="new 0 0 18 18"
                  >
                    <polygon
                      id="Star-2"
                      fill="#00DA60"
                      points="9,16 7.1,16.9 5.8,15.2 3.7,15.1 3.4,13 1.5,12 2.2,9.9 1.1,8.2 2.6,6.7 2.4,4.6 4.5,4 5.3,2 7.4,2.4 9,1.1 10.7,2.4 12.7,2 13.6,4 15.6,4.6 15.5,6.7 17,8.2 15.9,9.9 16.5,12 14.7,13 14.3,15.1 12.2,15.2 10.9,16.9 "
                    ></polygon>
                    <polygon
                      id="Check-Icon"
                      fill="#FFFFFF"
                      points="13.1,7.3 12.2,6.5 8.1,10.6 5.9,8.5 5,9.4 8,12.4 "
                    ></polygon>
                  </svg>
                </span>
              </span>
            </div>
          </div>
          <hr />
          <div id="chat" className="chat-cointainer">
            {chat.map((c, i) => (
              <div
                key={i}
                className={`container ${
                  c.user.email === user.email ? "me" : ""
                }`}
              >
                <p className="chatbox">
                  <strong>{c.user.name} </strong> : {c.massage}
                </p>
              </div>
            ))}
          </div>
          <div className="btm">
            <input
              type="text"
              onChange={(e) => setMsg(e.target.value)}
              value={msg}
              placeholder="Enter here Your Message..."
            ></input>
            <button
              data-tab="11"
              aria-label="Send"
              style={{ backgroundColor: "green" }}
              onClick={(e) => SendChat()}
            >
              <span data-icon="send" className="">
                <svg
                  viewBox="0 0 24 24"
                  height="13"
                  width="20"
                  preserveAspectRatio="xMidYMid meet"
                  className=""
                  version="1.1"
                  x="0px"
                  y="0px"
                  enable-background="new 0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M1.101,21.757L23.8,12.028L1.101,2.3l0.011,7.912l13.623,1.816L1.112,13.845 L1.101,21.757z"
                  ></path>
                </svg>
              </span>
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Chat;
