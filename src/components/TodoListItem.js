import './TodoList.css'

const TodoListItem = ({ item, updateListItem, deleteListItem }) => {
    const handleDone = () => {
        item.done = !item.done;
        updateListItem(item);
    }

    const handleChange = (value) => {
        item.description = value;
        updateListItem(item);
    }

    const handleDelete = () => deleteListItem(item);

    return (
        <div className="todo-list-item">
            <div className="todo-item-checkbox">
                <input type="checkbox" disabled={item.description ? false : true} defaultChecked={item.done} onChange={handleDone} />
            </div>
            <div className="todo-item-description">
                <input type="text" className={item.done ? 'done-strike' : ''} defaultValue={item.description} placeholder="Enter description" onChange={(e) => handleChange(e.target.value)} />
            </div>
            <div className="todo-item-actions">
                <i className="todo-action-button material-symbols-outlined" title="Delete" onClick={handleDelete}>delete</i>
            </div>
        </div>
    );
};

export default TodoListItem;