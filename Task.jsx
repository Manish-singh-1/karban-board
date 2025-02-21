import React, { useState } from "react";
import { useDrag } from "react-dnd";

const Task = ({ task, onEditTask, onDeleteTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TASK",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const handleSave = () => {
    onEditTask(editedTask);
    setIsEditing(false);
  };

  return (
    <div
      ref={drag}
      className="task"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {isEditing ? (
        <div className="edit-mode">
          <input
            value={editedTask.title}
            onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
          />
          <textarea
            value={editedTask.description}
            onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
          />
          <input
            type="date"
            value={editedTask.dueDate}
            onChange={(e) => setEditedTask({ ...editedTask, dueDate: e.target.value })}
          />
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <div className="view-mode" onClick={() => setIsEditing(true)}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Due: {task.dueDate}</p>
          <button onClick={() => onDeleteTask(task.id)}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default Task;