import * as React from 'react';
import {Heading4, IconButton} from '@gemeente-denhaag/denhaag-component-library';
import {CloseIcon} from '@gemeente-denhaag/icons';
import {FormattedMessage} from 'react-intl';
import classNames from 'classnames';
import {useContext} from 'react';
import styles from './menu.module.scss';
import {LayoutContext} from '../../contexts';

const Menu = () => {
  const {menuOpened, hideMenu} = useContext(LayoutContext);

  return (
    <div className={classNames(styles.menu, {[styles['menu--hidden']]: !menuOpened})}>
      <div className={styles.menu__header}>
        <Heading4>
          <FormattedMessage id="app.appName" />
        </Heading4>
        <IconButton onClick={hideMenu}>
          <CloseIcon />
        </IconButton>
      </div>
    </div>
  );
};

export {Menu};
