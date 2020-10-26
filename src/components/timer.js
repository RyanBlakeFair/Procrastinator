import React, { useState } from "react";
import plusIcon from "../icons/plusIcon.svg";
import Breaks from "./break";

function Timer(props) {
  const [task, setTask] = useState();
  const [taskSubmit, setTaskSubmit] = useState("crunch time");
  const [startLabel, setStartLabel] = useState(true);
  const [count, setCount] = useState(props.mins);
  const [interv, setInterv] = useState();

  const hours = Math.floor(count / 3600);
  const minutes = Math.floor((count % 3600) / 60);
  const seconds = (count % 3600) % 60;

  const [times, setTimes] = useState({
    start: [],
    startFinish: [],
  });

  function formSubmit(e) {
    e.preventDefault();
    setTaskSubmit(task);
    setTask("");
  }

  function run() {
    var startDate = new Date(),
      startTime =
        (startDate.getHours() % 12) +
        ":" +
        startDate.getMinutes() +
        ":" +
        startDate.getSeconds();

    setTimes({ ...times, start: [...times.start, startTime] });

    setInterv(
      setInterval(() => {
        setCount((prev) => prev + 1);
      }, 1000)
    );
  }

  function stop() {
    clearInterval(interv);

    var breakDate = new Date(),
      breakTime =
        (breakDate.getHours() % 12) +
        ":" +
        breakDate.getMinutes() +
        ":" +
        breakDate.getSeconds();

    setTimes({ ...times, startFinish: [...times.startFinish, breakTime] });
  }

  function toggleStart() {
    if (startLabel) {
      run();
      setStartLabel(!startLabel);
      return;
    }
    stop();
    setStartLabel(!startLabel);
  }

  function handleFinish() {
    props.addToDB(taskSubmit, count, props.uid);

    setTaskSubmit("crunch time");
    setTimes({ start: [], startFinish: [] });

    clearInterval(interv);
    setStartLabel(true);
    setCount(0);
  }

  return (
    <div>
      <div className="wrapper px-2">
        <p
          className="text-4xl text-white text-center font-bold"
          style={{ textTransform: "uppercase" }}
        >
          Hello {props.displayName}
        </p>
        <div className="timerdiv ml-auto mr-auto rounded pb-12 pt-8">
          <p
            className="text-2xl font-bold text-center"
            style={{ textTransform: "uppercase" }}
          >
            {taskSubmit}
          </p>
          <div className="stopwatch font-bold">
            {("0" + hours).slice(-2)}:{("0" + minutes).slice(-2)}:
            {("0" + seconds).slice(-2)}
          </div>
          <div className="text-center pt-4">
            <button
              className="px-6 py-2 mx-2 rounded startbutton text-xl"
              onClick={() => toggleStart()}
            >
              {startLabel ? "START" : "BREAK"}
            </button>
            <button
              className="px-5 py-2 mx-2 rounded startbutton text-xl"
              onClick={() => handleFinish()}
            >
              FINISH
            </button>
          </div>
        </div>

        <div className="mt-10 rounded">
          <form className="addtask ml-auto mr-auto py-4 text-xl flex justify-center">
            <input
              className="mx-4 text-center text-white taskinput"
              placeholder="Enter a task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <button type="submit" onClick={(e) => formSubmit(e)}>
              <img src={plusIcon} alt="plus" />
            </button>
          </form>
        </div>
        <Breaks task={taskSubmit} times={times} />
      </div>
    </div>
  );
}

export default Timer;
