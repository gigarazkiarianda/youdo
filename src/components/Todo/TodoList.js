import React, { useEffect, useState } from "react";
import { getTodos } from '../../services/todoService';

const TodoList = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const fetchTodos = async () => {
            const TodoList = await getTodos();
            setTodos(TodoList);
        };

        fetchTodos();
    }, []);

    return( 
        <div className="todo-list"> 
            <h1>Todos</h1>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                       <p>{todo.text}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;