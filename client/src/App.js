import React from "react";
import "./App.css";

import GetUsername from "./components/GetUsername.js";
import GetDesiredJob from "./components/GetDesiredJob.js";

export default function App() {
  const [oportunity, setOportunity] = React.useState("");
  const callback_opportunity = (data) => {
    setOportunity(data.name);
    console.log("callback_opportunity", data);
  };

  const [username, setUsername] = React.useState("");
  const callback_username = (data) => {
    setUsername(data.username);
    console.log("callback_username", data);
  };

  const [matchData, setMatchData] = React.useState({});

  return (
    <div className="App">
      <div className="user-container">
        <GetUsername parentCallback={callback_username} />
      </div>
      <div className="job-container">
        <GetDesiredJob parentCallback={callback_opportunity} />
      </div>
    </div>
  );
}
