
import './App.css';
import GestureCapturer from './components/GestureCapturer';
import Main from './components/Main';
import Log from './components/Log';
import React, { useState, useContext } from 'react';
import { LogContext } from './components/LogContext';



function App() {
  const [logEntries, setLogEntries] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [introDisplay, setIntroDisplay] = useState('none');

  const log = (entry) => {
    setLogEntries(prevEntries => [...prevEntries, entry]);
  }

  // Set up our custom gesture events
  const subscribe = (eventName, listener) => {
    log('Subscribing to ' + eventName);
    document.addEventListener(eventName, listener);
  }
  
  const unsubscribe = (eventName, listener) => {
    log('Unsubscribing from ' + eventName);
    document.removeEventListener(eventName, listener);
  }
  
  const publish = (eventName, data) => {
    const event = new CustomEvent(eventName, { detail: data });
    //console.log('publishing event', eventName, data);
    document.dispatchEvent(event);
  }
  
  return (
    <LogContext.Provider value={log}>
      <div className="App">
        <GestureCapturer 
          publish={publish} 
          setIsLoaded={setIsLoaded} 
          introDisplay={introDisplay}
          setIntroDisplay={setIntroDisplay}
        />
        <div className="header">
          <div style={{flex:1}}></div>
          <div className="title">
            <div className="header-06">Gestures II</div>
          </div>
          <div style={{flex:1}}></div>
        </div>
        {isLoaded ? <Main subscribe={subscribe} unsubscribe={unsubscribe} setIntroDisplay={setIntroDisplay}/> : null}
        <Log entries={logEntries}/>
      </div>
    </LogContext.Provider>
  );
}

export default App;
