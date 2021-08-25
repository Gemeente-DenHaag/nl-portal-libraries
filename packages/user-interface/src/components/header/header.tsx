import * as React from 'react';
import {FC} from 'react';
import styles from './header.module.scss';

const Header: FC = () => (
  <header className={styles.header}>
    <div className={styles.headerInner} />
  </header>
);

export {Header};
