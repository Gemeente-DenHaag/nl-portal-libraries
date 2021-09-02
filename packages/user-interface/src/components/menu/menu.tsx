import * as React from 'react';
import {Heading4, IconButton} from '@gemeente-denhaag/denhaag-component-library';
import {CloseIcon} from '@gemeente-denhaag/icons';
import {FormattedMessage} from 'react-intl';
import classNames from 'classnames';
import {FC, useContext} from 'react';
import styles from './menu.module.scss';
import {LayoutContext} from '../../contexts';
import {PortalPage} from '../../interfaces';
import {MenuItem} from '../menu-item';

interface MenuProps {
  items: Array<PortalPage>;
}

const Menu: FC<MenuProps> = ({items}) => {
  const {menuOpened, hideMenu} = useContext(LayoutContext);

  return (
    <div className={classNames(styles.menu, {[styles['menu--hidden']]: !menuOpened})}>
      <header className={styles.menu__header}>
        <Heading4>
          <FormattedMessage id="app.appName" />
        </Heading4>
        <IconButton onClick={hideMenu}>
          <CloseIcon />
        </IconButton>
      </header>
      <nav className={styles.menu__items}>
        {items.map(item => (
          <MenuItem key={item.pathTranslationKey} item={item} />
        ))}
      </nav>
    </div>
  );
};

export {Menu};
