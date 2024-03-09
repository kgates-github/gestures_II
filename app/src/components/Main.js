import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion"


function Main(props) {
  const [isOpen, setIsOpen] = useState(false);
  const variants = {
    open: { opacity: 1, scale: 1 },
    closed: { opacity: 0, scale: 0.5 },
  }
  
  useEffect(() => {
    props.subscribe("Open_Palm", (e) => {
      console.log('Open_Palm captured ' + e.detail.handedness)
      setIsOpen(true)
    });
    props.subscribe("Closed_Fist", (e) => {
      console.log('Closed_Fist captured')
      
    });
    props.subscribe("No_Gesture", () => setIsOpen(false));
    
    return () => {
      props.unsubscribe("Open_Palm", () => console.log('Open_Palm unsubscribed'));
      props.unsubscribe("Closed_Fist", () => console.log('Closed_Fist unsubscribed'));
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
              className="dialog-box-01"
              animate={isOpen ? "open" : "closed"}
              variants={variants}
            >
              <h4>Capybaras</h4>
              Capybaras, the largest rodents in the world, are fascinating creatures native to South America. These semi-aquatic mammals are often found lounging in or near water bodies, as they are excellent swimmers and spend a significant portion of their time submerged. 
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
*/