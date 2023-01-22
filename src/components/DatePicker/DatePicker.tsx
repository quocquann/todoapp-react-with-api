import classNames from 'classnames/bind';
import React from 'react';
import styles from './DatePicker.module.css';

const cx = classNames.bind(styles);

interface DatePickerProps {
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const DatePicker = (props: DatePickerProps): JSX.Element => {
  const { ...propsInput } = props;
  return (
    <React.Fragment>
      <input
        className={cx('date-picker')}
        type="datetime-local"
        {...propsInput}
      />
    </React.Fragment>
  );
};

export default DatePicker;
