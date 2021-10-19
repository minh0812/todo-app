import React, { useContext, useState } from "react";
import { v4 } from "uuid";
import { ThemeContext } from "../contexts/ThemeContext";

export default function TodoForm(props) {
  const [title, setTitle] = useState("");

  const onTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.addTodo({
      id: v4().slice(1, 4),
      title: title,
      status: "not check",
    });
    setTitle("");
  };

  //style
  const { theme } = useContext(ThemeContext);
  const { isLightTheme, light, dark } = theme;
  const styles = isLightTheme ? light : dark;

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Enter a new todo..."
        onChange={onTitleChange}
        value={title}
        required
        style={styles}
      />
      <input type="submit" value="Add" style={styles} />
    </form>
  );
}
