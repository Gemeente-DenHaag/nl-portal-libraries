import * as React from 'react';
import {FC} from 'react';
import {FormattedMessage} from 'react-intl';
import {Paragraph} from '@gemeente-denhaag/denhaag-component-library';
import styles from './header.module.scss';
import {LanguageSwitcher} from '../language-switcher';
import {Logout} from '../logout';

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
          <Paragraph>
            <FormattedMessage id="app.testMessage" />
          </Paragraph>
          <Logout />
          <LanguageSwitcher />
        </div>
      </div>
    </header>
    {facet && <div className={styles.headerFacetContainer}>{facet}</div>}
  </div>
);

export {Header};
