import classNames from 'classnames/bind';
import React from 'react';
import styles from './TextField.module.css';

const cx = classNames.bind(styles);

interface TextFieldProps {
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const TextField = (props: TextFieldProps): JSX.Element => {
  const { ...propsInput } = props;

  return (
    <React.Fragment>
      <input className={cx('text-field')} type="text" {...propsInput} />
    </React.Fragment>
  );
};

export default TextField;
