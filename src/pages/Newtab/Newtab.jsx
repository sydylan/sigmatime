// import React from 'react';
// import logo from '../../assets/img/logo.svg';
// import './Newtab.css';
// import './Newtab.scss';

// const Newtab = () => {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/pages/Newtab/Newtab.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React!
//         </a>
//         <h6>The color of this paragraph is defined using SASS.</h6>
//       </header>
//     </div>
//   );
// };

// export default Newtab;

import React, { useEffect } from 'react';

const Newtab = () => {
  useEffect(() => {
    // Redirect to the default Chrome new tab page
    window.location.replace('chrome://newtab');
  }, []);

  return null; // Return null to prevent any content from showing on this page
};

export default Newtab;