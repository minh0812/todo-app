import React, { useEffect } from "react";
import { useState } from "react";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
import axios from "axios";
// import useFetch from "react-fetch-hook";

export default function Todos() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('https://mysterious-basin-95318.herokuapp.com/todo');
      setTodos(result.data.data);
    };

    fetchData();
  }, []);

  const addTodo = async (todo) => {
    await axios.post('https://mysterious-basin-95318.herokuapp.com/todo', todo);
    setTodos([todo, ...todos]);
  };

  const checkTodo = async (id) => {
    //lấy ra todo item cần thay đổi trạng thái. Thằng todo tạo mới có địa chỉ ô nhớ nằm trong arry todos nên nó sẽ thay đổi trạng thái của todos
    let todo = todos.find((element) => element.id === id);
    todo.status = todo.status === "check" ? "not check" : "check";

    axios.put(`https://mysterious-basin-95318.herokuapp.com/todo/${id}`, todo);

    setTodos([...todos]);
  };

  const deleteTodo = async (id) => {
    await axios.delete(`https://mysterious-basin-95318.herokuapp.com/todo/${id}`);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="todo-list">
      <TodoForm addTodo={addTodo} />
      <ul>
        {todos.map((todo) => (
          <TodoItem
            todo={todo}
            key={todo.id}
            checkTodo={checkTodo}
            deleteTodo={deleteTodo}
          />
        ))}
      </ul>
    </div>
  );
}
