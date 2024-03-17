import React, { useContext } from 'react';
import { motion } from "framer-motion"
import { LogContext } from './LogContext';


function Animal(props) {
  const log = useContext(LogContext);

  const variants = {
    active: { opacity: 1, y: -24},
    inactive: { opacity: 0, y: 0},
  }

  const animalImage = (animal) => {
    if (animal == "Blind Mole Rat") {
      return (
        <img src={process.env.PUBLIC_URL + '/png/blindmolerat.png'} 
          alt="Animal" 
          style={{width:'200px', height:"auto"}}
        />
      );
    } else if (animal == "Capybara") {
      return (
        <img src={process.env.PUBLIC_URL + '/png/capybara.png'} 
          alt="Animal" 
          style={{width:'200px', height:"auto"}}
        />
      );
    } else if (animal == "Treeshrew") {
      return (
        <img src={process.env.PUBLIC_URL + '/png/treeshrew.png'} 
          alt="Animal" 
          style={{width:'200px', height:"auto"}}
        />
      );
    }
  }

  return (
    <motion.div
      animate={(props.isActive) ? 'active' : 'inactive'}
      variants={variants}
      initial="inactive"
      transition={{ duration: 0.4, ease: 'easeOut' }}
      style={{
        display:"flex", 
        flexDirection:"column",
        justifyContent:"center", 
        alignItems:"center",
      }}
    >
      <div style={{
        display: props.animal ? "flex" : "none",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}>
        <div>
        {animalImage(props.animal)}
        </div>
        {props.animal}
      </div>
    </motion.div>
  );
}
export default Animal;

