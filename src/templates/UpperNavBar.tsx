import React, { useState } from 'react';

interface UpperNavBarProps {
  onSignOut: () => void;
}

const UpperNavBar: React.FC<UpperNavBarProps> = ({ onSignOut }) => {
  const [showLogout, setShowLogout] = useState(false);

  const handleLogoClick = () => {
    setShowLogout(!showLogout);
  };

  return (
    <div className="upper-navbar">
      <img
        src="/logo.png" // Update with your logo path
        alt="Logo"
        className="logo"
        onClick={handleLogoClick}
      />
      {showLogout && (
        <button className="logout-button" onClick={onSignOut}>
          Logout
        </button>
      )}
    </div>
  );
};

export default UpperNavBar;
