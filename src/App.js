import React, { useState, useEffect } from 'react';
import './style.css';
import { ANIMAL_LIST, ALPHABET } from '../src/db/db';

export default function App() {
  const [quessedLetters, setQuessedLetters] = useState([]);
  const [bad, setBad] = useState([]);
  const [lives, setLives] = useState(6);

  const [reset, setReset] = useState(false);
  const [scoreCount, setScoreCount] = useState(0);

  const [passwd, setPasswd] = useState(() => {
    const random = Math.floor(Math.random() * ANIMAL_LIST.length);
    return ANIMAL_LIST[random].toUpperCase();
  });



  useEffect(()=>{
    console.log(passwd)
  },[])

  const handleClick = (e) => {
    if (lives===0){
      lose=true;
      win=false;
    }else
    if (passwd.includes(e)) {
      setQuessedLetters([...quessedLetters, e]);
    } else {
      setBad([...bad, e]);
      setLives(lives - 1)
    } 
  };

let win = passwd
    .split('')
    .every((letter) => quessedLetters.includes(letter));
 let lose = lives ===0;

  const restart = () => {
    const random = Math.floor(Math.random() * ANIMAL_LIST.length);
    setPasswd(ANIMAL_LIST[random].toUpperCase());
    if (win) {
      
      setScoreCount(scoreCount + 1);
      setQuessedLetters([]);
      setBad([]);
   
    } else {
          
            setLives(6);
            setScoreCount(0);
            setBad([]);
            setQuessedLetters([]);
       
         
    }
  };
 
  return (
    <div className="App">
       <h1>Animal Name Quiz</h1>
      <div className="lives">
        <span className="span-lives">
          Lives : <span className="lives-num">{lives}</span>
        </span>
        <span className="span-lives">
          Score : <span className="score-num">{scoreCount}</span>
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
