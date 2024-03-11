import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion"
import Card from './Card';


function Main(props) {
  const [state, setState] = useState('closed');
  const [isActive, setIsActive] = useState(false);
  const variantsDialog = {
    left:    { opacity: 1, scale: 1,   x: "-33%", y: 0 },
    center:  { opacity: 1, scale: 1,   x: "0%",   y: 0 },
    right:   { opacity: 1, scale: 1,   x: "33%",  y: 0 },
    closed:  { opacity: 0, scale: 0.7, y: -20 },
  }

  const variantsCard = {
    active:   { y: -50, opacity: 1, border: "12px solid #0098fd", scale: 1.02},
    inactive: { y: 0, scale: 1, opacity: 0.8, border: "6px solid #999"},
  }

  // TODO: Clean up event listeners, animate checkmark
  const closeDialog = () => {
    //setState('closed');
    //setIsActive(false);
  }

  useEffect(() => {

    const handleOpenPalm = (e) => {
      if (state != 'center' && e.detail.handedness == 'Left') {
        setState('center');
        setIsActive(false);
        // When user opens palm, unsubscribe to hand coords until they make a fist
        props.unsubscribe("Hand_Coords", handleGestureX);
        props.subscribe("Closed_Fist", handleClosedFist);
      }
    }

    // Closed fist activates
    const handleClosedFist = (e) => {
      start_x = e.detail.x;
      setIsActive(true);
      props.subscribe("Hand_Coords", handleGestureX);
    }

    // Once activated, track X
    const handleGestureX = (e) => {
      offset_x = Math.round(100 * (start_x - e.detail.x))
      if (offset_x >= 8) { 
        if (state != 'right') {
          setState('right')
        }
      } else if (offset_x <= -8) {
        if (state != 'left') setState('left')
      } else { 
        if (state != 'center') setState('center')
      }
    }

    const handleNoGesture =  (e) => {
      // Revove event listeners that require an open dialog
      props.unsubscribe("Hand_Coords", handleGestureX);
      props.unsubscribe("Closed_Fist", handleClosedFist);
      setState('closed')
      setIsActive(false);
    }

    let start_x  = 0;
    let offset_x = 0;

    // Open_Palm opens dialog, no gesture closes dialog 
    props.subscribe("Open_Palm", handleOpenPalm);
    props.subscribe("No_Gesture", handleNoGesture);
    
    return () => {
      props.unsubscribe("Open_Palm", handleOpenPalm);
      props.unsubscribe("Closed_Fist", handleClosedFist);
      props.unsubscribe("No_Gesture", () => console.log('No_Gesture unsubscribed'));
      props.unsubscribe("Hand_Coords", handleGestureX);
    }
  }, []);

  return (
    <>
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
              style={{display: 'flex', flexDirection: 'row', alignItems: 'center', }}
            >
              <Card 
                state={state} 
                closeDialog={closeDialog}
                isActive={isActive && state == 'right'} 
                title={"Blind Mole Rat"}
                text={"Blind mole rats are born nearly blind, but are well adapted to living underground, where they construct extensive tunnel systems."}
                subscribe={props.subscribe} 
                unsubscribe={props.unsubscribe} 
              />
              <Card 
                state={state} 
                closeDialog={closeDialog}
                isActive={isActive && state == 'center'}
                title={"Capybara"}
                text={"Capybaras are large, semi-aquatic rodents native to South America."}
                subscribe={props.subscribe} 
                unsubscribe={props.unsubscribe} 
              />
              <Card 
                state={state} 
                closeDialog={closeDialog}
                isActive={isActive && state == 'left'}
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