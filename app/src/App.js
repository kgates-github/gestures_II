
import './App.css';
import GestureCapturer from './components/GestureCapturer';


function App() {

  // Set up our custom gesture events
  const subscribe = (eventName, listener) => {
    document.addEventListener(eventName, listener);
  }
  
  const unsubscribe = (eventName, listener) => {
    document.removeEventListener(eventName, listener);
  }
  
  const publish = (eventName, data) => {
    const event = new CustomEvent(eventName, { data: data });
    console.log('publishing event', eventName, data);
    document.dispatchEvent(event);
  }
  
  return (
    <div className="App">
      <GestureCapturer publish={publish}/>
      <div className="header">
        <div style={{flex:1}}></div>
        <div className="title">
          <div className="header-06">Gestures II</div>
        </div>
        <div style={{flex:1}}></div>
      </div>
    </div>
  );
}

export default App;
