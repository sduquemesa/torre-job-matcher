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

  // const { promiseInProgress } = usePromiseTracker();

  // React.useEffect(() => {
  //   console.log(oportunity, username);
  //   (async () => {
  //     if (oportunity !== '' && username !== '') {
  //       console.log(`http://torre-job-matcher.rj.r.appspot.com/api/match/?text=${oportunity}&size=10&offset=0&username=${username}`);
  //       const response = await axios.get(`http://torre-job-matcher.rj.r.appspot.com/api/match/?text=${oportunity}&size=10&offset=0&username=${username}`);
  //       console.log(response.data);
  //       setMatchData(response.data);
  //     }
  //   })()

  // }, [oportunity, username])

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
    <div className="app">
      {/* <h1>TORRE | Career Pathways</h1>
      <p>This app compares the user Genome with the available jobs listing from whatever skill/opportunity you choose.</p>
      <p>To do so a Natural Language Processing algorithm is run in order to compare user and job listing data returning the following:  </p>
      <ul>
        <li> a general match score: a number from -1 to 1 related to how close is your genome to the selected skill/opportunity, </li>
        <li> summary of job listings: a summary of the most relevant phrases in the job listing to have a general idea of what are they talking about, </li>
        <li> keyword: a list of keywords extracted from the job listings texts. Having this keywords in your genome will improve your match chances, </li>
        <li> strenghts stats: a comparative of user strenghts and those most required by the job listings. </li>
      
      </ul> */}

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
      {/* <p>{username} {oportunity}</p> */}
      <Button variant="contained" onClick={handleClick}>
        Submit
      </Button>

      {/* {(matchData.global_match_score === undefined && buttonPressed === true) ?
      <p>Loading...</p> : null}

      {matchData.global_match_score === undefined ?
        null
        :
        <ul>
          <li>Match score: {matchData.global_match_score}</li>
          <li>Summary: {matchData.summary}</li>
          <li>Keywords: {matchData.keywords}</li>
        </ul>
      } */}
    </div>
  );
}

export default App;
