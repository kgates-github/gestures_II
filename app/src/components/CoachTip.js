import React, { useEffect, useState, useContext } from 'react';
import { motion } from "framer-motion"
import { LogContext } from './LogContext';


function CoachTip(props) {
  const log = useContext(LogContext);

  const variants = {
    open: {
      opacity: 1,
      scale: 1,
      y: -60,
      transition: { duration: 0.3, ease: 'easeInOut', delay: 0.4, type: 'spring', stiffness: 400, damping: 20 }
    },
    closed: {
      opacity: 0,
      scale: 0.9,
      y: -50,
    },
    transition: { duration: 0.1, ease: 'easeInOut', delay: 0 }
  }

  return (
    <motion.div 
    animate={props.showCoachTip ? "open" : "closed"}
    initial="closed"
    variants={variants}
    style={{
      position:"relative",
      top: "0px",
      left: "0px",
      width: "200px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      background: "none",
      zIndex: 100000,
      borderRadius: "16px",
      padding: "20px",
    }}>
      <div style={{width:"180px", textAlign:"center", marginBottom:"8px", color:"#444"}}>{props.text}</div>
      <img src={process.env.PUBLIC_URL + '/svg/' + props.image + '.svg'} 
        alt="open hand" 
        style={{width:'60px', height:'60px'}}
      />
    </motion.div>
  );
}

export default CoachTip;
