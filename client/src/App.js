import React from "react";
import axios from "axios";
import "./App.css";

import GetUsername from "./components/GetUsername.js";
import GetDesiredJob from "./components/GetDesiredJob.js";
import UserProfile from "./components/UserProfile.js";

import CircularProgress from "@material-ui/core/CircularProgress";

export default function App() {
  const [opportunity, setOportunity] = React.useState("");
  const callback_opportunity = (data) => {
    setOportunity(data.name);
    console.log("callback_opportunity", data);
  };

  const [username, setUsername] = React.useState("");
  const callback_username = (data) => {
    setUsername(data.username);
    console.log("callback_username", data);
  };

  const [userData, setUserData] = React.useState({});
  const [jobData, setJobData] = React.useState({});
  const [matchData, setMatchData] = React.useState({});

  React.useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `https://torre-job-matcher.rj.r.appspot.com/api/user/${username}`
      );
      setUserData(data);
    })();
  }, [username]);

  return (
    <div className="App">
      <div className="user-container">
        {username === "" ? (
          <GetUsername parentCallback={callback_username} />
        ) : userData?.username ? (
          <UserProfile userData={userData} />
        ) : (
          <CircularProgress style={{ color: "#CDDC39" }} />
        )}
      </div>
      <div className="job-container">
        {opportunity === "" ? (
          <GetDesiredJob parentCallback={callback_opportunity} />
        ) : (
          <p>{opportunity}</p>
        )}
      </div>
    </div>
  );
}
