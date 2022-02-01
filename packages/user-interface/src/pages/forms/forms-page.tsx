import * as React from 'react';
import {Heading2, List, ListItem, ListSubheader} from '@gemeente-denhaag/components-react';
import {DocumentIcon} from '@gemeente-denhaag/icons';
import {FormattedMessage, useIntl} from 'react-intl';
import {useGetFormsQuery} from '@gemeente-denhaag/nl-portal-api';
import {Fragment, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import styles from './forms-page.module.scss';
import {ListItemSkeleton} from '../../components';

const FormsPage = () => {
  const intl = useIntl();
  const {data, loading, refetch} = useGetFormsQuery();
  const history = useHistory();

  const onClickFunction = (event: React.MouseEvent<HTMLButtonElement>, formId: string): void => {
    event.stopPropagation();
    event.preventDefault();
    history.push(`/formulier?id=${formId}`);
  };

  useEffect(() => {
    refetch();
  }, []);

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
              <button
                key={form.uuid}
                onClick={event => onClickFunction(event, form.uuid)}
                type="button"
                className={styles['forms__list-item-button']}
              >
                <ListItem primaryText={form.name} leftIcon={<DocumentIcon />} />
              </button>
            ))
          )}
        </List>
      </div>
    </section>
  );
};
export {FormsPage};
