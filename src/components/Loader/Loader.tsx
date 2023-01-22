import React from 'react';
import classNames from 'classnames/bind';
import styles from './Loader.module.css';

const cx = classNames.bind(styles);

const Loader = (): JSX.Element => {
  return (
    <div className={cx('loader')}>

    </div>
  );
};

export default Loader;
