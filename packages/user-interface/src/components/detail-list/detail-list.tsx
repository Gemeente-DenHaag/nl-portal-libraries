import * as React from 'react';
import {FC, Fragment} from 'react';
import {FormattedMessage} from 'react-intl';

interface DetailListProps {
  details: Array<{headerTranslationKey: string; value: string; showEditButton?: boolean}>;
}

const DetailList: FC<DetailListProps> = ({details}) => (
  <Fragment>
    {details.map(detail => (
      <div>
        <FormattedMessage id={`account.detail.${detail.headerTranslationKey}`} />
      </div>
    ))}
  </Fragment>
);
export {DetailList};
