import React from "react";
import { useDrop } from "react-dnd";
import Task from "./Task";

const Column = ({ columnId, tasks, onEditTask, onDeleteTask, onDrop }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "TASK",
    drop: (item) => onDrop(item.id, columnId),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className="column"
      style={{ backgroundColor: isOver ? "#e0e0e0" : "#f4f4f4" }}
    >
      <h2>{columnId}</h2>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onEditTask={onEditTask}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </div>
  );
};

export default Column;