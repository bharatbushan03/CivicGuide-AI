import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ChevronRight } from 'lucide-react';

const Landing = ({ onStart }) => {
  return (
    <motion.div 
      className="landing-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="main"
    >
      <div className="landing-content">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="landing-logo"
        >
          <BookOpen size={64} className="icon" aria-hidden="true" />
        </motion.div>
        
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          CivicGuide AI
        </motion.h1>
        
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="landing-desc"
        >
          Your intelligent, interactive, and personalized journey into understanding the democratic process. Learn how elections work, cast your virtual vote, and explore outcomes safely.
        </motion.p>
        
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="landing-btn"
          onClick={onStart}
          aria-label="Start Learning"
        >
          Start Learning <ChevronRight size={20} />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Landing;
