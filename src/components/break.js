import React from "react";

function Break(props) {
  return (
    <div className="mb-10">
      {props.times.start.length > 0
        ? props.times.start.map((s, i) => (
            <div>
              {s !== undefined && props.times.startFinish[i] !== undefined ? (
                <div className="workTime rounded py-2 text-white mt-6 text-xl font-bold text-center">
                  <p>
                    {"Worked from " + s + " to " + props.times.startFinish[i]}
                  </p>
                </div>
              ) : (
                <div className="waitTime rounded py-2 text-white mt-6 text-xl font-bold text-center">
                  <p>Keep it up....</p>
                </div>
              )}

              {props.times.startFinish[i] !== undefined &&
              props.times.start[i + 1] !== undefined ? (
                <div className="breakTime rounded py-2 text-white mt-6 text-xl font-bold text-center">
                  <p>
                    {"Relaxed from " +
                      props.times.startFinish[i] +
                      " to " +
                      props.times.start[i + 1]}
                  </p>
                </div>
              ) : props.times.startFinish[i] !== undefined &&
                props.times.start[i + 1] === undefined ? (
                <div className="waitTime rounded py-2 text-white mt-6 text-xl font-bold text-center">
                  <p>Just chilling....</p>
                </div>
              ) : null}
            </div>
          ))
        : null}
    </div>
  );
}

export default Break;
