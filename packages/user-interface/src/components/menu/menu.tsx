import * as React from 'react';
import {Heading4, IconButton} from '@gemeente-denhaag/denhaag-component-library';
import {CloseIcon} from '@gemeente-denhaag/icons';
import {FormattedMessage, useIntl} from 'react-intl';
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
  const intl = useIntl();

  return (
    <div className={classNames(styles.menu, {[styles['menu--hidden']]: !menuOpened})}>
      <header className={styles.menu__header}>
        <Heading4>
          <FormattedMessage id="app.appName" />
        </Heading4>
        {React.cloneElement(
          <IconButton onClick={hideMenu}>
            <CloseIcon />
          </IconButton>,
          {title: intl.formatMessage({id: 'menu.close'})}
        )}
      </header>
      <nav className={styles.menu__items}>
        {items
          .filter(item => item.showInMenu)
          .map(item => (
            <MenuItem key={item.path} item={item} />
          ))}
      </nav>
    </div>
  );
};

export {Menu};
