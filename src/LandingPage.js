import React from 'react';
import { motion } from 'framer-motion';
import './style.css';

const LandingPage = ({ onStartGame }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const animalEmojis = ['🦁', '🐘', '🦒', '🐧', '🦋', '🐢', '🦊', '🐺'];

  return (
    <motion.div
      className="landing-page"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="animals-floating">
        {animalEmojis.map((emoji, index) => (
          <motion.div
            key={index}
            className={`floating-animal floating-animal-${index}`}
            animate={{
              y: [-20, 20, -20],
              rotate: [-5, 5, -5],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 3 + index * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.3
            }}
          >
            {emoji}
          </motion.div>
        ))}
      </motion.div>

      <motion.div className="landing-content">
        <motion.h1
          className="landing-title"
          variants={itemVariants}
          animate={{
            scale: [1, 1.05, 1],
            textShadow: [
              "0px 0px 10px rgba(255,255,255,0.3)",
              "0px 0px 20px rgba(255,255,255,0.6)",
              "0px 0px 10px rgba(255,255,255,0.3)"
            ]
          }}
          transition={{
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            textShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          🐾 Animal Quiz Challenge 🐾
        </motion.h1>

        <motion.p
          className="landing-subtitle"
          variants={itemVariants}
        >
          Test your knowledge of the animal kingdom!
        </motion.p>

        <motion.div
          className="landing-features"
          variants={itemVariants}
        >
          <motion.div 
            className="feature"
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            🧠 Challenge Your Mind
          </motion.div>
          <motion.div 
            className="feature"
            whileHover={{ scale: 1.05, rotate: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            🏆 Beat Your High Score
          </motion.div>
          <motion.div 
            className="feature"
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            🎯 Multiple Difficulty Levels
          </motion.div>
        </motion.div>

        <motion.button
          className="start-game-btn"
          variants={itemVariants}
          whileHover={{ 
            scale: 1.1,
            boxShadow: "0px 15px 25px rgba(0,0,0,0.4)",
            y: -5
          }}
          whileTap={{ scale: 0.95 }}
          animate={{
            boxShadow: [
              "0px 8px 15px rgba(0,0,0,0.3)",
              "0px 12px 20px rgba(3,155,229,0.4)",
              "0px 8px 15px rgba(0,0,0,0.3)"
            ]
          }}
          transition={{
            boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
          onClick={onStartGame}
        >
          🎮 Start Playing!
        </motion.button>

        <motion.div
          className="scroll-indicator"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          ↓ Scroll for more ↓
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default LandingPage;