import { instanceAxios } from '../../../../axios/instance';
import { Todo } from '../../models/interface';

export const getAllTodo = async (): Promise<Todo[]> => {
  const res = await instanceAxios.get('todo');
  return res.data;
};

export const addTodo = async (todo: Todo): Promise<Todo> => {
  const res = await instanceAxios.post('todo', todo);
  return res.data;
};

export const deleteTodo = async (id: number): Promise<Todo> => {
  const res = await instanceAxios.delete(`todo/${id}`);
  return res.data;
};

export const editTodo = async (id: number, todo: Todo): Promise<Todo> => {
  const res = await instanceAxios.put(`todo/${id}`, todo);
  return res.data;
};
