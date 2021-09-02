import * as React from 'react';
import {FC, ReactElement} from 'react';
import {MenuButton} from '@gemeente-denhaag/denhaag-component-library';
import {ChevronRightIcon, GridIcon} from '@gemeente-denhaag/icons';
import {PortalPage} from '../../interfaces';
import {MenuIcon} from '../../enums';
import styles from './menu-item.module.scss';

interface MenuItemProps {
  item: PortalPage;
}

const MenuItem: FC<MenuItemProps> = ({item}) => {
  let iconComponent: ReactElement;
  const active = false;

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
      <MenuButton active={active} href={item.pathTranslationKey}>
        <div className={styles['menu-item__icon']}>{iconComponent}</div>
        {item.titleTranslationKey}
      </MenuButton>
    </div>
  );
};

export {MenuItem};
