
function TaskItem ( {task, onToggle,  onDelete} ){

  const handleClick = () => {
    onToggle(task.id);
  }

  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      <span >
        {task.text}
      </span>
      <button onClick={() => onDelete(task.id)}>{task.completed ? '🗑️' : ''}</button>
      <button onClick={() => onToggle(task.id)}> {task.completed ? '❌' : '✅'} </button>
    </li>
  );
}

export default TaskItem;