import * as React from 'react';
import {FC, ReactElement, useContext} from 'react';
import {ArchiveIcon, ChevronRightIcon, GridIcon} from '@gemeente-denhaag/icons';
import {LocaleContext} from '@nl-portal/localization';
import {Link, useLocation} from 'react-router-dom';
import classNames from 'classnames';
import {FormattedMessage} from 'react-intl';
import {PortalPage} from '../../interfaces';
import {MenuIcon} from '../../enums';
import styles from './menu-item.module.scss';
import {LayoutContext} from '../../contexts';

interface MenuItemProps {
  item: PortalPage;
}

const MenuItem: FC<MenuItemProps> = ({item}) => {
  const {hrefLang} = useContext(LocaleContext);
  const {hideMenu} = useContext(LayoutContext);
  const location = useLocation();
  let iconComponent: ReactElement;

  switch (item.icon) {
    case MenuIcon.Overview:
      iconComponent = <GridIcon />;
      break;
    case MenuIcon.Cases:
      iconComponent = <ArchiveIcon />;
      break;
    default:
      iconComponent = <ChevronRightIcon />;
      break;
  }

  return (
    <Link
      title={item.titleTranslationKey}
      to={item.path}
      onClick={hideMenu}
      hrefLang={hrefLang}
      className={classNames('denhaag-menu-button', styles['denhaag-menu-button--flex'], {
        'denhaag-menu-button--active': location.pathname === item.path,
      })}
    >
      <div className={styles['denhaag-menu-button__icon']}>{iconComponent}</div>
      <FormattedMessage id={`pageTitles.${item.titleTranslationKey}`} />
    </Link>
  );
};

export {MenuItem};
