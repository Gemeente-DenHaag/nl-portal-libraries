import * as React from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {Link} from '@gemeente-denhaag/components-react';
import {FormattedMessage} from 'react-intl';
import {FC, useContext} from 'react';
import {LocaleContext} from '@gemeente-denhaag/nl-portal-localization';

interface OverviewPageProps {
  openFormsFormId: string;
}

const OverviewPage: FC<OverviewPageProps> = ({openFormsFormId}) => {
  const {hrefLang} = useContext(LocaleContext);

  return (
    <section>
      <Link component={RouterLink} to={`/formulier?id=${openFormsFormId}`} hrefLang={hrefLang}>
        <FormattedMessage id="overview.defaultFormTitle" />
      </Link>
    </section>
  );
};

export {OverviewPage};
