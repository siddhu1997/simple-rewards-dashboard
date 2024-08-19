import { createContext, useState } from "react";
import PropTypes from "prop-types";

const DarkThemeContext = createContext();

const DarkThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div>
      <DarkThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
        {children}
      </DarkThemeContext.Provider>
    </div>
  );
};

DarkThemeProvider.propTypes = {
  children: PropTypes.node,
};

export { DarkThemeContext, DarkThemeProvider };
