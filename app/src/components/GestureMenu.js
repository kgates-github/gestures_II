import React, { useEffect, useState, useContext } from 'react';
import Animal from './Animal';
import Card from './Card';
import CoachTip from './CoachTip';
import GestureShadowDot from './GestureShadowDot';
import NotificationWindow from './NotificationWindow';
import { LogContext } from './LogContext';
import { motion, useMotionValue } from "framer-motion"


function GestureMenu(props) {
  const log = useContext(LogContext);
  const [isActive, setIsActive] = useState(false); // Menu is open/closed
  const [activeCard, setActiveCard] = useState(null); // Which card is active
  const [isInSelectionMode, setIsInSelectionMode] = useState(false); // Whether index finger is up
  const [selectionMade, setSelectionMade] = useState(false); // Whether thumb is up
  const [showNotification, setShowNotification] = useState(false); // Whether to show confirmation window
  const [animal, setAnimal] = useState(null); // Which animal was selected
  const [showCoachTip, setShowCoachTip] = useState(false); // Whether to show coach tip

  // Animation defs
  const variantsMenu = {
    isActive: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { duration: 0.2, ease: 'easeOut' }
    },
    isInactive: { 
      opacity: 0, 
      scale: 0.8, 
      y: -20,
      transition: { duration: 0.1, ease: 'easeOut' }
    },
  }

  // For the shadow dot
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  let anchor_x  = 0;
  let new_x = 0;
  let offset_x = 0;
  
  const handleOpenPalm = (e) => {
    log('handleOpenPalm ' + isActive);
    if (e.detail.handedness == 'Left') {
      setIsActive(true);
      setIsInSelectionMode(false);
      setSelectionMade(false);
      setShowCoachTip(true);
      props.setIntroDisplay('none');

      // When user opens palm, unsubscribe to hand coords until they make a fist
      //props.unsubscribe("Thumb_Up", handleThumbsUp);
      props.unsubscribe("Hand_Coords", handleGestureXY);
      props.subscribe("Pointing_Up", handlePointingUp);
      props.subscribe("No_Gesture", handleNoGesture);
    }
  }

  const handlePointingUp = (e) => {
    if (e.detail.handedness == 'Left') {
      anchor_x = e.detail.x;
      setIsActive(true);
      setIsInSelectionMode(true);
      setSelectionMade(false);
      setShowCoachTip(false);
      props.setIntroDisplay('none');
      log('handlePointingUp ' + isActive);

      props.subscribe("No_Gesture", handleNoGesture); // We can't accidentaly close window
      props.subscribe("Hand_Coords", handleGestureXY);
      //props.subscribe("Thumb_Up", handleThumbsUp);
    }
  }

  const handleGestureXY = (e) => {
    new_x = window.innerWidth / 2 - (window.innerWidth * (e.detail.x - anchor_x)) * 3 - 150;
    x.set(new_x)
    y.set(window.innerHeight / 3);
    log(new_x + " " + window.innerWidth / 2)
    if (new_x < (window.innerWidth / 2) - 210) { 
      if (activeCard != 'left') setActiveCard('left')
    } else if (new_x > window.innerWidth / 2 + 210) {
      if (activeCard != 'right') setActiveCard('right')
    } else { 
      if (activeCard != 'center') setActiveCard('center')
    }
  }

  /*
  const handleThumbsUp = (e) => {
    if (e.detail.handedness == 'Left') {
      setIsSelected(true);
      setIsSelectMode(false);
      props.unsubscribe("No_Gesture", handleNoGesture);
      props.unsubscribe("Hand_Coords", handleGestureXY);
      props.unsubscribe("Closed_Fist", handleClosedFist);

      setTimeout(() => {
        props.unsubscribe("Thumb_Up", handleThumbsUp);
        setState('exit');
        setIsActive(false);
      }, 1000);

      setTimeout(() => {
        setIsSelected(false);
      }, 1010);

    }
  }
  */
  const handleNoGesture =  (e) => {
    // Revove event listeners that require an open dialog
    //props.unsubscribe("Hand_Coords", handleGestureXY);
    //props.unsubscribe("Thumb_Up", handleThumbsUp);
    //props.unsubscribe("Hand_Coords", handleGestureX)
    setIsActive(false);
    setShowCoachTip(false);
    setIsInSelectionMode(false);
    setSelectionMade(false);
  
    log('---------');
    log('Closing menu ' + isActive);
  }

  useEffect(() => {
    // Open_Palm opens dialog, no gesture closes dialog 
    props.subscribe("Open_Palm", handleOpenPalm);
    props.subscribe("Pointing_Up", handlePointingUp);
    props.subscribe("No_Gesture", handleNoGesture);
    
    return () => {
      props.unsubscribe("Open_Palm", handleOpenPalm);
      props.unsubscribe("Pointing_Up", handlePointingUp);
      props.unsubscribe("No_Gesture", handleNoGesture);
      //props.unsubscribe("Hand_Coords", handleGestureXY);
      //props.unsubscribe("Thumb_Up", handleThumbsUp);
    }
  }, []);

  const getGestureShadowDot = () => {
    return (
      <GestureShadowDot x={x} y={y} isInSelectionMode={isInSelectionMode}/>
    );
  }

  return (
    <>
      <GestureShadowDot x={x} y={y} isInSelectionMode={isInSelectionMode}/>
      <div className="outerContainer" style={{ 
        position: "absolute", 
        zIndex:10,
      }}>
        
        <NotificationWindow 
          showNotification={showNotification} 
          setShowNotification={setShowNotification} 
          message={"You have selected a " + animal + "!"} 
        />

        <div id="innerContainer">
          <CoachTip 
            image={"icon_point_up"} 
            text={"HINT: Point your index finger up"}
            showCoachTip={showCoachTip}
          />
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <motion.div
              className="dialog"
              animate={isActive ? 'isActive' : 'isInactive'}
              variants={variantsMenu}
              initial={"isInactive"}
              onAnimationComplete={() => {
                if (!isActive) {
                  setShowNotification(true);
                }
              }}
              style={{display: 'flex', flexDirection: 'row', alignItems: 'center', zIndex: 90}}
            >
              <Card 
                isActive={isInSelectionMode && activeCard == 'left'}
                isSelected={selectionMade && activeCard == 'left'}
                title={"Treeshrew"}
                text={""}
                subscribe={props.subscribe} 
                unsubscribe={props.unsubscribe} 
                setAnimal={setAnimal}
              />
              <Card 
                isActive={isInSelectionMode && activeCard == 'center'}
                isSelected={selectionMade && activeCard == 'center'}
                title={"Capybarra"}
                text={""}
                subscribe={props.subscribe} 
                unsubscribe={props.unsubscribe} 
                setAnimal={setAnimal}
              />
              <Card 
                isActive={isInSelectionMode && activeCard == 'right'}
                isSelected={selectionMade && activeCard == 'right'}
                title={"Blind Mole Rat"}
                text={""}
                subscribe={props.subscribe} 
                unsubscribe={props.unsubscribe} 
                setAnimal={setAnimal}
              />
            </motion.div>
          </div>
          
        </div>
      </div>
    </>
  );
}

export default GestureMenu;

/*
<Card  
  isActive={isActive && state == 'right'} 
  isSelected={isSelected}
  title={"Blind Mole Rat"}
  text={"Blind mole rats are born nearly blind, but are well adapted to living underground."}
  subscribe={props.subscribe} 
  unsubscribe={props.unsubscribe} 
  setAnimal={setAnimal}
/>
<Card 
  isActive={isActive && state == 'center'}
  isSelected={isSelected}
  title={"Capybara"}
  text={"Capybaras are large, semi-aquatic rodents native to South America."}
  subscribe={props.subscribe} 
  unsubscribe={props.unsubscribe} 
  setAnimal={setAnimal}
/>
<Card 
  isActive={isActive && state == 'left'}
  isSelected={isSelected}
  title={"Treeshrew"}
  text={"Treeshrews are small mammals native to the tropical forests of South and Southeast Asia."}
  subscribe={props.subscribe} 
  unsubscribe={props.unsubscribe} 
  setAnimal={setAnimal}
/>
*/
            