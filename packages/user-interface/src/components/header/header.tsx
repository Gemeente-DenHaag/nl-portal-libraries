import * as React from 'react';
import {FC, ReactElement} from 'react';
import {ShowAt} from 'react-hide-show-utils';
import styles from './header.module.scss';
import {LanguageSwitcher} from '../language-switcher';
import {Logout} from '../logout';
import {UserName} from '../user-name';
import {MenuButton} from '../menu-button';
import {constants} from '../../constants';

interface HeaderProps {
  logo: ReactElement;
  facet?: ReactElement;
}

const Header: FC<HeaderProps> = ({logo, facet}) => (
  <div className={styles['header-wrapper']}>
    <header className={styles.header}>
      <div className={styles.header__inner}>
        <div className={styles['header__logo-container']}>
          {React.cloneElement(logo, {className: styles['header__logo-image']})}
        </div>
        <div className={styles['header__elements-container']}>
          <ShowAt breakpoint={constants.BREAKPOINT_HEADER_MIN}>
            <div className={styles['header__element--large-spacing']}>
              <UserName />
            </div>
            <div className={styles['header__element--medium-spacing']}>
              <Logout />
            </div>
            <LanguageSwitcher />
          </ShowAt>
          <ShowAt breakpoint={constants.BREAKPOINT_HEADER_MAX}>
            <MenuButton />
          </ShowAt>
        </div>
      </div>
    </header>
    {facet && (
      <div className={styles['header__facet-container']}>
        {React.cloneElement(facet, {className: styles['header__facet-image']})}
      </div>
    )}
  </div>
);

export {Header};
