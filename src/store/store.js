import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import todosReducer from './reducer';



/**
 * store
 */
const appStore = (initialStore) => {
  const store = configureStore({
        middleware: getDefaultMiddleware({
          serializableCheck: false,
          immutableStateInvariant: false
        }),
          reducer: todosReducer,
          initialStore
        })

    if (process.env.NODE_ENV !== 'production' && module.hot) {
     module.hot.accept('./reducer.js', () => store.replaceReducer(todosReducer))
    }
        
   return store     
}


export default appStore;




