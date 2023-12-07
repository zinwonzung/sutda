import React, { useState, useEffect } from 'react';
import Modal from './components/modal'
import './cardgame.css';

const cardImages = [
  'img/1.1.png',
  'img/1.2.png',
  'img/2.1.png',
  'img/2.2.png',
  'img/3.1.png',
  'img/3.2.png',
  'img/4.1.png',
  'img/4.2.png',
  'img/5.1.png',
  'img/5.2.png',
  'img/6.1.png',
  'img/6.2.png',
  'img/7.1.png',
  'img/7.2.png',
  'img/8.1.png',
  'img/8.2.png',
  'img/9.1.png',
  'img/9.2.png',
  'img/10.1.png',
  'img/10.2.png',
];

// 두 장의 중복되지 않는 카드를 랜덤으로 선택하는 함수
function getRandomCards() {
  const randomIndex1 = Math.floor(Math.random() * cardImages.length);
  let randomIndex2 = randomIndex1;

  // 두 개의 다른 인덱스 보장
  while (randomIndex2 === randomIndex1) {
    randomIndex2 = Math.floor(Math.random() * cardImages.length);
  }

  // 두 장의 카드를 반환
  return [cardImages[randomIndex1], '/img/back.png'];
}

function App() {
  const [MyMoney, setMyMoney] = useState(10000);
  const [PlayerMoney, setPlayerMoney] = useState(10000);
  const [playerCards, setPlayerCards] = useState([]);
  const [computerCards, setComputerCards] = useState([]);
  const [bettingAmount, setBettingAmount] = useState(100);
  const [gameStarted, setGameStarted] = useState(false);
  const [flipAnimation, setFlipAnimation] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
  
  }, []);

  const startGame = () => {
    setGameStarted(true);
    setFlipAnimation(true); 
  };

  const handleBet = (amount) => {
    const newBettingAmount = bettingAmount + amount;
    if (newBettingAmount > 10000){
      console.log('배팅금액 부족');
      return;
    }

    setBettingAmount(newBettingAmount);
  };

  const dealCards = () => {
    const [newPlayerCard1, newPlayerCard2] = getRandomCards();
    const [newComputerCard1, newComputerCard2] = getRandomCards();

    setFlipAnimation(false); 
    setTimeout(() => {
      setPlayerCards([newPlayerCard1, newPlayerCard2]);
      setComputerCards([newComputerCard1, newComputerCard2]);
      setFlipAnimation(true); 
    }, 500); 
  };

  const endGame = () => {
    setGameStarted(false);
  };

  return (
    <div className="Board">
      <img className='icon'
        src ='https://play-lh.googleusercontent.com/utNMQ32wbnJA99knlr8T-SSowztuoXlMbBhHZD5M6_HxpvTdSVthM1cjDs0-Lqascgw'
        alt='icon'/>
      <h1 className='title'>섯다 게임</h1>
      <button className='info' onClick={() => setIsModalOpen(true)}>족보</button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      </Modal>
      <div>
        <p>나의 자금: {MyMoney - bettingAmount}원</p>
        <p>상대 자금: {PlayerMoney}원</p>
        {!gameStarted && <button className='startButton' onClick={startGame}>게임시작</button>}
      </div>
      {gameStarted && (
        <div>
          <button className='button2' onClick={dealCards}>카드보기</button>
          <h2>배팅</h2>
          <p className=''>배팅금액: {bettingAmount}</p>
          <button className='button' onClick={() => handleBet(100)}>100원 배팅</button>
          <button className='button' onClick={() => handleBet(500)}>500원 배팅</button>
          <button className='button' onClick={() => handleBet(1000)}>1000원 배팅</button>
          <button className='button' onClick={() => handleBet(MyMoney - bettingAmount)}>올인</button>
          <button className='button' onClick={() => handleBet(0)}>죽기</button>
          <button className='button' onClick={() => handleBet(-bettingAmount)}>초기화</button>
          
        </div>
      )}
      <div>
        {playerCards.map((card, index) => (
          <img
            key={`player-card-${index}`}
            src={flipAnimation ? card : 'img/back.png'}
            alt={`Player Card ${index + 1}`}
          />
        ))}
        {computerCards.map((card, index) => (
          <img
            key={`computer-card-${index}`}
            src={flipAnimation ? card : 'img/back.png'}
            alt={`Computer Card ${index + 1}`}
          />
        ))}
      </div>
      {gameStarted && <button onClick={endGame}>게임종료</button>}
    </div>
  );
}

export default App;
