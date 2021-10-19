import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export default function TodoItem(props) {
  //style
  const { theme } = useContext(ThemeContext);
  const { isLightTheme, light, dark } = theme;
  const styles = isLightTheme ? light : dark;
  const check = {
    textDecoration: "line-through",
  };
  const not_check = {
    textDecoration: "none",
  };
  const check_styles = props.todo.status === "check" ? check : not_check;

  return (
    <div style={styles}>
      <li
        style={check_styles}
        onClick={() => {
          props.checkTodo(props.todo.id);
        }}
      >
        {props.todo.title}
        <i
          className="bi bi-trash"
          onClick={() => props.deleteTodo(props.todo.id)}
        ></i>
      </li>
    </div>
  );
}
