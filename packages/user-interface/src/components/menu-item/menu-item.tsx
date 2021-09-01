import * as React from 'react';
import {FC, ReactElement} from 'react';
import {MenuButton} from '@gemeente-denhaag/denhaag-component-library';
import {ChevronRightIcon, GridIcon} from '@gemeente-denhaag/icons';
import {PortalPage} from '../../interfaces';
import {MenuIcon} from '../../enums';

interface MenuItemProps {
  item: PortalPage;
}

const MenuItem: FC<MenuItemProps> = ({item}) => {
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
    <div>
      {iconComponent}
      <MenuButton active href={item.pathTranslationKey}>
        {item.titleTranslationKey}
      </MenuButton>
    </div>
  );
};

export {MenuItem};
