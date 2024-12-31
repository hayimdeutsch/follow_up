const Question = ({ question, index, handleDeleteQuestion }) => {
  return (
    <li>
      {JSON.stringify(question)}
      <button onClick={() => handleDeleteQuestion(index)}>Delete</button>
    </li>
  );
};

export default Question;
