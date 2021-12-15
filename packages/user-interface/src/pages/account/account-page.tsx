import * as React from 'react';
import {Heading2, Heading3} from '@gemeente-denhaag/components-react';
import {FormattedMessage} from 'react-intl';
import {useGetBurgerProfielQuery} from '@gemeente-denhaag/nl-portal-api';
import {useEffect} from 'react';
import styles from './account-page.module.scss';
import {DetailList} from '../../components/detail-list';

const AccountPage = () => {
  const {
    data: contactData,
    loading: contactLoading,
    error: contactError,
    refetch: contactRefetch,
  } = useGetBurgerProfielQuery();
  const EMPTY_VALUE = '-';

  useEffect(() => {
    contactRefetch();
  }, []);

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
              headerTranslationKey: 'emailadres',
              value:
                contactLoading && !contactError
                  ? ''
                  : contactData?.getBurgerProfiel?.emailadres || EMPTY_VALUE,
              showEditButton: true,
            },
            {
              headerTranslationKey: 'telefoonnummer',
              value:
                contactLoading && !contactError
                  ? ''
                  : contactData?.getBurgerProfiel?.telefoonnummer || EMPTY_VALUE,
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
              value: EMPTY_VALUE,
              showEditButton: true,
            },
            {
              headerTranslationKey: 'newsOnNeighborhood',
              value: EMPTY_VALUE,
              showEditButton: true,
            },
            {
              headerTranslationKey: 'tips',
              value: EMPTY_VALUE,
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
              value: EMPTY_VALUE,
            },
            {
              headerTranslationKey: 'lastName',
              value: EMPTY_VALUE,
            },
            {
              headerTranslationKey: 'gender',
              value: EMPTY_VALUE,
            },
            {
              headerTranslationKey: 'citizenServiceNumber',
              value: EMPTY_VALUE,
            },
            {
              headerTranslationKey: 'dateOfBirth',
              value: EMPTY_VALUE,
            },
            {
              headerTranslationKey: 'countryOfBirth',
              value: EMPTY_VALUE,
            },
            {
              headerTranslationKey: 'nationality',
              value: EMPTY_VALUE,
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
              value: EMPTY_VALUE,
            },
            {
              headerTranslationKey: 'postalCodeAndCity',
              value: EMPTY_VALUE,
            },
          ]}
        />
      </div>
    </section>
  );
};
export {AccountPage};
