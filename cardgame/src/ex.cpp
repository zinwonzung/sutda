import React, { useState, useEffect } from 'react';
import './cardgame.css';

const generateColors = () => {
  let chosenColor = [
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
    // 'https://blog.kakaocdn.net/dn/CQs8q/btrpU0IKcXj/CkTt61J56WJBJn5pGSTrwk/img.png',
    // 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpYolnZjPcoP6eFwfOmp1sYon8q2pcEqFFaQpapsnbAGtQ_2I9K4HGRuvn7Zt9PBlQ2DE&usqp=CAU'
  ];
  return chosenColor.slice().sort(() => Math.random() - 0.5);
};

const CardGame = () => {
  const [chosenColor, setChosenColor] = useState([]);
  const [clickedCards, setClickedCards] = useState([]);
  const [completedCards, setCompletedCards] = useState([]);
  const [clickFlag, setClickFlag] = useState(false);
  const [start, setStart] = useState(null);

  useEffect(() => {
    setChosenColor(generateColors());
    setClickFlag(false);

    const timer = setTimeout(() => {
      setClickFlag(true);
      setStart(new Date());
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleCardClick = (index) => {
    if (!clickFlag || completedCards.includes(index)) return;

    setClickedCards((prev) => {
      const newClickedCards = [...prev, index];

      if (newClickedCards.length === 1) {
        if (chosenColor[prev[0]] === chosenColor[index]) {
          setCompletedCards((prev) => [...prev, prev[0], index]);
          return [];
        } else {
          setClickFlag(false);

          setTimeout(() => {
            setClickFlag(true);
            return [];
          }, 1000);
        }
      }

      return newClickedCards;
    });
  };

  const renderCards = () => {
    return chosenColor.map((imageURL, index) => (
      <div key={index} className={`card ${clickedCards.includes(index) ? 'flipped' : ''}`} onClick={() => handleCardClick(index)}>
        <div className="card-inner">
          <div className="card-front"></div>
          <div className="card-back" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/${imageURL})` }}></div>
        </div>
      </div>
    ));
  };

  return (
    <div id="wrapper" style={{ backgroundColor: 'green' }} >
      <div className='title'>섯다 GAME</div>
      {renderCards()}
      {completedCards.length === chosenColor.length && (
        <div>
          축하합니다. {(new Date() - start) / 1000}초 걸렸습니다.
        </div>
      )}
    </div>
  );
};

export default CardGame;
