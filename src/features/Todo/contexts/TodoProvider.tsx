
import React from 'react';
import { IAction, TodoState } from '../models/interface';
import todoReducer, { initialValue } from '../services/states/todoReducer';

export const TodoContext = React.createContext<{
  todoState: TodoState
  dispatch: React.Dispatch<IAction>
}>({
  todoState: initialValue,
  dispatch: () => undefined
});

interface TodoProviderProps {
  children: JSX.Element
}

const TodoProvider = (props: TodoProviderProps): JSX.Element => {
  const { children } = props;

  const [todoState, dispatch] = React.useReducer(todoReducer, initialValue);

  return (
    <TodoContext.Provider value={{ todoState, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
