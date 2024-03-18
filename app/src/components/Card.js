import React, { useEffect, useState, useContext } from 'react';
import GestureTarget from './GestureTarget';
import { motion } from "framer-motion"
import { LogContext } from './LogContext';


function Card(props) {
  const log = useContext(LogContext);

  const variants = {
    active:    { 
      y: -50, 
      opacity: 1, 
      border: "8px solid #0098fd", 
      scale: 1.03,
      transition: { duration: 0.3, ease: 'easeOut' }
    },
    inactive: { 
      y: 0, 
      scale: 1, 
      opacity: 1, 
      border: "4px solid #999",
      transition: { duration: 0.3, ease: 'easeOut' }
    },
    exitFast:{ 
      opacity: 0, 
      scale: 0.7, 
      border: "4px solid #999",
      y: 0,
      transition: { duration: 0.3, ease: 'easeOut' }
    },
    exitSlow:{ 
      opacity: 0, 
      scale: 0.7, 
      border: "4px solid #0098fd",
      y: 0,
      transition: { duration: 0.3, ease: 'easeOut', delay: 0.7 }
    },
  }

  useEffect(() => {
    if (props.isExiting && props.isSelected && props.isActive) { 
      props.setAnimal(props.title);
    } 
  }, [props.isExiting]);


  const getAnimation = () => {
    if (props.isExiting && props.isSelected && props.isActive) { 
      return "exitSlow"
    } 
    if (props.isExiting && !props.isSelected && !props.isActive) { 
      return "exitFast"
    }
    return props.isActive ? "active" : "inactive"
  }
 

  return (
    <div className="menu-card-outer" style={{display:"flex", flexDirection: "column", alignItems:"center"}}>
      <motion.div className="menu-card"
        animate={getAnimation()}
        variants={variants}
        onAnimationComplete={() => {
          if (props.isExiting && props.isSelected && props.isActive) {
            props.selectAndClose(props.title)
          }
        }}
      >
        <div style={{fontSize:"16px", fontWeight:"700"}}>{props.title}</div>
        {props.text}
      </motion.div>
      
      {
        <GestureTarget 
          isActive={props.isActive} 
          isSelected={props.isSelected} 
          setIsExiting={props.setIsExiting}
        />
      }
    </div>
  );
}

export default Card;

/*

<motion.div
        animate={(props.isActive) ? 'active' : 'inactive'}
        variants={variantsConfirm}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        style={{
          display:"flex", 
          flexDirection:"column",
          justifyContent:"center", 
          alignItems:"center", 
        }}
      >
        <svg width="82" height="82">
          <motion.path
            d="M 43, 43 m -35, 0 a 35,35 0 1,0 70,0 a 35,35 0 1,0 -70,0"
            fill="transparent"
            strokeWidth="8"
            stroke="#00cc66"
            variants={circleVariants}
            initial="inactive"
            animate={(props.isSelected) ? 'active' : 'inactive'}
            transition={{ duration: 0.6, ease: 'easeOut' }} 
          >
          </motion.path>
        </svg>
        <img 
          src={process.env.PUBLIC_URL + '/svg/icon_thumb_up.svg'} 
          alt="open hand" 
          style={{
            position:"relative", top:"-68px", left:"4px",
            width:'60px', height:'60px', marginTop:'4px', marginLeft:'2px'}}
        />
        <div style={{
          position:"relative", top:"-65px",
          marginTop:"12px", fontFamily:"'Source Sans Pro', sans-serif", fontSize: "12px"}}>
          Select?
        </div>
      </motion.div>


<motion.div className="button-check"
          animate={(props.isSelected) ? 'active' : 'inactive'}
          variants={variantsCheck}
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
          <img 
            src={process.env.PUBLIC_URL + '/svg/icon_thumb_up.svg'} 
            alt="open hand" 
            style={{width:'50px', height:'50px', marginTop:'4px', marginLeft:'2px'}}
          />
        </motion.div>
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