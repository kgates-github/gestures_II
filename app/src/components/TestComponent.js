import React, { useEffect, useRef, useState } from 'react';
import { GestureRecognizer, FilesetResolver } from '@mediapipe/tasks-vision';

function TestComponent() {
  const [introOneDisplay, setIntroOneDisplay] = useState('flex');
  const [introTwoDisplay, setIntroTwoDisplay] = useState('none');
  const [introThreeDisplay, setIntroThreeDisplay] = useState('none');
  const [introFourDisplay, setIntroFourDisplay] = useState('none');
  const [webcamRunning, setWebcamRunning] = useState(false);
  let gestureRecognizer;
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const enableWebcamButtonRef = useRef(null);
  const runningMode = "worker";
  let lastVideoTime = null;
  let categoryName = '';
  let results;

  // Set up our custom gesture events
  function subscribe(eventName, listener) {
    document.addEventListener(eventName, listener);
  }
  
  function unsubscribe(eventName, listener) {
    document.removeEventListener(eventName, listener);
  }
  
  function publish(eventName, data) {
    const event = new CustomEvent(eventName, { data: data });
    console.log('publishing event', eventName, data);
    document.dispatchEvent(event);
  }
  
  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const enableWebcamButton = enableWebcamButtonRef.current;

    const createGestureRecognizer = async () => {
      const vision = await FilesetResolver.forVisionTasks("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm");
      gestureRecognizer = await GestureRecognizer.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: "https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task",
          delegate: "GPU"
        },
        runningMode: runningMode,
      });
      setIntroOneDisplay('none');
      setIntroTwoDisplay('flex');
      
      // Check if webcam access is supported.
      function hasGetUserMedia() {
        return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
      }
      
      if (hasGetUserMedia()) {
        enableWebcamButton.addEventListener("click", enableCam);
      } else {
        console.warn("getUserMedia() is not supported by your browser");
      }

      // Enable the live webcam view and start detection.
      function enableCam(event) {
        setIntroTwoDisplay('none');
        setIntroThreeDisplay('flex');
        
        // getUsermedia parameters.
        const constraints = {
          video: true
        };
        // Activate the webcam stream.
        navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
          video.srcObject = stream;
          video.addEventListener("loadeddata", predictWebcam);
        });
      }
      async function predictWebcam() {
        const webcamElement = document.getElementById("webcam");
        setWebcamRunning(true);
        setIntroThreeDisplay('none');
        setIntroFourDisplay('flex');
        
        // Start detecting the stream.
        if (runningMode === "IMAGE") {
          runningMode = "VIDEO";
          await gestureRecognizer.setOptions({ runningMode: "VIDEO", numHands: 1 });
        }

        let nowInMs = Date.now();
        if (video.currentTime !== lastVideoTime) {
          lastVideoTime = video.currentTime;
          results = gestureRecognizer.recognizeForVideo(video, nowInMs);
        }

        if (results.gestures.length > 0) {
          for (let i = 0; i < results.landmarks.length; i++) {
            if (categoryName != results.gestures[i][0].categoryName && results.gestures[i][0].categoryName != 'None') {
              categoryName = results.gestures[i][0].categoryName;
              publish(categoryName, {});
            };
           }
        } 
        
        // Call this function again to keep predicting when the browser is ready.
        if (true) {
          window.requestAnimationFrame(predictWebcam);
        }
        
        
      }
    };
    createGestureRecognizer();
  }, []);

  return (
    <>
      <div className="outerContainer" style={{ display: introOneDisplay, position: "absolute", zIndex:10 }}>
        <div id="innerContainer">
          Loading...
        </div>
      </div>
      <div className="outerContainer" style={{ display: introTwoDisplay, position: "absolute", zIndex:10 }}>
        <div id="innerContainer">
          <div className="annotations">This prototype uses your webcam to recognize hand gestures.</div>
          <div ref={enableWebcamButtonRef}  id="webcamButton">
            <span className="mdc-button__label">Enable Webcam</span>
          </div> 
          <div style={{height:"100px"}}></div>
        </div>
      </div>
      <div className="outerContainer" style={{ display: introThreeDisplay, position: "absolute", zIndex:10 }}>
        <div id="innerContainer">
         Staring camera...
        </div>
      </div>
      <div className="outerContainer" style={{ display: introFourDisplay, position: "absolute", zIndex:10 }}>
        <div id="innerContainer">
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            
            <img src={process.env.PUBLIC_URL + '/svg/icon_palm_open.svg'} 
              alt="open hand" 
              style={{width:'60px', height:'60px'}}
              />to open a dialog...
          </div>
        </div>
      </div>

      <div style={{ position: "absolute", zIndex:10 }}>
        <video ref={videoRef}
          style={{ position: "absolute", display: "none", left: "0px", top: "0px", width: "100%", height: "100%" }} autoPlay playsInline></video>
        <canvas ref={canvasRef} className="output_canvas" id="output_canvas" 
          style={{ position: "absolute", display: "none", left: "0px", top: "0px",  width: "100%", height: "100%" }}></canvas>
      </div>
    </>
  );
}

export default TestComponent;



