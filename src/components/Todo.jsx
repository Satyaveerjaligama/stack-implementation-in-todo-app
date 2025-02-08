import { Button, TextField } from "@radix-ui/themes";
import { useState } from "react";
import Stack from "./Stack";
import "../styles/ToDo.css";

const ToDo = () => {
  const [mainStack, setMainStack] = useState([]);
  const [fieldValue, setFieldValue] = useState("");
  const [redoStack, setRedoStack] = useState([]);
  const [showStacks, setShowStacks] = useState(false);

  const onChangeHandler = (e) => {
    setFieldValue(e.target.value);
  };

  const onKeyDownHandler = (e) => {
    if (e.key === "Enter" && fieldValue.trim()) {
      setMainStack((prev) => [fieldValue, ...prev]);
      setFieldValue("");
    }
  };

  const undoClick = () => {
    setRedoStack((prev) => [mainStack[0], ...prev]);
    setMainStack((prev) => prev.slice(1));
  };

  const redoClick = () => {
    setMainStack((prev) => [redoStack[0], ...prev]);
    setRedoStack((prev) => prev.slice(1));
  };

  const showStacksClick = () => {
    setShowStacks(!showStacks);
  };

  return (
    <>
      <div className="todo-container">
        <h1>Todo</h1>
        <TextField.Root
          size="3"
          placeholder="Add Task and press enter"
          variant="soft"
          radius="large"
          color="violet"
          value={fieldValue}
          onKeyDown={onKeyDownHandler}
          onChange={onChangeHandler}
        >
          <TextField.Slot></TextField.Slot>
        </TextField.Root>
        <div className="buttons-container">
          <Button
            color="violet"
            onClick={undoClick}
            disabled={!mainStack.length}
          >
            Undo
          </Button>
          <Button
            color="violet"
            onClick={redoClick}
            disabled={!redoStack.length}
          >
            Redo
          </Button>
          <Button color="blue" onClick={showStacksClick}>
            {showStacks ? "Hide stacks" : "Show Stacks"}
          </Button>
        </div>
        {mainStack.map((task, index) => (
          <div key={index} className="task-item">
            {task}
          </div>
        ))}
      </div>
      {showStacks && (
        <div className="stacks-container">
          <Stack stackTitle="Main stack" stackItems={mainStack} />
          <Stack stackTitle="Redo stack" isRedoStack stackItems={redoStack} />
        </div>
      )}
    </>
  );
};
export default ToDo;
