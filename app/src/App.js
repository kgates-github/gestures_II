
import './App.css';
import GestureCapturer from './components/GestureCapturer';
import Main from './components/Main';
import React, { useState, useContext } from 'react';
import { LogContext } from './components/LogContext';

function Log({ entries }) {
  const new_logs = [...entries].reverse();
  
  return (
    <div className="logs">
      {new_logs.map((entry, index) => (
        <div key={`log-0${index + 1}`} className="log">{entry}</div>
      ))}
    </div>
  );
}

function App() {
  const [logEntries, setLogEntries] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

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
        <GestureCapturer publish={publish} setIsLoaded={setIsLoaded} />
        <div className="header">
          <div style={{flex:1}}></div>
          <div className="title">
            <div className="header-06">Gestures II</div>
          </div>
          <div style={{flex:1}}></div>
        </div>
        {isLoaded ? <Main subscribe={subscribe} unsubscribe={unsubscribe} /> : null}
        <Log entries={logEntries}/>
      </div>
    </LogContext.Provider>
  );
}

export default App;
