import { useState } from "react";
import "../styles/TaskItem.css"

export default function TaskItem({ task, markTaskAsCompleted, deleteTask, updateTask }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState({ 
        title: task.title, 
        description: task.description, 
        priority: task.priority 
    });

    const handleSave = () => {
        updateTask(task.id, editedTask);
        setIsEditing(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedTask(prev => ({ ...prev, [name]: value }));
    };
    return (
        <div className="task-div">
            <div className="task">
                {isEditing ? (
                    <div className="edit-mode">
                        <input name="title" value={editedTask.title} onChange={handleChange} />
                        <textarea name="description" value={editedTask.description} onChange={handleChange} />
                        <select name="priority" value={editedTask.priority} onChange={handleChange}>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                        <div className="buttons">
                            <button onClick={handleSave} className="task-button save">Save</button>
                            <button onClick={() => setIsEditing(false)} className="task-button cancel">Cancel</button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <h4>{task.title}</h4>
                        <p>{task.description}</p>
                        <div className="task-desc">
                            <span className={`status ${task.completed ? "status-completed" : "status-pending"}`}>
                                {task.completed ? "Completed" : "Pending"}
                            </span>
                            <span className={`priority ${task.priority}`}>{task.priority}</span>
                        </div>

                        <div className="buttons">
                            <button onClick={() => setIsEditing(true)} className="task-button edit">Edit</button>
                            {!task.completed ? (
                                <button className="task-button complete" onClick={() => markTaskAsCompleted(task.id)}>
                                    Mark as complited
                                </button>) : (
                                <button className="task-button uncomplete" onClick={() => markTaskAsCompleted(task.id)}>
                                    Mark as uncomplited
                                </button>
                            )}
                            <button className="task-button delete" onClick={() => deleteTask(task.id)}>
                                Delete
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}