import * as React from 'react';
import {FC, useContext} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';
import {LocaleContext} from '@nl-portal/localization';
import {Link} from '@gemeente-denhaag/denhaag-component-library';
import {ChevronLeftIcon} from '@gemeente-denhaag/icons';
import Skeleton from 'react-loading-skeleton';
import styles from './link-to-parent.module.scss';
import {PortalPage} from '../../interfaces';

interface LinkToParentProps {
  parentPage?: PortalPage;
  routePath?: string;
  text?: string;
}

const LinkToParent: FC<LinkToParentProps> = ({parentPage, routePath, text}) => {
  const {hrefLang} = useContext(LocaleContext);

  return (
    <div className={styles['link-to-parent']}>
      <Link
        component={RouterLink}
        to={routePath || parentPage?.path || '/'}
        icon={<ChevronLeftIcon />}
        iconAlign="start"
        hrefLang={hrefLang}
      >
        {text ||
          (parentPage?.titleTranslationKey ? (
            <FormattedMessage id={`pageTitles.${parentPage?.titleTranslationKey}`} />
          ) : (
            <Skeleton width={100} />
          ))}
      </Link>
    </div>
  );
};

export {LinkToParent};
