import React from 'react';
import TodoItem from '../TodoItem/TodoItem';
import { TodoContext } from '../../contexts/TodoProvider';
import { getAllTodo } from '../../services/api/apiRequest';
import { setIsLoading, setTodos } from '../../services/states/actions';
import { Todo } from '../../models/interface';
import { EStatus } from '../../models/enum';
import Loader from '../../../../components/Loader/Loader';
import styles from './TodoList.module.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const TodoList = (): JSX.Element => {
  const { todoState, dispatch } = React.useContext(TodoContext);

  React.useEffect(() => {
    dispatch(setIsLoading(true));
    getAllTodo()
      .then((todos: Todo[]) => dispatch(setTodos(todos)))
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        dispatch(setIsLoading(false));
      });
  }, [dispatch]);

  const displayTodo = React.useMemo(() => {
    switch (todoState.status) {
      case EStatus.ACTIVE:
        return todoState.todos.filter((todo) => !todo.isCompleted);
      case EStatus.COMPLETED:
        return todoState.todos.filter((todo) => todo.isCompleted);
      default:
        return todoState.todos;
    }
  }, [todoState.status, JSON.stringify(todoState.todos)]);

  return (
    <div className={cx('wrapper')}>
      <div >
        {displayTodo.length > 0
          ? displayTodo.map((item) => {
            return <TodoItem key={item.id} todo={item} />;
          })
          : (<span className={cx('empty')}>Nothing to do</span>)}
      </div>
      {todoState.isLoading && (<div className={cx('overlay')}><Loader /></div>)}
    </div>
  );
};

export default TodoList;
