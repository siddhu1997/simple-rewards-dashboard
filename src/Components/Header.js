import { useContext } from "react";
import { FaMoon, FaSun } from "react-icons/fa6";
import { DarkThemeContext } from "../Contexts/DarkThemeContext";
import { getThemeClasses } from "../utils/Helpers";
import { CONSTANTS } from "../utils/Config";

const Header = () => {
  const { darkMode, toggleDarkMode } = useContext(DarkThemeContext);
  return (
    <div
      className={getThemeClasses(
        darkMode,
        "flex h-20 justify-between border-b-2 border-solid border-black",
        true,
      )}
    >
      <h1
        className={getThemeClasses(
          darkMode,
          "m-5 p-2 text-2xl font-sans font-bold",
          true,
        )}
      >
        Rewards Dashboard
      </h1>
      <div onClick={toggleDarkMode} className="flex items-center mx-10">
        {darkMode ? (
          <FaMoon size={CONSTANTS.THEME_SWITCH_ICON_SIZE} />
        ) : (
          <FaSun size={CONSTANTS.THEME_SWITCH_ICON_SIZE} />
        )}
      </div>
    </div>
  );
};

export default Header;
