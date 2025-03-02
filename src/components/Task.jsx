import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Container = styled.div`
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 8px;
  background-color: ${(props) => (props.isDragging ? "lightgreen" : "#fff")};
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
`;

const TextContent = styled.div`
  font-size: 14px;
  font-weight: bold;
`;

const Description = styled.p`
  font-size: 12px;
  color: gray;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const Avatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;

export default function Task({ task, index }) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <TextContent>{task.title}</TextContent>
          <Description>{task.description}</Description>
          <Avatar src={`https://api.dicebear.com/7.x/identicon/svg?seed=${task.id}`} />
        </Container>
      )}
    </Draggable>
  );
}
