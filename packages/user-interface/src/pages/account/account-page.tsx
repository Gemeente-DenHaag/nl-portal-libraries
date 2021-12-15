import * as React from 'react';
import {Heading2, Heading3} from '@gemeente-denhaag/components-react';
import {FormattedMessage} from 'react-intl';
import {useGetBurgerProfielQuery} from '@gemeente-denhaag/nl-portal-api';
import {useEffect} from 'react';
import styles from './account-page.module.scss';
import {DetailList} from '../../components/detail-list';

const AccountPage = () => {
  const {data, loading, error, refetch} = useGetBurgerProfielQuery();

  useEffect(() => {
    refetch();
  }, []);

  console.log(data, loading, error);

  return (
    <section className={styles.account}>
      <header className={styles.account__header}>
        <Heading2>
          <FormattedMessage id="pageTitles.account" />
        </Heading2>
      </header>
      <div className={styles['account__sub-section']}>
        <Heading3 className={styles['account__sub-header']}>
          <FormattedMessage id="account.contactHeader" />
        </Heading3>
        <DetailList
          details={[
            {
              headerTranslationKey: 'email',
              value: '-',
              showEditButton: true,
            },
            {
              headerTranslationKey: 'phone',
              value: '-',
              showEditButton: true,
            },
          ]}
        />
      </div>
      <div className={styles['account__sub-section']}>
        <Heading3 className={styles['account__sub-header']}>
          <FormattedMessage id="account.notificationsHeader" />
        </Heading3>
        <DetailList
          details={[
            {
              headerTranslationKey: 'updatesOnCases',
              value: '-',
              showEditButton: true,
            },
            {
              headerTranslationKey: 'newsOnNeighborhood',
              value: '-',
              showEditButton: true,
            },
            {
              headerTranslationKey: 'tips',
              value: '-',
              showEditButton: true,
            },
          ]}
        />
      </div>
      <div className={styles['account__sub-section']}>
        <Heading3 className={styles['account__sub-header']}>
          <FormattedMessage id="account.detailsHeader" />
        </Heading3>
        <DetailList
          details={[
            {
              headerTranslationKey: 'firstNames',
              value: '-',
            },
            {
              headerTranslationKey: 'lastName',
              value: '-',
            },
            {
              headerTranslationKey: 'gender',
              value: '-',
            },
            {
              headerTranslationKey: 'citizenServiceNumber',
              value: '-',
            },
            {
              headerTranslationKey: 'dateOfBirth',
              value: '-',
            },
            {
              headerTranslationKey: 'countryOfBirth',
              value: '-',
            },
            {
              headerTranslationKey: 'nationality',
              value: '-',
            },
          ]}
        />
      </div>
      <div className={styles['account__sub-section']}>
        <Heading3 className={styles['account__sub-header']}>
          <FormattedMessage id="account.addressHeader" />
        </Heading3>
        <DetailList
          details={[
            {
              headerTranslationKey: 'street',
              value: '-',
            },
            {
              headerTranslationKey: 'postalCodeAndCity',
              value: '-',
            },
          ]}
        />
      </div>
    </section>
  );
};
export {AccountPage};
