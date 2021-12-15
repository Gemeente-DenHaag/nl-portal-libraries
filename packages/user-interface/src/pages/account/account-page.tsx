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
              value: !contactLoading && !contactError && contactData?.getBurgerProfiel?.emailadres,
              showEditButton: true,
              loading: contactLoading,
            },
            {
              headerTranslationKey: 'telefoonnummer',
              value:
                !contactLoading && !contactError && contactData?.getBurgerProfiel?.telefoonnummer,
              showEditButton: true,
              loading: contactLoading,
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
              showEditButton: true,
            },
            {
              headerTranslationKey: 'newsOnNeighborhood',
              showEditButton: true,
            },
            {
              headerTranslationKey: 'tips',
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
            },
            {
              headerTranslationKey: 'lastName',
            },
            {
              headerTranslationKey: 'gender',
            },
            {
              headerTranslationKey: 'citizenServiceNumber',
            },
            {
              headerTranslationKey: 'dateOfBirth',
            },
            {
              headerTranslationKey: 'countryOfBirth',
            },
            {
              headerTranslationKey: 'nationality',
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
            },
            {
              headerTranslationKey: 'postalCodeAndCity',
            },
          ]}
        />
      </div>
    </section>
  );
};
export {AccountPage};
