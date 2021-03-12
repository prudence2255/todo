import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { addTodo, todosSelector, toggleTodos} from '../store/reducer'

export default function AddTodoBox() {

    const {toggle, todos} = useSelector(todosSelector);

    const dispatch = useDispatch();
    const isActive = todos.filter(todo => todo.isActive === true);
    
    /**
     * add a todo
     * @param {object} e 
     */
    const handleAddTodo = (e) => {
        if(e.target.value !== '' && e.key === "Enter"){
            dispatch(addTodo(e.target.value));
            e.target.value = '';
        }
    }

    /**
     * toggle all todos to either completed ar active
     * @param {object} e 
     */
    const handleToggle = (e) => {
        dispatch(toggleTodos(e.target.checked));
    }

    const todosLength = todos.length > 0;

    return (
        <div className="add-todo-box w3-card">
        <button className={`${todosLength ? '' : 'toggle-btn'} `}>
        <input type="checkbox" name="toggler" className={`toggler ${isActive.length === 0 ? 'toggle' : ''}`}
            onChange={handleToggle} checked={toggle}
        />
        </button>
        <input type="text" placeholder="What needs to be done?" name="todo"
            onKeyUp={handleAddTodo}
        />
      </div>
    )
}
