import * as React from 'react';
import {FC, ReactElement, useContext} from 'react';
import {MenuButton} from '@gemeente-denhaag/denhaag-component-library';
import {ChevronRightIcon, GridIcon} from '@gemeente-denhaag/icons';
import {LocaleContext} from '@nl-portal/localization';
import {PortalPage} from '../../interfaces';
import {MenuIcon} from '../../enums';
import styles from './menu-item.module.scss';

interface MenuItemProps {
  item: PortalPage;
}

const MenuItem: FC<MenuItemProps> = ({item}) => {
  const {hrefLang} = useContext(LocaleContext);
  let iconComponent: ReactElement;

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
      <MenuButton active={false} href={item.pathTranslationKey} hrefLang={hrefLang}>
        <div className={styles['menu-item__icon']}>{iconComponent}</div>
        {item.titleTranslationKey}
      </MenuButton>
    </div>
  );
};

export {MenuItem};
