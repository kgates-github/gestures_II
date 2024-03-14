import React, { useEffect, useState, useContext } from 'react';
import { motion, useMotionValue } from "framer-motion"
import Card from './Card';
import { LogContext } from './LogContext';


function Main(props) {
  const log = useContext(LogContext);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  let anchor_x  = 0;
  let new_x = 0;
  let offset_x = 0;

  const [state, setState] = useState('closed');
  const [isActive, setIsActive] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [isSelectMode, setIsSelectMode] = useState(false);
  const variantsDialog = {
    left:    { opacity: 1, scale: 1,   x: "0%", y: 0 },
    center:  { opacity: 1, scale: 1,   x: "0%",   y: 0 },
    right:   { opacity: 1, scale: 1,   x: "0%",  y: 0 },
    closed:  { opacity: 0, scale: 0.7, y: -40 },
    exit:    { opacity: 0, scale: 1 },
  }

  const variantsIntro = {
    open:  { opacity: 1, scale: 1, y: 0 },
    closed:{ opacity: 0, scale: 1, y: 0 },
  }
  
  const handleOpenPalm = (e) => {
    log('handleOpenPalm ' + isActive + " " + state);
    if (e.detail.handedness == 'Left') {
      setState('center');
      setIsActive(false);
      setIsSelected(false);
      setIsSelectMode(false);
      props.setIntroDisplay('none');
      // When user opens palm, unsubscribe to hand coords until they make a fist
      props.unsubscribe("Thumb_Up", handleThumbsUp);
      props.unsubscribe("Hand_Coords", handleGestureXY);
      props.subscribe("Pointing_Up", handlePointingUp);
      props.subscribe("No_Gesture", handleNoGesture);
    }
  }

  const handleOpenPalm_ = (e) => {
    log('handleOpenPalm ' + isActive + " " + state);
    if (e.detail.handedness == 'Left') {
      anchor_x = e.detail.x;
      setState('center');
      setIsActive(true);
      setIsSelected(false);
      setIsSelectMode(true);
      props.setIntroDisplay('none');
      log('handlePointingUp ' + isActive + " " + state);
      props.subscribe("No_Gesture", handleNoGesture); // We can't accidentaly close window
      props.subscribe("Hand_Coords", handleGestureXY);
      props.subscribe("Thumb_Up", handleThumbsUp);
    }
  }

  // Closed fist activates
  const handlePointingUp = (e) => {
    if (e.detail.handedness == 'Left') {
      anchor_x = e.detail.x;
      setIsActive(true);
      setIsSelected(false);
      setIsSelectMode(true);
      props.setIntroDisplay('none');
      log('handlePointingUp ' + isActive + " " + state);
      props.subscribe("No_Gesture", handleNoGesture); // We can't accidentaly close window
      props.subscribe("Hand_Coords", handleGestureXY);
      props.subscribe("Thumb_Up", handleThumbsUp);
    }
  }

  // Closed fist activates
  const handleClosedFist = (e) => {
    anchor_x = e.detail.x;
    setIsActive(true);
    setIsSelected(false);
    log('handleClosedFist ' + isActive + " " + state);
    props.unsubscribe("No_Gesture", handleNoGesture); // We can't accidentaly close window
    props.subscribe("Hand_Coords", handleGestureX);
    props.subscribe("Thumb_Up", handleThumbsUp);
  }

  const handleGestureXY = (e) => {
    new_x = window.innerWidth / 2 - (window.innerWidth * (e.detail.x - anchor_x)) * 3 - 150;
    x.set(new_x)
    y.set(200);
    log(new_x + " " + window.innerWidth / 2)
    if (new_x < (window.innerWidth / 2) - 210) { 
      if (state != 'left') setState('right')
    } else if (new_x > window.innerWidth / 2 + 210) {
      if (state != 'right') setState('left')
    } else { 
      if (state != 'center') setState('center')
    }
  }

  // Once activated, track X
  const handleGestureX = (e) => {
    log('handleGestureX ' + isActive + " " + state);
    
    offset_x = Math.round(100 * (anchor_x - e.detail.x))
    if (offset_x >= 8) { 
      if (state != 'left') setState('left')
    } else if (offset_x <= -8) {
      if (state != 'right') setState('right')
    } else { 
      if (state != 'center') setState('center')
    }
  }

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
      }, 1200);
    }
  }
  
  const handleNoGesture =  (e) => {
    // Revove event listeners that require an open dialog
    props.unsubscribe("Hand_Coords", handleGestureXY);
    props.unsubscribe("Closed_Fist", handleClosedFist);
    props.unsubscribe("Thumb_Up", handleThumbsUp);
    props.unsubscribe("Hand_Coords", handleGestureX);
    setState('closed')
    setIsActive(false);
    setIsSelected(false);
    setIsSelectMode(false);
    log('-----------------------------------');
    log('closing dialog ' + isActive + " " + state);
  }

  useEffect(() => {
    // Open_Palm opens dialog, no gesture closes dialog 
    props.subscribe("Open_Palm", handleOpenPalm);
    props.subscribe("Pointing_Up", handlePointingUp);
    props.subscribe("No_Gesture", handleNoGesture);
    
    return () => {
      props.unsubscribe("Open_Palm", handleOpenPalm);
      props.unsubscribe("Closed_Fist", handleClosedFist);
      props.unsubscribe("No_Gesture", handleNoGesture);
      props.unsubscribe("Hand_Coords", handleGestureXY);
      props.unsubscribe("Thumb_Up", handleThumbsUp);
    }
  }, []);


  return (
    <>
      <motion.div
        style={{
          width: 30,
          height: 30,
          borderRadius: "50%",
          background: "#000",
          opacity: 0.2,
          filter: 'blur(5px)',
          position: "absolute",
          x: x,
          y: y,
          zIndex: 100,
          display: isSelectMode ? 'block' : 'none',
        }}
      />
      <div className="outerContainer" style={{ 
        position: "absolute", 
        zIndex:10,
      }}>
        <div id="innerContainer">
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            

            <motion.div
              className="dialog"
              animate={state}
              variants={variantsDialog}
              initial={{ opacity: 0, scale: 0.8, y: -20 }}
              transition={{ duration: 0.4, ease: 'easeOut' }} 
              style={{display: 'flex', flexDirection: 'row', alignItems: 'center', zIndex: 90}}
            >
              <Card  
                isActive={isActive && state == 'right'} 
                isSelected={isSelected}
                title={"Blind Mole Rat"}
                text={"Blind mole rats are born nearly blind, but are well adapted to living underground, where they construct extensive tunnel systems."}
                subscribe={props.subscribe} 
                unsubscribe={props.unsubscribe} 
              />
              <Card 
                isActive={isActive && state == 'center'}
                isSelected={isSelected}
                title={"Capybara"}
                text={"Capybaras are large, semi-aquatic rodents native to South America."}
                subscribe={props.subscribe} 
                unsubscribe={props.unsubscribe} 
              />
              <Card 
                isActive={isActive && state == 'left'}
                isSelected={isSelected}
                title={"Treeshrew"}
                text={" Treeshrews are small mammals native to the tropical forests of South and Southeast Asia."}
                subscribe={props.subscribe} 
                unsubscribe={props.unsubscribe} 
              />
            </motion.div>
          </div>
          
        </div>
      </div>
    </>
  );
}

export default Main;

/*
const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "-100%" },
}

export const MyComponent = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.nav
      animate={isOpen ? "open" : "closed"}
      variants={variants}
    >
      <Toggle onClick={() => setIsOpen(isOpen => !isOpen)} />
      <Items />
    </motion.nav>
  )

  <img src={process.env.PUBLIC_URL + '/svg/' + icon + '.svg'} 
              alt="open hand" 
              style={{width:'60px', height:'60px'}}
            />to open a dialog...


  Capybaras, the largest rodents in the world, are fascinating creatures native to South America. These semi-aquatic mammals are often found lounging in or near water bodies, as they are excellent swimmers and spend a significant portion of their time submerged. Capybaras are highly social animals, living in groups of up to 100 individuals, and they communicate through a variety of vocalizations and body language. They have a herbivorous diet, feeding mainly on grasses and aquatic plants, and their teeth continuously grow throughout their lives to accommodate their chewing habits. Despite their size, capybaras are surprisingly agile and can run as fast as 35 kilometers per hour when necessary, making them capable of escaping predators like jaguars and anacondas. Their gentle demeanor has also made them popular in zoos and as exotic pets in some regions, although they require specialized care due to their unique habitat and social needs. Overall, capybaras stand out as remarkable and endearing animals with a range of intriguing characteristics.


  <p>Capybaras are highly social animals, living in groups of up to 100 individuals, and they communicate through a variety of vocalizations and body language. They have a herbivorous diet, feeding mainly on grasses and aquatic plants, and their teeth continuously grow throughout their lives to accommodate their chewing habits.</p>
    
  <p>Despite their size, capybaras are surprisingly agile and can run as fast as 35 kilometers per hour when necessary, making them capable of escaping predators like jaguars and anacondas. Their gentle demeanor has also made them popular in zoos and as exotic pets in some regions, although they require specialized care due to their unique habitat and social needs. Overall, capybaras stand out as remarkable and endearing animals with a range of intriguing characteristics.</p>
*/