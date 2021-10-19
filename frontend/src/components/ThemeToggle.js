import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export default function ThemeToggle() {
  const { toggleTheme } = useContext(ThemeContext);
  const { theme } = useContext(ThemeContext);
  const { isLightTheme, light, dark } = theme;
  const styles = isLightTheme ? light : dark;
  return (
    <div className="toggle-btn" onClick={toggleTheme} >
      <button style={styles}>{isLightTheme === true ? 'Dark mode' : 'Light mode'}</button>
    </div>
  );
}
