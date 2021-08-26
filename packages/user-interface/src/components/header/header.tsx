import * as React from 'react';
import {FC} from 'react';
import styles from './header.module.scss';
import {LanguageSwitcher} from '../language-switcher';
import {Logout} from '../logout';
import {UserName} from '../user-name';

interface HeaderProps {
  logo: React.ReactNode;
  facet?: React.ReactNode;
}

const Header: FC<HeaderProps> = ({logo, facet}) => (
  <div className={styles.headerContainer}>
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <div className={styles.headerLogoContainer}>{logo}</div>
        <div className={styles.headerElementsContainer}>
          <UserName />
          <Logout />
          <LanguageSwitcher />
        </div>
      </div>
    </header>
    {facet && <div className={styles.headerFacetContainer}>{facet}</div>}
  </div>
);

export {Header};
