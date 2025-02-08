import "../styles/Stack.css";

const Stack = ({ stackTitle, stackItems, isRedoStack }) => {
  return (
    <div className="stack-container">
      <p className="stack-title">{stackTitle}</p>
      <div>
        {stackItems.map((task, index) => (
          <div
            key={index + task}
            className={`${isRedoStack ? "redo-background" : ""} stack-item`}
          >
            {task}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stack;
