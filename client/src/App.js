import React from "react";
import "./App.css";
import InputForm from "./components/InputForm.js";
// import Fade from 'react-reveal/Fade';
import axios from "axios";
import Button from "@material-ui/core/Button";

function App() {
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

  const [buttonPressed, setbuttonPressed] = React.useState(false);

  const handleClick = () => {
    console.log(
      `https://torre-job-matcher.rj.r.appspot.com/api/match/?text=${oportunity}&size=10&offset=0&username=${username}`
    );
    setbuttonPressed(true);
    axios
      .get(
        `https://torre-job-matcher.rj.r.appspot.com/api/match/?text=${oportunity}&size=10&offset=0&username=${username}`
      )
      .then((response) => {
        setMatchData(response.data);
        console.log(response.data);
      });
  };

  return (
    <div className="App">
      <div className="form-container">
        <InputForm
          label="Skill/Opportunity"
          search_type={"opportunity"}
          parentCallback={callback_opportunity}
        />
        <InputForm
          label="Torre User"
          search_type={"people"}
          parentCallback={callback_username}
        />
      </div>
      <Button variant="contained" onClick={handleClick}>
        Submit
      </Button>
    </div>
  );
}

export default App;
