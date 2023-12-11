import { createRef } from "react";
import { Draggable } from "react-beautiful-dnd";
import sanitizeHtml from "sanitize-html";
import ContentEditable from "react-contenteditable";
import "./TodoList.css";

const TodoListItem = ({ item, index, updateListItem, deleteListItem, addListItem }) => {
  const sanitizeConf = {
    allowedTags: ["div", "br"],
    allowedAttributes: {}
  };

  const contentEditableRef = createRef();

  const sanitize = () => {
    item.description = sanitizeHtml(item.description, sanitizeConf);
    updateListItem(item);
  };

  const handleDone = () => {
    item.done = !item.done;
    updateListItem(item);
  };

  const handleChange = (value) => {
    item.description = value;
    updateListItem(item);
  };

  const handleKeyDown = (evt) => {
    const keyCode = evt.which || evt.keyCode;
    if (keyCode === 13 && !evt.shiftKey) {
      evt.preventDefault();
      addListItem();
    }
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
            <ContentEditable
              innerRef={contentEditableRef}
              className={`text-area ${item.done ? "done-strike" : ""}`}
              html={item.description}
              onChange={(e) => handleChange(e.target.value)}
              onBlur={sanitize}
              onKeyDown={handleKeyDown}
            ></ContentEditable>
            {/* <input
              type="text"
              className={item.done ? "done-strike" : ""}
              defaultValue={item.description}
              placeholder="Enter description"
              onChange={(e) => handleChange(e.target.value)}
              onKeyDown={handleKeyDown}
            /> */}
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
