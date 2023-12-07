import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
      <button className="modal-close" onClick={onClose}>
          닫기
        </button>
        <div>
            <img src ='https://blog.kakaocdn.net/dn/btRmzn/btqByFePRA1/88qEfOkvKQPV8zprQhFU9K/img.png'
            alt='pic'>

            </img>
        </div>
        
        {children}
      </div>
    </div>
  );
};

export default Modal;
