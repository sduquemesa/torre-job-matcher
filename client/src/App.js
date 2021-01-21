import React from 'react';
import './App.css';
import InputForm from './components/InputForm.js';

function App() {
  const [oportunity, setOportunity] = React.useState('');
  const callback_opportunity = (data) => { setOportunity(data) };

  const [username, setUsername] = React.useState('');
  const callback_username = (data) => { setUsername(data) };

  React.useEffect(() => {
    console.log(oportunity,username);
  }, [oportunity, username])

  return (
    <div className="App">
      <InputForm label='Torre Opportunity' search_type={'opportunity'} parentCallback = {callback_opportunity}/>
      <InputForm label='Torre User' search_type={'people'} parentCallback = {callback_username}/>
    </div>
  );
}

export default App;
