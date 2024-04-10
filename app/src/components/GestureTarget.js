import React, { useContext } from 'react';
import { motion } from "framer-motion"
import { LogContext } from './LogContext';


function GestureTarget(props) {
  const log = useContext(LogContext);

  const variantsConfirm = {
    active: { opacity: 1, y: -10},
    inactive: { opacity: 0, y: -10},
  }

  const circleVariants = {
    inactive: { pathLength: 0, },
    active: { pathLength: 1,}
  };

  const checkVariants = {
    inactive: { pathLength: 0, },
    active: { pathLength: 1,}
  };

  return (
    <motion.div
      animate={(props.isActive) ? 'active' : 'inactive'}
      variants={variantsConfirm}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      style={{
        display:"flex", 
        flexDirection:"column",
        justifyContent:"center", 
        alignItems:"center", 
        background: "none",
      }}
    >
      <svg width="82" height="82">
        <motion.path
          d="M 43, 43 m -28.5, 0 a 28.5,28.5 0 1,0 57,0 a 28.5,28.5 0 1,0 -57,0"
          fill="transparent"
          strokeWidth="8"
          stroke="#ccc" 
        />  
        <motion.path
          d="M 43, 43 m -28.5, 0 a 28.5,28.5 0 1,0 57,0 a 28.5,28.5 0 1,0 -57,0"
          fill="transparent"
          strokeWidth="6"
          stroke="#0FD446"
          variants={circleVariants}
          initial="inactive"
          animate={props.isSelected ? 'active' : 'inactive'}
          transition={{ duration: 0.5, ease: 'easeOut' }} 
        />
        <motion.path
          d="M15 29L25 38L40 19"
          fill="transparent"
          strokeWidth="6"
          stroke="#0FD446"
          variants={checkVariants}
          initial="inactive"
          transform="translate(15, 15.5)"
          animate={props.isSelected ? 'active' : 'inactive'}
          transition={{ duration: 0.2, ease: 'easeOut', delay: 0.4 }} 
          onAnimationComplete={() => {
            props.setIsExiting(true)
          }}
        />
      </svg>
        
      <motion.img 
        src={process.env.PUBLIC_URL + '/svg/icon_thumb_up.svg'} 
        style={{
          position:"relative", top:"-65px", left:"4px",
          width:'40px', height:'40px', marginTop:'8px', marginLeft:'2px'
        }}
        initial={{ opacity: 1 }}
        animate={props.isSelected ? { opacity: 0 } : { opacity: 1 }}
        transition={{ delay: 0, duration: 0.4 }}
      />
      
    </motion.div>
  );
}
export default GestureTarget;

