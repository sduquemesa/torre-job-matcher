import React from "react";
import axios from "axios";
import "./App.css";

import Fade from "@material-ui/core/Fade";

import GetUsername from "./components/GetUsername.js";
import GetDesiredJob from "./components/GetDesiredJob.js";
import UserProfile from "./components/UserProfile.js";
import MatchInfograph from "./components/MatchInfograph.js";

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
  const [matchData, setMatchData] = React.useState({});

  const [step, setStep] = React.useState(1);

  React.useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `https://torre-job-matcher.rj.r.appspot.com/api/user/${username}`
      );
      setUserData(data);
      setStep(step + 1);
    })();
  }, [username]);

  React.useEffect(() => {
    if (username !== "" && opportunity !== "")
      (async () => {
        const { data } = await axios.get(
          `https://torre-job-matcher.rj.r.appspot.com/api/match/?text=${opportunity}&size=5&offset=0&username=${username}`
        );
        setMatchData(data);
      })();
  }, [opportunity, username]);

  return (
    <div className="App">
      {username === "" ? (
        <div className={"user-container-question"}>
          <GetUsername parentCallback={callback_username} />
        </div>
      ) : userData?.username ? (
        <div className={"user-container"}>
          <UserProfile userData={userData} />
        </div>
      ) : (
        <div className={"user-container-question"}>
          <CircularProgress style={{ color: "#CDDC39" }} />
        </div>
      )}

      <div className="job-container">
        <Fade in={step === 2}>
          {opportunity === "" && step === 2 ? (
            <GetDesiredJob parentCallback={callback_opportunity} />
          ) : userData?.name !== undefined &&
            matchData?.global_match_score !== undefined ? (
            <MatchInfograph
              userData={userData}
              matchData={matchData}
              opportunity={opportunity}
            />
          ) : (
            <CircularProgress style={{ color: "#CDDC39" }} />
          )}
        </Fade>
      </div>
    </div>
  );
}
