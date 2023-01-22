import classNames from 'classnames/bind';
import styles from './Button.module.css';
import React from 'react';

const cx = classNames.bind(styles);

interface ButtonProps {
  variants?: 'primary' | 'danger'
  size?: 'medium' | 'large'
  rounded?: boolean
  text?: string
  icon?: string
  disabled?: boolean
  children?: JSX.Element
  onClick?: () => void
}

const Button = (props: ButtonProps): JSX.Element => {
  const { variants = 'primary', size = 'medium', rounded = false, text = '', children, ...propsInput } = props;

  const className = cx(
    'button',
    variants === 'primary' ? 'primary' : 'danger',
    size === 'medium' ? 'medium' : 'large',
    rounded ? 'rounded' : ''
  );
  return (
    <React.Fragment>
      <button className={className} {...propsInput}>{text}{children}</button>
    </React.Fragment>
  );
};

export default Button;
