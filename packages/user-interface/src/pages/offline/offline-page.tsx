import * as React from 'react';
import {FormattedMessage, useIntl} from 'react-intl';
import {Paragraph} from '@gemeente-denhaag/denhaag-component-library';

const OfflinePage = () => {
  const intl = useIntl();

  return (
    <section>
      <Paragraph>
        <FormattedMessage
          id="offline.warning"
          values={{applicationName: intl.formatMessage({id: 'app.appName'})}}
        />
      </Paragraph>
    </section>
  );
};
export {OfflinePage};
