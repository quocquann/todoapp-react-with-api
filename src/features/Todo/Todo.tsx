import React from 'react';
import Header from './components/Header/Header';
import TodoList from './components/TodoList/TodoList';
import Filter from './components/Filters/Filters';
import classNames from 'classnames/bind';
import styles from './Todo.module.css';
import TodoProvider from './contexts/TodoProvider';

const cx = classNames.bind(styles);

export const Todo = (): JSX.Element => {
  return (
    <TodoProvider>
        <div className={cx('wrapper')}>
          <Header />
          <TodoList />
          <Filter />
        </div>
    </TodoProvider>
  );
};
