import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import { removeTodo, todosSelector, editTodo, completed } from '../store/reducer';

export default function Todo() {
const [edit, setEdit] = useState();
const [currentTodoId, setCurrentTodoId] = useState();
const {todos, filter} = useSelector(todosSelector);
const dispatch = useDispatch();

/**
 * removes a todo from the list
 * @param {int} id 
 * 
 */
    const handleRemove = (id) => {
        dispatch(removeTodo(id));
    }

    /**
     * opens the text boxing for editing a todo
     * @param {int} id 
     */
    const handleInitEdit = (id) => {
        setEdit(true);
        const todo = todos.find(todo => todo.id === id);
        setCurrentTodoId(todo.id);
    }

    /**
     * edits a todo
     * @param {object} e 
     * @param {int} id 
     */
    const handleEdit = (e, id) => {
       if(e.target.value !== '' && e.key === "Enter"){
        setEdit(false);
        dispatch(editTodo({id: id, name: e.target.value}))
       }
    }

    /**
     * completes a todo
     * @param {object} e 
     * @param {int} id 
     */
    const handleComplete = (e, id) => {
        dispatch(completed({id: id, value: e.target.checked}))
    }

    /**
     * set the filtered todos
     */
    let tempTodos = [...todos];
    if(filter !== 'all'){
        switch (filter) {
            case 'active':
                tempTodos = tempTodos.filter(todo => todo.isActive === true);
                break;
            case 'complete':
                tempTodos = tempTodos.filter(todo => todo.isCompleted === true);
                break;
            default:
                tempTodos = todos
                break;
        }
    }


    const allTodos = tempTodos.map((todo, i) => (
        <li key={i} className={`${edit && currentTodoId === todo.id ? 'edit-current' : ''}`}>
           <div className={`${todo.isCompleted ? 'complete' : ''}`}>
             <p className={`${edit && currentTodoId === todo.id ? 'hide' : ''}`}><input type="checkbox" name="task" 
                 onChange={(e) => handleComplete(e, todo.id)} checked={todo.isCompleted}
             /></p>
              <p onDoubleClick={() => handleInitEdit(todo.id)} className="todo-name">
               {edit && currentTodoId === todo.id ? <span><input type="text" name="edit" defaultValue={todo.name}
                   onKeyUp={(e) => handleEdit(e, todo.id)} className="edit-input"
               />
               </span> : <span>{todo.name}</span>
               }
             </p>
             <p className={`${edit && currentTodoId === todo.id ? 'hide' : ''}`}><button onClick={() => handleRemove(todo.id)}>×</button></p>
           </div>
         </li>
           ));

    useEffect(() => {
    }, [todos]);

    return (
        <div className="todos">
        <ul>
           {allTodos}
        </ul>
        </div>
    )
}
