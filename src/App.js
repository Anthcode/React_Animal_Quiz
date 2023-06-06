import React, { useState, useEffect } from 'react';
import './style.css';
import { ANIMAL_LIST } from '../db/db';

export default function App() {
  const ALPHABET = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];

  const [quessedLetters, setQuessedLetters] = useState([]);
  const [bad, setBad] = useState([]);
  const [lives, setLives] = useState(6);
  const [passwd, setPasswd] = useState('');
  const [reset, setReset] = useState(false);

  const RandomPasswd = () => {
    const random = Math.floor(Math.random() * ANIMAL_LIST.length);
    setPasswd(ANIMAL_LIST[random].toUpperCase());
    console.log(random, ANIMAL_LIST[random]);
  };

  useEffect(() => {
    RandomPasswd();
  }, [reset]);

  const handleClick = (e) => {
    if (passwd.includes(e)) {
      setQuessedLetters([...quessedLetters, e]);
    } else {
      setBad([...bad, e]);
      setLives(lives - 1);
    }
  };

  const win = passwd
    .split('')
    .every((letter) => quessedLetters.includes(letter));
  const lose = bad.length >= 6;
  
  const restart = () => {
    setLives(6);
    setBad([]);
    setQuessedLetters([]);
    setReset(!reset);
    win: false;
    lose: false;
  };

  return (
    <div className="App">
      <h1>Animal Name Quiz</h1>
      <div className="lives">
        <span className="span-lives">
          Lives : <span className="lives-num">{lives}</span>
        </span>
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
        {ALPHABET.map((letter) => (
          <button
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
          </button>
        ))}
      </div>
      <div className={win || lose ? 'restart-div' : 'restart-div-hide'}>
        <button className="restart" onClick={restart}>
          Restart
        </button>
      </div>
    </div>
  );
}
