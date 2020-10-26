import React from "react";
import firebase from "../firebase";
import Timer from "./timer";
import Credits from "../credits";
const db = firebase.firestore();

function addToDB(task, count, uid) {
  db.collection("users")
    .doc(uid)
    .update({
      tasks: firebase.firestore.FieldValue.arrayUnion({
        task,
        time: count,
      }),
    });
}

function Studier(props) {
  const mins = 0;

  return (
    <div>
      <Timer
        mins={mins}
        addToDB={addToDB}
        displayName={props.displayName}
        uid={props.uid}
      />
      <Credits uid={props.uid} signOut={props.signOut} />
    </div>
  );
}

export default Studier;
