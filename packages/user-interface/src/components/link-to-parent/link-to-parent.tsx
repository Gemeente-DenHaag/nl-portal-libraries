import * as React from 'react';
import {FC, useContext} from 'react';
// import styles from './link-to-parent.module.scss';
import {Link} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';
import {LocaleContext} from '@nl-portal/localization';
import {Paragraph} from '@gemeente-denhaag/denhaag-component-library';
import styles from './link-to-parent.module.scss';
import {PortalPage} from '../../interfaces';

interface LinkToParentProps {
  parentPage: PortalPage;
}

const LinkToParent: FC<LinkToParentProps> = ({parentPage}) => {
  const {hrefLang} = useContext(LocaleContext);

  return (
    <div className={styles['link-to-parent']}>
      <Link to={parentPage.path} hrefLang={hrefLang}>
        <Paragraph>
          <FormattedMessage id={`pageTitles.${parentPage.titleTranslationKey}`} />
        </Paragraph>
      </Link>
    </div>
  );
};

export {LinkToParent};
