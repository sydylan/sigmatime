import React from 'react';
import Timer from '../../containers/Timer/Timer'
import './Popup.css';

const Popup = () => {
  // Send a message to the background script to start the timer when the popup is opened
  
  return (
    <div className="popup-container">
      <Timer />
    </div>
  );
};


export default Popup;
