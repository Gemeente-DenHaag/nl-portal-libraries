import * as React from 'react';
import {FC, useContext} from 'react';
// import styles from './link-to-parent.module.scss';
import {Link} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';
import {LocaleContext} from '@nl-portal/localization';
// import styles from '../menu-item/menu-item.module.scss';
import {Paragraph} from '@gemeente-denhaag/denhaag-component-library';
import {PortalPage} from '../../interfaces';

interface LinkToParentProps {
  parentPage: PortalPage;
}

const LinkToParent: FC<LinkToParentProps> = ({parentPage}) => {
  const {hrefLang} = useContext(LocaleContext);

  return (
    <Link to={parentPage.path} hrefLang={hrefLang}>
      <Paragraph>
        <FormattedMessage id={`pageTitles.${parentPage.titleTranslationKey}`} />
      </Paragraph>
    </Link>
  );
};

export {LinkToParent};
