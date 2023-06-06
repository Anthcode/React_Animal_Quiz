import React, {useState, useEffect} from "react";
import "./style.css";

export default function App() {
  const ALPHABET = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
  
  const ANIMAL_LIST = [
     "Aardvark",
     "Albatross",
     "Alligator",
     "Alpaca",
     "Ant",
     "Anteater",
     "Antelope",
     "Ape",
     "Armadillo",
     "Donkey",
     "Baboon",
     "Badger",
     "Barracuda",
     "Bat",
     "Bear",
     "Beaver",
     "Bee",
     "Bison",
     "Boar",
     "Buffalo",
     "Butterfly",
     "Camel",
     "Capybara",
     "Caribou",
     "Cassowary",
     "Cat",
     "Caterpillar",
     "Cattle",
     "Chamois",
     "Cheetah",
     "Chicken",
     "Chimpanzee",
     "Chinchilla",
     "Chough",
     "Clam",
     "Cobra",
     "Cockroach",
     "Cod",
     "Cormorant",
     "Coyote",
     "Crab",
     "Crane",
     "Crocodile",
     "Crow",
     "Curlew",
     "Deer",
     "Dinosaur",
     "Dog",
     "Dogfish",
     "Dolphin",
     "Dotterel",
     "Dove",
     "Dragonfly",
     "Duck",
     "Dugong",
     "Dunlin",
     "Eagle",
     "Echidna",
     "Eel",
     "Eland",
     "Elephant",
     "Elk",
     "Emu",
     "Falcon",
     "Ferret",
     "Finch",
     "Fish",
     "Flamingo",
     "Fly",
     "Fox",
     "Frog",
     "Gaur",
     "Gazelle",
     "Gerbil",
     "Giraffe",
     "Gnat",
     "Gnu",
     "Goat",
     "Goldfinch",
     "Goldfish",
     "Goose",
     "Gorilla",
     "Goshawk",
     "Grasshopper",
     "Grouse",
     "Guanaco",
     "Gull",
     "Hamster",
     "Hare",
     "Hawk",
     "Hedgehog",
     "Heron",
     "Herring",
     "Hippopotamus",
     "Hornet",
     "Horse",
     "Human",
     "Hummingbird",
     "Hyena",
     "Ibex",
     "Ibis",
     "Jackal",
     "Jaguar",
     "Jay",
     "Jellyfish",
     "Kangaroo",
     "Kingfisher",
     "Koala",
     "Kookabura",
     "Kouprey",
     "Kudu",
     "Lapwing",
     "Lark",
     "Lemur",
     "Leopard",
     "Lion",
     "Llama",
     "Lobster",
     "Locust",
     "Loris",
     "Louse",
     "Lyrebird",
     "Magpie",
     "Mallard",
     "Manatee",
     "Mandrill",
     "Mantis",
     "Marten",
     "Meerkat",
     "Mink",
     "Mole",
     "Mongoose",
     "Monkey",
     "Moose",
     "Mosquito",
     "Mouse",
     "Mule",
     "Narwhal",
     "Newt",
     "Nightingale",
     "Octopus",
     "Okapi",
     "Opossum",
     "Oryx",
     "Ostrich",
     "Otter",
     "Owl",
     "Oyster",
     "Panther",
     "Parrot",
     "Partridge",
     "Peafowl",
     "Pelican",
     "Penguin",
     "Pheasant",
     "Pig",
     "Pigeon",
     "Pony",
     "Porcupine",
     "Porpoise",
     "Quail",
     "Quelea",
     "Quetzal",
     "Rabbit",
     "Raccoon",
     "Rail",
     "Ram",
     "Rat",
     "Raven",
     "Red deer",
     "Red panda",
     "Reindeer",
     "Rhinoceros",
     "Rook",
     "Salamander",
     "Salmon",
     "Sand Dollar",
     "Sandpiper",
     "Sardine",
     "Scorpion",
     "Seahorse",
     "Seal",
     "Shark",
     "Sheep",
     "Shrew",
     "Skunk",
     "Snail",
     "Snake",
     "Sparrow",
     "Spider",
     "Spoonbill",
     "Squid",
     "Squirrel",
     "Starling",
     "Stingray",
     "Stinkbug",
     "Stork",
     "Swallow",
     "Swan",
     "Tapir",
     "Tarsier",
     "Termite",
     "Tiger",
     "Toad",
     "Trout",
     "Turkey",
     "Turtle",
     "Viper",
     "Vulture",
     "Wallaby",
     "Walrus",
     "Wasp",
     "Weasel",
     "Whale",
     "Wildcat",
     "Wolf",
     "Wolverine",
     "Wombat",
     "Woodcock",
     "Woodpecker",
     "Worm",
     "Wren",
     "Yak",
     "Zebra"
 ];
   
   const [quessedLetters, setQuessedLetters] = useState([]);
   const [bad, setBad] = useState([]);
   const [lives, setLives] = useState(6);
   const [passwd, setPasswd] = useState("");
   const [reset, setReset] = useState(false);
   
 
 
 const RandomPasswd = ()=>{
   const random = Math.floor(Math.random() * ANIMAL_LIST.length);
   setPasswd(ANIMAL_LIST[random].toUpperCase());
   console.log(random, ANIMAL_LIST[random]);
 }
   
 useEffect(() => {
   RandomPasswd();
   }, [reset]);
   
   
   const handleClick = (e)=>{
    if (passwd.includes(e)){
      setQuessedLetters([...quessedLetters,e]);
    } else {
      setBad([...bad,e]);
      setLives(lives-1);
    }
     
     
   }
   
   const win = passwd.split("").every(letter => quessedLetters.includes(letter));
   const lose = bad.length >= 6;
   
   const restart = ()=>{
     setLives(6);
     setBad([]);
     setQuessedLetters([]);
     setReset(!reset);
     win:false;
     lose:false;
   }
   
 return(
    <div className="App">
     <h1>Animal Name Quiz</h1>
     <div className="lives">
       <span className="span-lives">Lives : <span className="lives-num">{lives}</span></span>
     </div> 
     <div className="win">
     {win && <h2>WIN !!!</h2>}
     {lose && <h2>LOSE :(</h2>}  
     </div>
       <div className="passwd">
       {passwd.split("").map((letter,idx)=>(
         <span key={idx} style={{borderBottom: ".1em solid black"}}> 
           <span 
             style={{opacity: (quessedLetters.includes(letter) || lose)? 1:0,
                     color: (!quessedLetters.includes(letter) && lose)? "firebrick":"black"}}>
            {letter}
           </span>
        </span>
       ))}
     </div>
     <div className={(win || lose)?"alphabet-hide":"alphabet"}>
       {ALPHABET.map((letter)=>( 
         <button className={quessedLetters.includes(letter)?"btn-alphabet-quest":"btn-alphabet"}
           disabled={(quessedLetters.includes(letter) || bad.includes(letter) || win || lose)? "disabled":null}
           key={letter} 
           id={letter} 
           onClick={(e)=>handleClick(e.currentTarget.id)}>{letter}</button>
       ))}
       </div>
      <div className={(win || lose)?"restart-div":"restart-div-hide"}>
         <button className="restart" onClick={restart}>Restart</button>
     </div>
    </div>
  );
}
