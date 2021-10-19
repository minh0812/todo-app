import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export default function Navbar() {
  const {theme} = useContext(ThemeContext);
  const { isLightTheme, light, dark } = theme;
  const styles = isLightTheme ? light : dark;
  return (
    <div className="navbar" style={styles}>
      <h1>My todo list</h1>
      <ul>
        <li>Home</li>
        <li>About</li>
      </ul>
    </div>
  );
}
