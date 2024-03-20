import React, { useEffect, useState, useContext } from 'react';
import { motion } from "framer-motion"
import { LogContext } from './LogContext';


function NotificationWindow(props) {
  const log = useContext(LogContext);
  
  // Animation defs
  const variants = {
    isActive: { 
      opacity: 1, 
      scale: 1, 
      y: 50,
      transition: { duration: 0.3, ease: 'easeOut' }
    },
    isInactive: { 
      opacity: 0, 
      scale: 0.8, 
      y: 50,
      transition: { duration: 0.3, ease: 'easeOut', delay: 1.5 }
    },
  }

  return (
    <motion.div 
    animate={props.showNotification ? 'isActive' : 'isInactive'}
    initial="isInactive"
    variants={variants}
    onAnimationComplete={() => {
      if (props.showNotification) {
        props.setShowNotification(false);
      } else {
        props.setShowCoachTip("intro");
      }
    }}
    style={{
      position:"absolute",
      top: "40%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      minHeight: "0px",
      minWidth: "240px",
      alignItems: "center",
      background: "#333",
      color: "#fff",
      zIndex: 100000,
      borderRadius: "16px",
      padding: "20px",
    }}>
      You selected a {props.animal}!
    </motion.div>
  );
}

export default NotificationWindow;
