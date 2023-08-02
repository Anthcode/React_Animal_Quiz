import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './style.css';
import { ANIMAL_LIST, ALPHABET } from '../src/db/db';

export default function App() {
  const [quessedLetters, setQuessedLetters] = useState([]);
  const [bad, setBad] = useState([]);
  const [lives, setLives] = useState(6);
  const [scoreCount, setScoreCount] = useState(0);
  const [passwd, setPasswd] = useState('');
  const [reset, setReset] = useState(false);
  const [highScores, setHighScores] = useState(
    JSON.parse(localStorage.getItem('highScores')) || false
  );
  let win = passwd.split('').every((letter) => quessedLetters.includes(letter));
  let lose = lives === 0;

  const spring = {
    type: 'spring',
    damping: 10,
    stiffness: 260,
  };

  useEffect(() => {
    localStorage.setItem('highScores', JSON.stringify(highScores));
    if (highScores) {
      setHighScores(highScores);
    }
  }, []);

  useEffect(() => {
    const RandomPasswd = () => {
      const random = Math.floor(Math.random() * ANIMAL_LIST.length);
      setPasswd(ANIMAL_LIST[random].toUpperCase());
    };
    checkBestScore();
    RandomPasswd();
  }, [reset]);

  const checkBestScore = () => {
    if (scoreCount > highScores) {
      setHighScores(scoreCount);
      localStorage.setItem('highScores', JSON.stringify(scoreCount));
    } else return;
  };

  const handleClick = (e) => {
    if (lives === 0) {
      checkBestScore();
      lose = true;
      win = false;
    } else if (passwd.includes(e)) {
      setQuessedLetters([...quessedLetters, e]);
    } else {
      setBad([...bad, e]);
      setLives(lives - 1);
    }
  };

  const next = () => {
    setScoreCount(scoreCount + 1);
    setQuessedLetters([]);
    setBad([]);
    setReset(!reset);
  };

  const restart = () => {
    setLives(6);
    setScoreCount(0);
    setBad([]);
    setQuessedLetters([]);
    setReset(!reset);
  };
  return (
    <motion.div
      className="App"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.1 }}
    >
      {highScores && (
        <div className="lastBestScore">Your Best Score : {highScores}</div>
      )}
      <motion.h1
        initial={{ y: '-100vh', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={(spring, { duration: 1.1 })}
      >
        Animal Name Quiz
      </motion.h1>
      <div className="lives">
        <motion.span
          className="span-lives"
          initial={{ x: '-100vw', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={(spring, { duration: 1.3, delay: 0.2 })}
        >
          Lives : <span className="lives-num">{lives}</span>
        </motion.span>
        <motion.span
          className="span-lives"
          initial={{ x: '100vw', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={(spring, { duration: 1.3, delay: 0.2 })}
        >
          Score : <span className="score-num">{scoreCount}</span>
        </motion.span>
      </div>

      <div className="win">
        {win && <h2>WIN !!!</h2>}
        {lose && <h2>LOSE :(</h2>}
      </div>
      <div className="passwd">
        {passwd.split('').map((letter, idx) => (
          <span key={idx} style={{ borderBottom: '.1em solid black' }}>
            <span
              style={{
                opacity: quessedLetters.includes(letter) || lose ? 1 : 0,
                color:
                  !quessedLetters.includes(letter) && lose
                    ? 'firebrick'
                    : 'black',
              }}
            >
              {letter}
            </span>
          </span>
        ))}
      </div>
      <div className={win || lose ? 'alphabet-hide' : 'alphabet'}>
        {ALPHABET.map((letter, idx) => (
          <motion.button
           
            initial={{ x: '100vw', opacity: 0, scale: 0, y: '-100vh' }}
            animate={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            transition={{ duration: idx * 0.1 }}
            className={
              quessedLetters.includes(letter)
                ? 'btn-alphabet-quest'
                : 'btn-alphabet'
            }
            disabled={
              quessedLetters.includes(letter) ||
              bad.includes(letter) ||
              win ||
              lose
                ? 'disabled'
                : null
            }
            key={letter}
            id={letter}
            onClick={(e) => handleClick(e.currentTarget.id)}
          >
            {letter}
          </motion.button>
        ))}
      </div>
      <div className={win || lose ? 'restart-div' : 'restart-div-hide'}>
        {win ? (
          <button className="restart" onClick={next}>
            'Next'{' '}
          </button>
        ) : (
          <button className="restart" onClick={restart}>
            'Restart'
          </button>
        )}
      </div>
    </motion.div>
  );
}
