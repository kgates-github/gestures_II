import React, { useEffect, useRef, useState } from 'react';
import { GestureRecognizer, FilesetResolver } from '@mediapipe/tasks-vision';

function TestComponent() {
  const [webCamRunning, setWebcamRunning] = useState(false);
  let gestureRecognizer;
  let webcamRunning = false;
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const enableWebcamButtonRef = useRef(null);
  const runningMode = "worker";
  
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
        runningMode: runningMode
      });
      
      
      // Check if webcam access is supported.
      function hasGetUserMedia() {
        return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
      }
      
      if (hasGetUserMedia()) {
       //enableWebcamButton = document.getElementById("webcamButton");
        enableWebcamButton.addEventListener("click", enableCam);
      } else {
        console.warn("getUserMedia() is not supported by your browser");
      }

      // Enable the live webcam view and start detection.
      function enableCam(event) {
        if (!gestureRecognizer) {
          alert("Please wait for gestureRecognizer to load");
          return;
        }
        
        setWebcamRunning(true);
          //webcamButtonContainer.style.display = "none";
          //document.getElementById('loading-01').style.display = "flex";
        
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
        
        /*
        // Now let's start detecting the stream.
        if (runningMode === "IMAGE") {
          runningMode = "VIDEO";
          await gestureRecognizer.setOptions({ runningMode: "VIDEO", numHands:2 });
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
              gestureChange(categoryName);
            }
      
            const iconName = (categoryName in gestureIconMap) ? gestureIconMap[categoryName] : 'icon_cursor';
           }
        } 
        // Call this function again to keep predicting when the browser is ready.
      
        if (webcamRunning === true) {
          window.requestAnimationFrame(predictWebcam);
        }
        */
      }
    };
    createGestureRecognizer();
  }, []);

  return (
    <>
      <div class="outer-container" style={{ position: "absolute", zIndex:10 }}>
        <div id="webcamButtonContainer">
          <div class="annotations">This prototype uses your webcam to recognize hand gestures.</div>
          <div ref={enableWebcamButtonRef}  id="webcamButton">
            <span class="mdc-button__label">Enable Webcam</span>
          </div> 
          <div style={{height:"100px"}}></div>
        </div>
      </div>

      <div style={{ position: "absolute", zIndex:10 }}>
        <video ref={videoRef} s 
          style={{ position: "absolute", display: "none", left: "0px", top: "0px", width: "100%", height: "100%" }} autoplay playsinline></video>
        <canvas ref={canvasRef} class="output_canvas" id="output_canvas" 
          style={{ position: "absolute", display: "none", left: "0px", top: "0px",  width: "100%", height: "100%" }}></canvas>
      </div>
    </>
  );
}

export default TestComponent;



