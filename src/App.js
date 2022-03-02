import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [minutesInput, setMinutesInput] = useState("");
  const [secondsInput, setSecondsInput] = useState("");
  const [isStarted, setIsStarted] = useState(false);
  const [time, setTime] = useState(0);

  const handleReset = () => {
    setTime(0);
    setIsStarted(false);
    setMinutesInput("");
    setSecondsInput("");
  };
  const handleStart = () => {
    setTime(Number(minutesInput) * 60 + Number(secondsInput));
    setIsStarted(true);
  };
  useEffect(() => {
    const timer = setInterval(() => {
      if (isStarted && time > 0) {
        setTime(time - 1);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [isStarted, time]);

  const formatTime = () => {
    const minutes = Math.floor(time / 60);
    const seconds = time - minutes * 60;
    return {
      minutes,
      seconds,
    };
  };
  const formattedTimer = formatTime();
  return (
    <div className="container">
      <label>
        <input
          type="number"
          value={minutesInput}
          onChange={(event) => setMinutesInput(event.target.value)}
        />
        Minutes
      </label>
      <label>
        <input
          type="number"
          value={secondsInput}
          onChange={(event) => setSecondsInput(event.target.value)}
        />
        Seconds
      </label>
      <button onClick={handleStart}>START</button>
      <button onClick={() => setIsStarted(!isStarted)}>PAUSE / RESUME</button>
      <button onClick={handleReset}>RESET</button>

      <h1>
        {`${
          formattedTimer.minutes < 10
            ? "0" + formattedTimer.minutes
            : formattedTimer.minutes
        }`}
        :
        {`${
          formattedTimer.seconds < 10
            ? "0" + formattedTimer.seconds
            : formattedTimer.seconds
        }`}
      </h1>
    </div>
  );
}

export default App;
