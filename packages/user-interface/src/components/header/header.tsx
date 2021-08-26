import * as React from 'react';
import {FC} from 'react';
import styles from './header.module.scss';

interface HeaderProps {
  logo: React.ReactNode;
}

const Header: FC<HeaderProps> = ({logo}) => (
  <header className={styles.header}>
    <div className={styles.headerInner}>
      <div className={styles.headerLogoContainer}>{logo}</div>
    </div>
  </header>
);

export {Header};
