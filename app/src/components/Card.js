import React, { useEffect, useState, useContext } from 'react';
import { motion } from "framer-motion"
import { LogContext } from './LogContext';


function Card(props) {
  const log = useContext(LogContext);
  const variantsCard = {
    active:    { y: -50, opacity: 1, border: "12px solid #0098fd", scale: 1.02},
    inactive:  { y: 0, scale: 1, opacity: 0.8, border: "6px solid #999"},
    showThumb: { opacity: 1, y: -24},
    hideThumb: { opacity: 0, y: 0},
    highlightThumb: { border: "8px solid #00cc66", opacity: 1, y: -24},
  }
  const getAnimation = () => {
    if (props.isSelected && props.isActive) return 'highlightThumb';
    else if (props.isActive) return 'showThumb';
    else return 'hideThumb'
  }
  
  useEffect(() => {
    log('==============================\nCard isActive:'    + props.isActive);
  }, []);

  return (
    <div style={{display:"flex", flexDirection: "column", alignItems:"center"}}>
      <motion.div className="dialog-card"
        animate={(props.isActive) ? 'active' : 'inactive'}
        variants={variantsCard}
        transition={{ duration: 0.3, ease: 'easeOut' }} 
      >
        <h4>{props.title}</h4>
        {props.text}
      </motion.div>
      <motion.div className="button-check"
        animate={getAnimation}
        variants={variantsCard}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        style={{
          width:"60px", 
          height:"60px", 
          backgroundColor:"#fff", 
          border:"6px solid #999",
          borderRadius:"50%", 
          display:"flex", 
          justifyContent:"center", 
          alignItems:"center", 
        }}
      >
        <img src={process.env.PUBLIC_URL + '/svg/icon_thumb_up.svg'} 
          alt="open hand" 
          style={{width:'50px', height:'50px', marginTop:'4px', marginLeft:'2px'}}
        />
      </motion.div>
    </div>
  );
}

export default Card;

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