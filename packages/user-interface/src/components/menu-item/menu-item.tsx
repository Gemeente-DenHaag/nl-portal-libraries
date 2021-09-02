import * as React from 'react';
import {FC, ReactElement} from 'react';
import {MenuButton} from '@gemeente-denhaag/denhaag-component-library';
import {ChevronRightIcon, GridIcon} from '@gemeente-denhaag/icons';
import classNames from 'classnames';
import {PortalPage} from '../../interfaces';
import {MenuIcon} from '../../enums';
import styles from './menu-item.module.scss';

interface MenuItemProps {
  item: PortalPage;
}

const MenuItem: FC<MenuItemProps> = ({item}) => {
  let iconComponent: ReactElement;
  const active = true;

  switch (item.icon) {
    case MenuIcon.Overview:
      iconComponent = <GridIcon />;
      break;
    default:
      iconComponent = <ChevronRightIcon />;
      break;
  }

  return (
    <div className={styles['menu-item']}>
      <div
        className={classNames(styles['menu-item__icon'], {
          [styles['menu-item__icon--active']]: active,
        })}
      >
        {iconComponent}
      </div>
      <MenuButton active={active} href={item.pathTranslationKey}>
        {item.titleTranslationKey}
      </MenuButton>
    </div>
  );
};

export {MenuItem};
