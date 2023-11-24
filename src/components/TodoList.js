import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import TodoListItem from "./TodoListItem";
import "./TodoList.css";

const TodoList = ({ todoList }) => {
  const [list, setList] = useState([
    ...JSON.parse(localStorage.getItem("todoList") || "[]"),
  ]);

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(list));
  }, [list]);

  const updateListItem = (item) => {
    const existingItemIndex = list.findIndex(
      (existingItem) => existingItem.id === item.id
    );
    if (existingItemIndex >= 0) {
      const updatedList = [...list];
      updatedList[existingItemIndex] = item;
      setList(updatedList);
    }
  };

  const addListItem = () => {
    const newItem = {
      id: nanoid(),
      done: false,
      description: "",
    };
    setList([...list, newItem]);
  };

  const deleteListItem = (item) => {
    const existingItemIndex = list.findIndex(
      (existingItem) => existingItem.id === item.id
    );
    if (existingItemIndex >= 0) {
      list.splice(existingItemIndex, 1);
      const updatedList = [...list];
      setList(updatedList);
    }
  };

  return (
    <div className="todo-list-container">
      <h3>To-Do List</h3>
      <div className="todo-item-container">
        {list.length ? (
          list.map((item) => {
            return (
              <TodoListItem
                key={item.id}
                item={item}
                updateListItem={updateListItem}
                deleteListItem={deleteListItem}
              />
            );
          })
        ) : (
          <div className="todo-empty">
            <h2>Hooray!</h2>
            <p>Nothing left to complete.</p>
            <p>
              To add a task click on <b>Add New Item</b>
            </p>
          </div>
        )}
      </div>
      <div className="todo-item-adder" onClick={addListItem}>
        <div className="todo-add-icon">+</div>
        <div className="todo-add-text">Add new item</div>
      </div>
    </div>
  );
};

export default TodoList;
