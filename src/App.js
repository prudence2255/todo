import React from 'react'
import {useSelector} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddTodoBox from './components/AddTodoBox';
import Todo from './components/Todo';
import TodosFooter from './components/TodosFooter';
import './styles/app.scss';
import './styles/w3.css';
import { todosSelector } from './store/reducer';




function App() {

  const {todos} = useSelector(todosSelector);

  return (
    
     <div className="app row">
    <div>
      <h1>Todos</h1>
    <div className="todos-container w3-card">
    <AddTodoBox />
    <Todo />
    {todos.length > 0 && <TodosFooter />}
    </div>
    <div className="text-center my-5 text-muted">
      <p><small>Double-click to edit a todo</small></p>
      <a href="/"><small>Check the source for this project on Github</small></a>
    </div>

    </div>
    </div>

  
  )
}

export default App;








