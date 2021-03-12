import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import { todosSelector, applyFilter, clearCompletedTodos } from '../store/reducer';

export default function TodosFooter() {
    const [filter, setFilter] = useState();
    const {todos} = useSelector(todosSelector);
    const isActive = todos.filter(todo => todo.isActive === true);
    const dispatch = useDispatch();
   
    /**
     * filters the todos
     * @param {string} filter 
     */
    const handleFilter = (filter) => {
        setFilter(filter);
        dispatch(applyFilter(filter));
    }

    /**
     * clear completed todos
     */
    const handleClear = () => {
        dispatch(clearCompletedTodos());
    }

    return (
        <div className="todos-footer p-2 px-3">
        <div>
        {isActive.length === 1 ? '1 item left' : `${isActive.length} items left`}
         </div>
        <div className="todo-filters">
          <button onClick={() => handleFilter('all')} className={`${filter === 'all'? 'active':''}`}>All</button>
          <button onClick={() => handleFilter('active')} className={`${filter === 'active'? 'active':''}`}>Active</button>
          <button onClick={() => handleFilter('complete')} className={`${filter === 'complete'? 'active':''}`}>Completed</button>
        </div>
        <div>
          <button onClick={handleClear}>Clear completed</button>
        </div>
      </div>
    )
}
