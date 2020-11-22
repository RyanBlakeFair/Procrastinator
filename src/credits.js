import React, { useState, useEffect } from "react";
import db from "../src/firebase";
import exitIcon from "./icons/sign-out-alt-solid.svg";
import timesIcon from "./icons/times-solid.svg";

function getUsers(setUsers, setLoading) {
  const users = [];
  db.firestore()
    .collection("users")
    .onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() });
      });

      setUsers(users);
      setLoading(false);
    });
}

function removeData(i, props) {
  db.firestore
    .collection("users")
    .doc(props.uid)
    .update({
      [i]: db.firestore.FieldValue.delete(),
    });

  // db.firestore()
  //   .collection("users")
  //   .doc(props.uid)
  //   .onSnapshot((snapshot) => {
  //     const toDelete = snapshot.data().tasks[i];

  //     console.log(toDelete);
  //   });
}

function Credits(props) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const names = [
    { id: "p2pEw0wZOldFzCO625HYcd2GGhq2", name: "Ryan" },
    { id: "2p7bjfThCoNpFMQiet7tssm1Ho43", name: "Brittney" },
    { id: "QmbfG9COWfXq9BASxRsIJ8xoxIh1", name: "Andrew" },
    { id: "kSl0J7XZ23WOvHJC1tNcnqkDBYV2", name: "Gideon" },
    { id: "", name: "Ephraim" },
    { id: "", name: "Kane" },
  ];

  useEffect(() => {
    getUsers(setUsers, setLoading);
  }, []);

  switch (loading) {
    case false:
      return (
        <div className="credits">
          <div className="justify-center text-center">
            <p className="text-4xl font-bold mx-4 pt-10">PROCRASTINATOR</p>
          </div>

          <h2
            className="font-bold text-3xl my-4 px-12 text-center"
            style={{ color: "#5356db" }}
          >
            History
          </h2>
          <div className="text-center historyDiv grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6">
            {users.map((user, i) => {
              return (
                <ul>
                  {names
                    .filter((person) => person.id === user.id)
                    .map((filteredPerson) => (
                      <h1 className="text-2xl font-bold">
                        {filteredPerson.name}
                      </h1>
                    ))}

                  {user.tasks.map((logged, index) => {
                    const hours = Math.floor(logged.time / 3600);
                    const minutes = Math.floor((logged.time % 3600) / 60);
                    const seconds = (logged.time % 3600) % 60;
                    return (
                      <li className="flex flex-row">
                        <div
                          key={index}
                          className="historyTime w-full my-6 rounded py-2"
                        >
                          <span className="text-white">{logged.task}: </span>
                          <span className="text-white">
                            {("0" + hours).slice(-2)}:
                            {("0" + minutes).slice(-2)}:
                            {("0" + seconds).slice(-2)}
                          </span>
                        </div>
                        <button onClick={() => removeData(index, props)}>
                          <img
                            src={timesIcon}
                            alt="x"
                            className="rounded bg-red-500 text-white signOut mx-1 px-4 w-12"
                            style={{ height: "40px" }}
                          />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              );
            })}
          </div>

          <div className="flex justify-center footerIcons pl-4 pb-1">
            <img
              className="rounded bg-red-500 text-white font-bold my-2 signOut mx-1 px-2"
              style={{ cursor: "pointer", maxWidth: "3rem" }}
              onClick={() => props.signOut()}
              src={exitIcon}
              alt="logout"
            />
          </div>

          <div className="footer">
            <p className="text-center">@ryanblakefair</p>
          </div>
        </div>
      );

    default:
      return <p>loading</p>;
  }
}

export default Credits;
