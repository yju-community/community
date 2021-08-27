import React from 'react';
import { motion } from 'framer-motion';

const Motion = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: 1
      }
    }
  }
  
  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 }
  }
  
  return (
    <>
      <motion.ul
        variants={container}
        initial="hidden"
        animate="show"
      >
        <li>789</li>
        <motion.li variants={item}>123</motion.li>
        <motion.li variants={item}>456</motion.li>
      </motion.ul>
      <div class="flex items-center justify-center space-x-2 animate-bounce">
        <div class="w-8 h-8 bg-blue-400 rounded-full"></div>
        <div class="w-8 h-8 bg-green-400 rounded-full"></div>
        <div class="w-8 h-8 bg-black rounded-full"></div>
      </div>
      <div>
      <div style={{ borderTopColor: 'transparent' }}
          class="w-8 h-8 border-4 border-blue-400 border-solid rounded-full animate-spin"></div>
      </div>
    </>
  )
}

export default Motion;