import * as React from 'react';
import {Heading2, List, ListItem, ListSubheader} from '@gemeente-denhaag/components-react';
import {DocumentIcon} from '@gemeente-denhaag/icons';
import {FormattedMessage, useIntl} from 'react-intl';
import {useGetFormsQuery} from '@gemeente-denhaag/nl-portal-api';
import {Fragment} from 'react';
import styles from './forms-page.module.scss';
import {ListItemSkeleton} from '../../components';

const FormsPage = () => {
  const intl = useIntl();
  const {data, loading} = useGetFormsQuery();

  return (
    <section className={styles.forms}>
      <header className={styles.forms__header}>
        <Heading2>
          <FormattedMessage id="pageTitles.forms" />
        </Heading2>
      </header>
      <div className={styles['forms__forms-list']}>
        <List
          subheader={
            <ListSubheader>{intl.formatMessage({id: 'forms.listSubHeader'})}</ListSubheader>
          }
        >
          {loading ? (
            <Fragment>
              <ListItemSkeleton icon={<DocumentIcon />} />
              <ListItemSkeleton icon={<DocumentIcon />} />
            </Fragment>
          ) : (
            data?.getFormList.map(form => (
              <ListItem primaryText={form.name} leftIcon={<DocumentIcon />} key={form.uuid} />
            ))
          )}
        </List>
      </div>
    </section>
  );
};
export {FormsPage};
