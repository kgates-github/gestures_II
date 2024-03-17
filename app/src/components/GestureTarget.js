import React, { useContext } from 'react';
import { motion } from "framer-motion"
import { LogContext } from './LogContext';


function GestureTarget(props) {
  const log = useContext(LogContext);

  const variantsConfirm = {
    active: { opacity: 1, y: -24},
    inactive: { opacity: 0, y: 0},
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
      }}
    >
      <svg width="82" height="82">
        <motion.path
          d="M 43, 43 m -35, 0 a 35,35 0 1,0 70,0 a 35,35 0 1,0 -70,0"
          fill="transparent"
          strokeWidth="8"
          stroke="#ccc" 
        />  
        <motion.path
          d="M 43, 43 m -35, 0 a 35,35 0 1,0 70,0 a 35,35 0 1,0 -70,0"
          fill="transparent"
          strokeWidth="8"
          stroke="#19B300"
          variants={circleVariants}
          initial="inactive"
          animate={props.isSelected ? 'active' : 'inactive'}
          transition={{ duration: 0.5, ease: 'easeOut' }} 
        />
        <motion.path
            d="M 23.5 46 L 39.1797 58.9199 L 63.6797 27.4199"
          fill="transparent"
          strokeWidth="8"
          stroke="#19B300"
          stroke-linejoin="round"
          variants={checkVariants}
          initial="inactive"

          animate={props.isSelected ? 'active' : 'inactive'}
          transition={{ duration: 0.2, ease: 'easeOut', delay: 0.4 }} 
        />
      </svg>
        
      <motion.img 
        src={process.env.PUBLIC_URL + '/svg/icon_thumb_up.svg'} 
        style={{
          position:"relative", top:"-68px", left:"4px",
          width:'60px', height:'60px', marginTop:'4px', marginLeft:'2px'
        }}
        initial={{ opacity: 1 }}
        animate={props.isSelected ? { opacity: 0 } : { opacity: 1 }}
        transition={{ delay: 0, duration: 0.4 }}
      />
      <div style={{
        position:"relative", top:"-65px",
        marginTop:"12px", fontFamily:"'Source Sans Pro', sans-serif", fontSize: "12px"}}>
        Select?
      </div>
    </motion.div>
  );
}
export default GestureTarget;

