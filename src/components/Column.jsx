import React from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import Task from "./Task";

const Container = styled.div`
  background-color: #f4f5f7;
  border-radius: 5px;
  width: 250px;
  min-height: 500px;
  padding: 10px;
  border: 1px solid gray;
`;

const Title = styled.h3`
  text-align: center;
  padding: 8px;
  background-color: ${(props) =>
    props.title === "To Do"
      ? "#F7D7D7"
      : props.title === "In Progress"
      ? "#FDEBD0"
      : props.title === "Peer Review"
      ? "#D5F5E3"
      : "#D6EAF8"};
`;

const TaskList = styled.div`
  padding: 10px;
`;

export default function Column({ title, tasks, id }) {
  return (
    <Container>
      <Title title={title}>{title}</Title>
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <TaskList ref={provided.innerRef} {...provided.droppableProps}>
            {tasks
              .filter((task) => task.status === id)
              .map((task, index) => (
                <Task key={task.id} task={task} index={index} />
              ))}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
    </Container>
  );
}
