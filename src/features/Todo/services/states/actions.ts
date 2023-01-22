import { IAction, Todo } from '../../models/interface';
import { EAction } from './constants';

export const addTodo = (payload: Todo): IAction => {
  return {
    type: EAction.ADD_TODO,
    payload
  };
};

export const deleteTodo = (payload: number): IAction => {
  return {
    type: EAction.DELETE_TODO,
    payload
  };
};

export const editTodo = (payload: Todo): IAction => {
  return {
    type: EAction.EDIT_TODO,
    payload
  };
};

export const setTodos = (payload: Todo[]): IAction => {
  return {
    type: EAction.SET_TODOS,
    payload
  };
};

export const setStatus = (payload: string): IAction => {
  return {
    type: EAction.SET_STATUS,
    payload
  };
};

export const setIsLoading = (payload: boolean): IAction => {
  return {
    type: EAction.SET_IS_LOADING,
    payload
  }
}
