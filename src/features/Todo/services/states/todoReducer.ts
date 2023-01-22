import { EStatus } from '../../models/enum';
import { IAction, Todo, TodoState } from '../../models/interface';
import { EAction } from './constants';

export const initialValue: TodoState = {
  todos: [],
  status: EStatus.ALL,
  isLoading: false
};

const todoReducer = (state: TodoState, action: IAction): TodoState => {
  switch (action.type) {
    case EAction.SET_TODOS: {
      return {
        ...state,
        todos: action.payload as Todo[]
      };
    }

    case EAction.ADD_TODO: {
      return {
        ...state,
        todos: [...state.todos, action.payload as Todo]
      };
    }

    case EAction.SET_STATUS: {
      return {
        ...state,
        status: action.payload as string
      };
    }

    case EAction.DELETE_TODO: {
      const newTodos = state.todos.filter((item) => item.id !== action.payload);
      return {
        ...state,
        todos: [...newTodos]
      };
    }

    case EAction.EDIT_TODO: {
      const payload = action.payload as Todo;
      const newTodos = state.todos.map((item) => {
        if (item.id === payload.id) {
          return { ...payload };
        }
        return item;
      });
      return {
        ...state,
        todos: [...newTodos]
      };
    }
      
    case EAction.SET_IS_LOADING: {
      return {
        ...state,
        isLoading: action.payload as boolean
      }
    }
  }
  return state;
};

export default todoReducer;
