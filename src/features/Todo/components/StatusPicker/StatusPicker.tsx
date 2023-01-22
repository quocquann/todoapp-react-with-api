import React from 'react';
import classNames from 'classnames/bind';
import styles from './StatusPicker.module.css';
import { EStatus } from '../../models/enum';
import { TodoContext } from '../../contexts/TodoProvider';
import { setStatus } from '../../services/states/actions';

const cx = classNames.bind(styles);

const StatusPicker = (): JSX.Element => {
  const statuses = [EStatus.ALL, EStatus.ACTIVE, EStatus.COMPLETED];
  const { todoState, dispatch } = React.useContext(TodoContext);

  const handleChangeState = (state: string): void => {
    dispatch(setStatus(state));
  };

  return (
    <div className={cx('status-picker')}>
      {statuses.map((item) => (
        <div key={item} className={cx('status', { active: todoState.status === item })} onClick={() => handleChangeState(item)}>{item}</div>
      ))}
    </div>
  );
};

export default StatusPicker;
