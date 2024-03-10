import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion"


function Main(props) {
  const [state, setState] = useState('closed');
  const variants = {
    open:    { opacity: 1, scale: 1,   x: "0%", y: 0 },
    closed:  { opacity: 0, scale: 0.5, y: -50 },
    left:    { opacity: 1, scale: 1,   x: "-33%", y: 0 },
    right:   { opacity: 1, scale: 1,   x: "33%",  y: 0 },
  }
  
  useEffect(() => {
    let start_x  = 0;
    let offset_x = 0;

    props.subscribe("Open_Palm", (e) => {
      console.log('Open_Palm captured ' + e.detail.handedness)
      start_x = e.detail.x;
      if (state != 'open') setState('open')
    });
    
    props.subscribe("Gesture_X", (e) => {
      offset_x = Math.round(100 * (start_x - e.detail.x))
      //console.log('offset_x', offset_x)
      if (offset_x >= 5) { 
        if (state != 'right') setState('right')
      } else if (offset_x <= -5) {
        if (state != 'left') setState('left')
       } else { 
        if (state != 'open') setState('open')
       }
    });
    
    props.subscribe("No_Gesture", () => setState('closed'));
    
    return () => {
      props.unsubscribe("Open_Palm", () => console.log('Open_Palm unsubscribed'));
      props.unsubscribe("Gesture_X", () => console.log('Gesture_X unsubscribed'));
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
              variants={variants}
              initial={{ opacity: 0, scale: 0.5, y: -50 }}
              style={{display: 'flex', flexDirection: 'row', alignItems: 'center', }}
            >
              <div className="dialog-card">
                <h4>Blind Mole Rats</h4>
                Blind mole rats are fascinating creatures are well adapted to living underground, where they construct extensive tunnel systems.
              </div>
              <div className="dialog-card">
                <h4>Capybaras</h4>
                Capybaras, the largest rodents in the world, are fascinating creatures native to South America.
              </div>
              <div className="dialog-card">
                <h4>Capybaras</h4>
                Capybaras, the largest rodents in the world, are fascinating creatures native to South America.
              </div>
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