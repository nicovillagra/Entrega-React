import React, { useState, useEffect } from 'react';
import './TodoList.css'

const TodoList = () => {
    const [text, setText] = useState('');
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem('todos'));
        if (storedTodos) {
            setTodos(storedTodos);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const handleInputChange = (e) => {
        setText(e.target.value);
    };

    const handleAddTodo = () => {
        if (text) {
            setTodos([...todos, { id: Date.now(), text }]);
            setText('');
        }
    };

    const handleDeleteTodo = (id) => {
        const newTodos = todos.filter((todo) => todo.id !== id);
        setTodos(newTodos);
    };

    return (
        <div>
            <h1>To Do List</h1>
            <div className='input-wrapper'>
                <input className='input' type="text" value={text} onChange={handleInputChange} />
            </div>
            <button className='btn' onClick={handleAddTodo}>Add Todo</button>
            <ul>
                {todos.map((todo) => (
                    <div className='card'>
                        <div className='circle'></div>
                        <div className='circle'></div>
                        <div className='card-inner'>
                            <li key={todo.id}>
                                {todo.text}
                                <button className='btn' onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                            </li></div>
                    </div>

                ))}
            </ul>
        </div>
    );
};

export default TodoList;

