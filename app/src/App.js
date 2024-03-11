
import './App.css';
import GestureCapturer from './components/GestureCapturer';
import Main from './components/Main';
import React, { useState } from 'react';


function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  // Set up our custom gesture events
  const subscribe = (eventName, listener) => {
    console.log('Subscribing to', eventName);
    document.addEventListener(eventName, listener);
  }
  
  const unsubscribe = (eventName, listener) => {
    console.log('Unsubscribing from', eventName);
    document.removeEventListener(eventName, listener);
  }
  
  const publish = (eventName, data) => {
    const event = new CustomEvent(eventName, { detail: data });
    //console.log('publishing event', eventName, data);
    document.dispatchEvent(event);
  }
  
  return (
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

    </div>
  );
}

export default App;
