import * as React from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {Link, Paragraph} from '@gemeente-denhaag/components-react';
import {FormattedMessage} from 'react-intl';
import {FC, useContext} from 'react';
import {LocaleContext} from '@gemeente-denhaag/nl-portal-localization';

interface OverviewPageProps {
  openFormsFormId?: string;
  showFormsLink?: string;
  showIntro?: string;
}

const OverviewPage: FC<OverviewPageProps> = ({
  openFormsFormId,
  showFormsLink = 'true',
  showIntro = 'false',
}) => {
  const {hrefLang} = useContext(LocaleContext);

  return (
    <section>
      {showIntro === 'true' && (
        <React.Fragment>
          <h2 className="utrecht-heading-2">
            <FormattedMessage id="overviewpage.title" />
          </h2>
          <Paragraph>
            <FormattedMessage id="overviewpage.paragraph" />
          </Paragraph>
        </React.Fragment>
      )}
      {showFormsLink === 'true' && (
        <Link component={RouterLink} to={`/formulier/${openFormsFormId}`} hrefLang={hrefLang}>
          <FormattedMessage id="overview.defaultFormTitle" />
        </Link>
      )}
    </section>
  );
};

export {OverviewPage};
