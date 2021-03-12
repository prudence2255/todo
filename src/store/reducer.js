import { createSlice, createSelector} from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

/**
 * reducer for errors
 */
const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: [],
        filter: 'all',
       toggle: false,
    },
    reducers: {
        addTodo: (state, action) => {
            state.todos = [
                {
                id: uuidv4(),
                name: action.payload,
                isCompleted: false,
                isActive: true
            },
            ...state.todos,
        ]
        },

        removeTodo: (state, action) => {
            const tempTodos = state.todos.filter(todo => todo.id !== action.payload);
            state.todos = tempTodos;
        },

        editTodo: (state, action) => {
            const todoIndex = state.todos.findIndex((todo) => todo.id === action.payload.id)
            const newTodos = [...state.todos]   
           newTodos[todoIndex] = Object.assign({}, newTodos[todoIndex],
                                     {...newTodos[todoIndex], name: action.payload.name});
           state.todos = newTodos
        },

      completed: (state, action) => {
         const {id, value} = action.payload; 
        const todoIndex = state.todos.findIndex((todo) => todo.id === id)
        const newTodos = [...state.todos];   
        newTodos[todoIndex] = Object.assign({}, newTodos[todoIndex],
                                        {...newTodos[todoIndex],
                                            isCompleted: value,
                                            isActive: !value
                                         });
             state.todos = newTodos;
      },
      
      applyFilter: (state, action) => {
          if(action.payload === 'all'){
              state.filter = 'all';
          }
          if(action.payload === 'active'){
            state.filter = 'active';
          }

          if(action.payload === 'complete'){
              state.filter = 'complete';
          }

          
      },

      clearCompletedTodos: (state) => {
          let tempTodos = state.todos.filter(todo => todo.isCompleted === false);
          state.todos = tempTodos;
      },

      toggleTodos: (state, action) => {
        let tempTodos = state.todos.map(todo => {
            if(!todo.isCompleted){
                return {
                    ...todo,
                    isCompleted: true,
                    isActive: false
                }
            }else{
                return {
                    ...todo,
                    isCompleted: action.payload,
                    isActive: !action.payload
                }
            }
        });
        state.toggle = action.payload;
        state.todos = tempTodos  
      },

  
    },

    extraReducers: {}
})

 export const {
    addTodo,
    removeTodo,
    editTodo,
    completed,
    applyFilter,
    clearCompletedTodos,
    toggleTodos,
   
} = todosSlice.actions

export const todosSelector = createSelector(
    (state) => ({
        todos: state.todos,
        filter: state.filter,
       toggle: state.toggle 
     }),
 
     (state) => state
 )
 
 export default todosSlice.reducer