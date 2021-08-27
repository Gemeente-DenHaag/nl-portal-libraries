import * as React from 'react';
import {FC} from 'react';
import {ShowAt} from 'react-hide-show-utils';
import styles from './header.module.scss';
import {LanguageSwitcher} from '../language-switcher';
import {Logout} from '../logout';
import {UserName} from '../user-name';
import {MenuButton} from '../menu-button';
import {constants} from '../../constants';

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
          <ShowAt breakpoint={constants.BREAKPOINT_HEADER_MIN}>
            <UserName />
            <Logout />
            <LanguageSwitcher />
          </ShowAt>
          <ShowAt breakpoint={constants.BREAKPOINT_HEADER_MAX}>
            <MenuButton />
          </ShowAt>
        </div>
      </div>
    </header>
    {facet && <div className={styles.headerFacetContainer}>{facet}</div>}
  </div>
);

export {Header};
