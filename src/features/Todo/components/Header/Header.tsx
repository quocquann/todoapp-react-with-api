import React from 'react';
import classNames from 'classnames/bind';
import styles from './Header.module.css';
import { TodoContext } from '../../contexts/TodoProvider';
import { addTodo as addTodoAction, setIsLoading } from '../../services/states/actions';
import { addTodo } from '../../services/api/apiRequest';
import { Todo } from '../../models/interface';
import TextField from '../../../../components/TextField/TextField';
import DatePicker from '../../../../components/DatePicker/DatePicker';
import Button from '../../../../components/Button/Button';
import { showAlert, ETypeAlert } from '../../../../services/alert';

const cx = classNames.bind(styles);

const Header = (): JSX.Element => {
  const { dispatch } = React.useContext(TodoContext);

  const [todoName, setTodoName] = React.useState<string>('');
  const [dealine, setDealine] = React.useState<string>('');
  const [isValid, setIsValid] = React.useState<boolean>(false);

  React.useMemo(() => {
    setIsValid(todoName !== '' && dealine !== '');
  }, [todoName, dealine]);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTodoName(e.target.value);
  };

  const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setDealine(e.target.value);
  };

  const handleSubmitForm = (): void => {
    const todo: Todo = {
      name: todoName,
      deadline: dealine,
      isCompleted: false
    };
    dispatch(setIsLoading(true));
    addTodo(todo)
      .then((todo: Todo) => {
        dispatch(addTodoAction(todo));
        showAlert('Add todo successfully', ETypeAlert.SUCCESS);
      })
      .catch((err) => {
        showAlert(err, ETypeAlert.ERROR);
      })
      .finally(() => dispatch(setIsLoading(false)));
    setTodoName('');
    setDealine('');
  };

  return (
    <div className={cx('header')}>
      <h1 className={cx('title')}>Todo List</h1>
      <div>
        <div className={cx('text-field')}>
          <TextField placeholder="Enter Todo" value={todoName} onChange={ handleChangeInput } />
        </div>
        <div className={cx('date-picker')}>
          <DatePicker value={dealine} onChange={ handleChangeDate } />
        </div>
        <div>
          <Button size="large" text="ADD" onClick={handleSubmitForm} disabled={ !isValid } />
        </div>
      </div>
    </div>
  );
};
export default Header;
