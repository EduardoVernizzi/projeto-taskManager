import { useState } from "react";


function TaskForm( {onAddTask} ){

  const [taskText, setTaskText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

  const trimmed = taskText.trim();

  if(trimmed.length === 0  ) return;

  onAddTask(trimmed);
  setTaskText('');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
      type="text"
      placeholder="Digite uma tarefa..."
      value={taskText}
      onChange={(e) => setTaskText(e.target.value)}
      />
      <button type="submit"> Adicionar </button>
    </form>
  );
}

export default TaskForm;