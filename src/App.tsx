// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import SignUp from './templates/SignUp';
// import SignIn from './templates/SignIn';
// import UpperNavBar from './templates/UpperNavBar';
// import NavBar from './templates/NavBar';
// import MainContent from './templates/MainContent';
// import './templates/Styles.css';
// import './App.css';

// const App: React.FC = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   const handleSignIn = () => {
//     setIsAuthenticated(false);
//   };

//   const handleSignOut = () => {
//     setIsAuthenticated(false);
//   };

//   return (
//     <Router>
//       <div className="App">
//         <Routes>
//           <Route path="/signup" element={<SignUp />} />
//           <Route path="/signin" element={<SignIn onSignIn={handleSignIn} />} />
//           {isAuthenticated ? (
//             <Route path="/" element={<AuthenticatedApp onSignOut={handleSignOut} />} />
//           ) : (
//             <Route path="/" element={<Navigate to="/signin" />} />
//           )}
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// const AuthenticatedApp: React.FC<{ onSignOut: () => void }> = ({ onSignOut }) => {
//   return (
//     <>
//       <UpperNavBar onSignOut={onSignOut} />
//       <div className="body-container">
//         <NavBar />
//         <MainContent />
//       </div>
//     </>
//   );
// };

// export default App;


import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import UpperNavBar from './templates/UpperNavBar';
import NavBar from './templates/NavBar';
import MainContent from './templates/MainContent';
import SignIn from './templates/SignIn'; // Import the SignIn component for demonstration purposes
import './templates/Styles.css';
import './App.css';


const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSignIn = () => {
    setIsAuthenticated(true);
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="App">
        <UpperNavBar onSignOut={handleSignOut} />
        <div className="body-container">
          <NavBar />
          <MainContent />
        </div>
        {/* For demonstration only: render the SignIn component */}
        {/* {!isAuthenticated && <SignIn onSignIn={handleSignIn} />} */}
      </div>
    </Router>
  );
};

export default App;







