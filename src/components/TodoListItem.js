import "./TodoList.css";

import { Draggable } from "react-beautiful-dnd";

const TodoListItem = ({ item, index, updateListItem, deleteListItem }) => {
  const handleDone = () => {
    item.done = !item.done;
    updateListItem(item);
  };

  const handleChange = (value) => {
    item.description = value;
    updateListItem(item);
  };

  const handleDelete = () => deleteListItem(item);

  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={`todo-list-item ${snapshot.isDragging ? "dragging" : ""}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div className="todo-drag-handle" {...provided.dragHandleProps}>
            <i className="material-symbols-outlined" title="Drag">
              drag_indicator
            </i>
          </div>
          <div className="todo-item-checkbox">
            <input
              type="checkbox"
              disabled={item.description ? false : true}
              defaultChecked={item.done}
              onChange={handleDone}
            />
          </div>
          <div className="todo-item-description">
            <input
              type="text"
              className={item.done ? "done-strike" : ""}
              defaultValue={item.description}
              placeholder="Enter description"
              onChange={(e) => handleChange(e.target.value)}
            />
          </div>
          <div className="todo-item-actions">
            <i className="todo-action-button material-symbols-outlined" title="Delete" onClick={handleDelete}>
              delete
            </i>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TodoListItem;
