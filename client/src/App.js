import React from 'react';
import './App.css';
import InputForm from './components/InputForm.js';
import Fade from 'react-reveal/Fade';
import axios from 'axios';

function App() {
  const [oportunity, setOportunity] = React.useState('');
  const callback_opportunity = (data) => { setOportunity(data) };

  const [username, setUsername] = React.useState('');
  const callback_username = (data) => { setUsername(data) };

  const [matchData, setMatchData] = React.useState({});

  React.useEffect(() => {
    console.log(oportunity, username);
    (async () => {
      if (oportunity !== '' && username !== '') {
        console.log(`http://localhost:3000/api/match/?text=${oportunity}&size=10&offset=0&username=${username}`);
        const response = await axios.get(`http://localhost:3000/api/match/?text=${oportunity}&size=10&offset=0&username=${username}`);
        console.log(response.data);
        setMatchData(response.data);
      }
    })()

  }, [oportunity, username])

  return (
    <div className="App">
      <div className='form-container'>
        {(oportunity === '') ?
          <Fade>
            <InputForm label='Torre Opportunity' search_type={'opportunity'} parentCallback={callback_opportunity} />
          </Fade>
          :
          null
        }
      </div>


      <div className='form-container'>
        {(oportunity !== '' && username === '') ?
          <Fade>
            <InputForm label='Torre User' search_type={'people'} parentCallback={callback_username} />
          </Fade>
          :
          null
        }
      </div>

      {matchData ?
        <div><pre>{JSON.stringify(matchData, null, 2) }</pre></div>
        :
        null
      }

    </div>
  );
}

export default App;
