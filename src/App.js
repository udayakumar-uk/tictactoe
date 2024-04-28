import React, {useState, useEffect} from "react";
import './App.css'
import Xsvg from './x.svg';
import Osvg from './o.svg';
import Confetti from 'react-confetti'

export default function App(){

  const Squres = [
    {id: 1, value: null},
    {id: 2, value: null},
    {id: 3, value: null},
    {id: 4, value: null},
    {id: 5, value: null},
    {id: 6, value: null},
    {id: 7, value: null},
    {id: 8, value: null},
    {id: 9, value: null}
  ]
  
    const [square, setSquare] = useState(Squres);
    const [player, setPlayer] = useState({playing:false, winner: false});
    const [wins, setWins] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    
    useEffect(()=>{
        let checkWinner = checkPlayerWin();
        setPlayer(prev => ({...prev, winner: checkWinner}));
        setGameOver(square.every(sqr => sqr.value !== null));
    }, [square])

    function triggerPlayer(id, index){
        if(square[index].value){
            return
        }
        setSquare(prevEl => prevEl.map(sqr => sqr.id === id ? {...sqr, value: player.playing ? '0' : '1'} : sqr))
        setPlayer(prev => ({...prev, playing: !prev.playing}));
    }

    function checkPlayerWin(){
        const pattern = [
            [1,2,3],
            [4,5,6],
            [7,8,9],
            [1,4,7],
            [2,5,8],
            [3,6,9],
            [1,5,9],
            [3,5,7]
        ];

        for(var i=0; i<pattern.length; i++){
            const [a, b, c] = pattern[i];
            if(square[a - 1].value || square[b - 1].value || square[c - 1].value){
                if((square[a - 1].value === square[b - 1].value) && (square[b - 1].value === square[c - 1].value)){
                    setWins(pattern[i]);
                    return square[a - 1].value;
                }
            }
        }
    }

    function restart(){
        setSquare(prev => prev.map(obj => ({...obj, value: null})));
        setPlayer({playing:false, winner: false});
        setWins([])
    }
    
    return(
        <section className="tictac-canvas">
            {(!player.winner && !gameOver) && <h4>Player : <img src={player.playing ? Xsvg : Osvg } className="player-icon"  alt="player" /></h4>}
            {player.winner && <h4><img src={player.winner === '0' ? Xsvg : Osvg} className="player-icon"  alt="player" /> - Winner</h4>}
            {gameOver && !player.winner && <h4 className="game-over">Game Over</h4>}
            {player.winner && <Confetti />}
            <div className="square">
                {square.map((squ, index) => (
                  <button 
                    type="button" 
                    key={squ.id} 
                    onClick={()=> 
                    triggerPlayer(squ.id, index)} 
                    className="square-button" 
                    style={{backgroundColor: wins.includes(squ.id) ? '#7fffbd': 'initial', pointerEvents: player.winner || gameOver ? 'none' : 'auto', opacity: player.winner || gameOver ? '0.6' : '1' }}>
                      { squ.value && <img src={squ.value === '0' ? Xsvg : Osvg} style={{width: '50px'}}  alt="player" />}
                  </button>))}
            </div>
            {(player.winner || gameOver) && <div className="text-center"> <button className="restart-btn" onClick={restart}>Restart Game</button></div>}
        </section>
    )
}

