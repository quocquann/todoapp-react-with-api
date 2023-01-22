import React from 'react';
import classNames from 'classnames/bind';
import styles from './TodoItem.module.css';
import { Todo } from '../../models/interface';
import { TodoContext } from '../../contexts/TodoProvider';
import { deleteTodo, editTodo } from '../../services/api/apiRequest';
import { editTodo as editTodoAction, deleteTodo as deleteTodoAction, setIsLoading } from '../../services/states/actions';
import DatePicker from '../../../../components/DatePicker/DatePicker';
import TextField from '../../../../components/TextField/TextField';
import Button from '../../../../components/Button/Button';
import { ReactComponent as EditIcon } from '../../../../assets/images/edit-icon.svg';
import { ReactComponent as CancelIcon } from '../../../../assets/images/cancel-icon.svg';
import { ReactComponent as CheckIcon } from '../../../../assets/images/check-icon.svg';
import { ReactComponent as TrashIcon } from '../../../../assets/images/trash-icon.svg';
import { ETypeAlert, showAlert } from '../../../../services/alert';

const cx = classNames.bind(styles);

interface TodoItemProps {
  todo: Todo
}

const TodoItem = (props: TodoItemProps): JSX.Element => {
  const { todo } = props;

  const _isRemind = (): boolean => {
    const oneHour = 3600000;
    return new Date(todo.deadline).getTime() - Date.now() <= oneHour;
  };

  const [todoState, setTodoState] = React.useState<Todo>(todo);
  const [isEdit, setIsEdit] = React.useState<boolean>(false);
  const [isRemind, setIsRemind] = React.useState<boolean>(_isRemind());
  const { dispatch } = React.useContext(TodoContext);

  React.useEffect(() => {
    let timer: NodeJS.Timer;
    setIsRemind(_isRemind());
    if (!_isRemind()) {
      timer = setInterval(() => {
        setIsRemind(_isRemind());
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [todo.deadline]);

  const handleDeleteTodo = (): void => {
    dispatch(setIsLoading(true));
    deleteTodo(todo.id as number).then((todo: Todo) => {
      dispatch(deleteTodoAction(todo.id as number));
      showAlert('Delete todo successfully', ETypeAlert.SUCCESS);
    }).catch((err) => {
      showAlert(err, ETypeAlert.ERROR);
    })
      .finally(() => dispatch(setIsLoading(false)));
  };

  const handleToggleStateTodo = (): void => {
    const newTodo: Todo = {
      ...todo,
      isCompleted: !todo.isCompleted
    };
    dispatch(setIsLoading(true));
    editTodo(todo.id as number, newTodo).then((todos) => {
      dispatch(editTodoAction(todos));
    }).catch((err) => {
      showAlert(err, ETypeAlert.ERROR);
    })
      .finally(() => dispatch(setIsLoading(false)));
  };

  const handleToggleEdit = (): void => {
    setIsEdit((prev) => !prev);
    setTodoState(todo);
  };

  const handleChangeTodoName = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTodoState(prev => ({ ...prev, name: e.target.value }));
  };

  const handleChangeTodoDealine = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTodoState(prev => ({ ...prev, deadline: e.target.value }));
  };

  const handleEditTodo = (): void => {
    const newTodo = {
      ...todoState
    };
    if (newTodo.name !== '') {
      dispatch(setIsLoading(true));
      editTodo(todo.id as number, newTodo).then((todo: Todo) => {
        dispatch(editTodoAction(todo));
        showAlert('Update todo successfully', ETypeAlert.SUCCESS);
      }).catch((err) => {
        showAlert(err, ETypeAlert.ERROR);
      })
        .finally(() => dispatch(setIsLoading(false)));
    } else {
      handleDeleteTodo();
    }
    setIsEdit(false);
  };

  return (
    <div className={cx('todo-item')}>
      {!isEdit
        ? (
          <span className={cx('todo-name', {
            remind: isRemind,
            completed: todo.isCompleted
          })} onClick={handleToggleStateTodo}>
              {todo.name}
          </span>
          )
        : (
          <TextField value={todoState.name} onChange={handleChangeTodoName} />
          )}

      {!isEdit
        ? (
          <div className={cx('deadline')}>
            <p>{todo.deadline}</p>
          </div>
          )
        : (
          <DatePicker value={todoState.deadline} onChange={handleChangeTodoDealine} />
          )}
      <div className={cx('action')}>
        <div>
          {!isEdit
            ? (<Button
              size="medium"
              rounded
              onClick={handleToggleEdit}
            >
              <EditIcon width={20} height={20} fill='#fff'></EditIcon>
            </Button>)
            : (<Button
              size="medium"
              rounded
              onClick={handleEditTodo}
            >
              <CheckIcon width={20} height={20} fill='#fff'></CheckIcon>
            </Button>)}
        </div>
        <div>
          {!isEdit
            ? (<Button
              size="medium"
              rounded
              variants="danger"
              onClick={handleDeleteTodo}
            >
              <TrashIcon width={20} height={20} fill='#fff'></TrashIcon>
            </Button>)
            : <Button
              size="medium"
              rounded
              variants="danger"
              onClick={handleToggleEdit}
            >
              <CancelIcon width={20} height={20} fill='#fff'></CancelIcon>
            </Button>}
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
