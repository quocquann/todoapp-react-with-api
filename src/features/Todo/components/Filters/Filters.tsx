import React from 'react';
import classNames from 'classnames/bind';
import styles from './Filter.module.css';
import StatusPicker from '../StatusPicker/StatusPicker';
import { TodoContext } from '../../contexts/TodoProvider';
import { EStatus } from '../../models/enum';

const cx = classNames.bind(styles);

const Filter = (): JSX.Element => {
  const { todoState } = React.useContext(TodoContext);

  const couter = React.useMemo(() => {
    switch (todoState.status) {
      case EStatus.ACTIVE:
        return todoState.todos.reduce((count, todo) => {
          if (!todo.isCompleted) {
            count++;
          }
          return count;
        }, 0);
      case EStatus.COMPLETED:
        return todoState.todos.reduce((count, todo) => {
          if (todo.isCompleted) {
            count++;
          }
          return count;
        }, 0);
      default:
        return todoState.todos.length;
    }
  }, [todoState.status, JSON.stringify(todoState.todos)]);

  return (
    <div className={cx('filter')}>
      <p>{couter} item/ {todoState.todos.length} items</p>
      <div>
        <StatusPicker />
      </div>
    </div>
  );
};

export default Filter;
