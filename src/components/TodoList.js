import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import TodoListItem from "./TodoListItem";
import "./TodoList.css";

import { DragDropContext, Droppable } from "react-beautiful-dnd";

const TodoList = ({ todoList }) => {
  const [list, setList] = useState([...JSON.parse(localStorage.getItem("todoList") || "[]")]);

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(list));
  }, [list]);

  const updateListItem = (item) => {
    const existingItemIndex = list.findIndex((existingItem) => existingItem.id === item.id);
    if (existingItemIndex >= 0) {
      if (item.done && list[existingItemIndex] !== item.done) {
        list.splice(existingItemIndex, 1);
        list.push(item);
      } else {
        list[existingItemIndex] = item;
      }
      const updatedList = [...list];
      setList(updatedList);
    }
  };

  const addListItem = () => {
    const newItem = {
      id: nanoid(),
      done: false,
      description: ""
    };
    setList([...list, newItem]);
  };

  const deleteListItem = (item) => {
    const existingItemIndex = list.findIndex((existingItem) => existingItem.id === item.id);
    if (existingItemIndex >= 0) {
      list.splice(existingItemIndex, 1);
      const updatedList = [...list];
      setList(updatedList);
    }
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;
    const updatedList = [...list];
    const [movedItem] = updatedList.splice(source.index, 1);
    updatedList.splice(destination.index, 0, movedItem);
    setList(updatedList);
  };

  return (
    <div className="todo-list-container">
      <h3>To-Do List</h3>

      <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
        <Droppable key="mainColumn" droppableId="mainColumn">
          {(provided, snapshot) => (
            <div
              className={`todo-item-container ${snapshot.isDraggingOver ? "disable-pointer" : ""}`}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {list.length ? (
                list.map((item, index) => {
                  return (
                    <TodoListItem
                      key={item.id}
                      index={index}
                      item={item}
                      updateListItem={updateListItem}
                      deleteListItem={deleteListItem}
                    ></TodoListItem>
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
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div className="todo-item-adder" onClick={addListItem}>
        <div className="todo-add-icon">+</div>
        <div className="todo-add-text">Add new item</div>
      </div>
    </div>
  );
};

export default TodoList;
