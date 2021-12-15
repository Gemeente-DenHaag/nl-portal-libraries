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
              translationKey: 'emailadres',
              value: !contactLoading && !contactError && contactData?.getBurgerProfiel?.emailadres,
              showEditButton: true,
              loading: contactLoading,
              regex:
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            },
            {
              translationKey: 'telefoonnummer',
              value:
                !contactLoading && !contactError && contactData?.getBurgerProfiel?.telefoonnummer,
              showEditButton: true,
              loading: contactLoading,
              regex: /^\d{10}$/,
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
              translationKey: 'updatesOnCases',
            },
            {
              translationKey: 'newsOnNeighborhood',
            },
            {
              translationKey: 'tips',
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
              translationKey: 'firstNames',
            },
            {
              translationKey: 'lastName',
            },
            {
              translationKey: 'gender',
            },
            {
              translationKey: 'citizenServiceNumber',
            },
            {
              translationKey: 'dateOfBirth',
            },
            {
              translationKey: 'countryOfBirth',
            },
            {
              translationKey: 'nationality',
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
              translationKey: 'street',
            },
            {
              translationKey: 'postalCodeAndCity',
            },
          ]}
        />
      </div>
    </section>
  );
};
export {AccountPage};
