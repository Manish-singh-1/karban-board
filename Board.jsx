import React, { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Column from "./Column";
import { v4 as uuid } from "uuid";

const Board = () => {
  const [columns, setColumns] = useState({
    "To-Do": [],
    "In Progress": [],
    Done: [],
  });

  // Load saved state from localStorage
  useEffect(() => {
    const savedState = JSON.parse(localStorage.getItem("kanban-board"));
    if (savedState) setColumns(savedState);
  }, []);

  // Save state to localStorage
  useEffect(() => {
    localStorage.setItem("kanban-board", JSON.stringify(columns));
  }, [columns]);

  // Add a new task
  const addTask = (columnId) => {
    const newTask = {
      id: uuid(),
      title: "New Task",
      description: "Description",
      dueDate: new Date().toISOString().split("T")[0],
    };
    setColumns({
      ...columns,
      [columnId]: [...columns[columnId], newTask],
    });
  };

  // Edit a task
  const editTask = (updatedTask) => {
    const updatedColumns = Object.keys(columns).reduce((acc, columnId) => {
      acc[columnId] = columns[columnId].map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      );
      return acc;
    }, {});
    setColumns(updatedColumns);
  };

  // Delete a task
  const deleteTask = (taskId) => {
    const updatedColumns = Object.keys(columns).reduce((acc, columnId) => {
      acc[columnId] = columns[columnId].filter((task) => task.id !== taskId);
      return acc;
    }, {});
    setColumns(updatedColumns);
  };

  // Handle task drop
  const handleDrop = (taskId, targetColumnId) => {
    const sourceColumnId = Object.keys(columns).find((columnId) =>
      columns[columnId].some((task) => task.id === taskId)
    );
    if (sourceColumnId === targetColumnId) return;

    const task = columns[sourceColumnId].find((task) => task.id === taskId);
    const updatedSourceColumn = columns[sourceColumnId].filter(
      (task) => task.id !== taskId
    );
    const updatedTargetColumn = [...columns[targetColumnId], task];

    setColumns({
      ...columns,
      [sourceColumnId]: updatedSourceColumn,
      [targetColumnId]: updatedTargetColumn,
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="board">
        {Object.keys(columns).map((columnId) => (
          <div key={columnId} className="column-container">
            <h2>{columnId}</h2>
            <button onClick={() => addTask(columnId)}>Add Task</button>
            <Column
              columnId={columnId}
              tasks={columns[columnId]}
              onEditTask={editTask}
              onDeleteTask={deleteTask}
              onDrop={handleDrop}
            />
          </div>
        ))}
      </div>
    </DndProvider>
  );
};

export default Board;