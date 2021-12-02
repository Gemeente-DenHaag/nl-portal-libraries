import * as React from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {Link} from '@gemeente-denhaag/components-react';
import {FormattedMessage} from 'react-intl';
import {useContext} from 'react';
import {LocaleContext} from '@gemeente-denhaag/nl-portal-localization';

const OverviewPage = () => {
  const {hrefLang} = useContext(LocaleContext);

  return (
    <section>
      <Link component={RouterLink} to="/formulier" hrefLang={hrefLang}>
        <FormattedMessage id="overview.lodgeObjection" />
      </Link>
    </section>
  );
};

export {OverviewPage};
