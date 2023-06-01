import React, { useState } from 'react';

const ToDo = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addToDo = () => {
    if (inputValue.trim() !== '') {
      const newTodo = {
        task: inputValue,
        completed: false
      };
      const updatedTodos = [...todos, newTodo];
      setTodos(updatedTodos);
      setInputValue('');
    }
  };

  const toggleComplete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  const delToDo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addToDo();
    }
  };

  const handleFilterChange = (filterType) => {
    setFilter(filterType);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'all') {
      return true;
    } else if (filter === 'active') {
      return !todo.completed;
    } else if (filter === 'completed') {
      return todo.completed;
    }
    return true;
  });

  const clearCompleted = () => {
    const updatedTodos = todos.filter((todo) => !todo.completed);
    setTodos(updatedTodos);
  };

  return (
    <div className='container'>
      <h1>todos</h1>
      <input
        type='text'
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder='What needs to be done?'
      />
      <ul className='todo-list'>
        {filteredTodos.map((todo, index) => (
          <li key={index}>
            <input
              type='checkbox'
              checked={todo.completed}
              onChange={() => toggleComplete(index)}
            />
            <span className={todo.completed ? 'completed' : ''}>{todo.task}</span>
            <button onClick={() => delToDo(index)}>X</button>
          </li>
        ))}
      </ul>
      <div>
        <button onClick={() => handleFilterChange('all')}>All</button>
        <button onClick={() => handleFilterChange('active')}>Active</button>
        <button onClick={() => handleFilterChange('completed')}>Completed</button>
        <button onClick={clearCompleted}>Clear Completed</button>
      </div>
    </div>
  );
};

export default ToDo;
