import React, { useState, useEffect } from "react";
import Firestore from "../src/firebase";
import exitIcon from "./icons/sign-out-alt-solid.svg";
import shareIcon from "./icons/share-alt-solid.svg";

function useSessions(props) {
  const [times, setTimes] = useState([]);

  useEffect(() => {
    Firestore.firestore()
      .collection("users")
      .doc(props.uid)
      .onSnapshot((snapshot) => {
        const newTimes = snapshot.data();
        setTimes([...times, newTimes]);
      });
    // eslint-disable-next-line
  }, []);

  return times;
}

function Credits(props) {
  const sessions = useSessions(props);

  return (
    <div className="credits">
      <div className="justify-center text-center">
        <p className="text-4xl font-bold mx-4 pt-10">PROCRASTINATOR</p>
      </div>

      <div className="text-center wrapper historyDiv">
        <h2
          className="font-bold text-3xl my-4 px-12"
          style={{ color: "#5356db" }}
        >
          Your History:
        </h2>
        <ul className="font-bold text-xl">
          {sessions.map((task, i) => {
            try {
              return task.tasks.map((logged, index) => {
                const hours = Math.floor(logged.time / 3600);
                const minutes = Math.floor((logged.time % 3600) / 60);
                const seconds = (logged.time % 3600) % 60;

                return (
                  <li key={index} className="historyTime my-6 rounded py-2">
                    <span className="text-white">{logged.task}: </span>
                    <span className="text-white">
                      {("0" + hours).slice(-2)}:{("0" + minutes).slice(-2)}:
                      {("0" + seconds).slice(-2)}
                    </span>
                  </li>
                );
              });
            } catch {
              return <p>You haven't been very productive</p>;
            }
          })}
        </ul>
      </div>

      <div className="flex justify-center footerIcons pl-4 pb-1">
        <img
          className="rounded bg-red-500 text-white font-bold my-2 signOut mx-1 px-2"
          style={{ cursor: "pointer", maxWidth: "3rem" }}
          onClick={() => props.signOut()}
          src={exitIcon}
          alt="logout"
        />
        <img
          className="rounded text-white font-bold my-2 share mx-1 px-3 py-1"
          style={{ cursor: "pointer", maxWidth: "3rem" }}
          onClick={() => props.signOut()}
          src={shareIcon}
          alt="share"
        />
      </div>

      <div className="footer">
        <p className="text-center">@ryanblakefair</p>
      </div>
    </div>
  );
}

export default Credits;
