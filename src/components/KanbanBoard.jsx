import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
`;

const SearchBar = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const AddButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  font-size: 24px;
  cursor: pointer;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
`;

export default function KanbanBoard() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((json) =>
        setTasks(json.slice(0, 10).map((task) => ({
          id: String(task.id),
          title: task.title,
          description: "This is a sample description.",
          status: "To Do",
        })))
      );
  }, []);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;
    setTasks((prev) =>
      prev.map((task) =>
        task.id === draggableId ? { ...task, status: destination.droppableId } : task
      )
    );
  };

  const addTask = () => {
    const title = prompt("Enter Task Title:");
    const description = prompt("Enter Task Description:");
    if (title && description) {
      setTasks([
        ...tasks,
        { id: String(tasks.length + 1), title, description, status: "To Do" },
      ]);
    }
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Kanban Board</h2>
      <SearchBar
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <DragDropContext onDragEnd={handleDragEnd}>
        <Container>
          {["To Do", "In Progress", "Peer Review", "Done"].map((status) => (
            <Column key={status} title={status} tasks={filteredTasks} id={status} />
          ))}
        </Container>
      </DragDropContext>
      <AddButton onClick={addTask}>+</AddButton>
    </div>
  );
}
