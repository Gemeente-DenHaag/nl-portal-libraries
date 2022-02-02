import * as React from 'react';
import {Heading2, Heading3} from '@gemeente-denhaag/components-react';
import {FormattedMessage} from 'react-intl';
import {
  PersoonNationaliteiten,
  useGetBurgerProfielQuery,
  useGetPersoonDataQuery,
} from '@gemeente-denhaag/nl-portal-api';
import {useEffect} from 'react';
import styles from './account-page.module.scss';
import {DetailList} from '../../components/detail-list';

const AccountPage = () => {
  const {
    data: contactData,
    loading: contactLoading,
    refetch: contactRefetch,
  } = useGetBurgerProfielQuery();

  const {
    data: personData,
    loading: personLoading,
    refetch: personRefetch,
  } = useGetPersoonDataQuery();

  useEffect(() => {
    contactRefetch();
    personRefetch();
  }, []);

  const getNationalitiesString = (
    nationalities: Array<PersoonNationaliteiten> | undefined | null
  ): string => {
    if (Array.isArray(nationalities) && nationalities.length > 0) {
      return nationalities
        .map(nationality => nationality.nationaliteit.omschrijving)
        .reduce((accumulatedString, currentNationalityString) => {
          if (accumulatedString === '') {
            return currentNationalityString;
          }
          return `${accumulatedString}, ${currentNationalityString}`;
        }, '');
    }
    return '';
  };

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
              value: contactData?.getBurgerProfiel?.emailadres,
              showEditButton: true,
              loading: contactLoading,
            },
            {
              translationKey: 'telefoonnummer',
              value: contactData?.getBurgerProfiel?.telefoonnummer,
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
              value: personData?.getPersoon?.naam?.voornamen,
              loading: personLoading,
            },
            {
              translationKey: 'lastName',
              value: personData?.getPersoon?.naam?.geslachtsnaam,
              loading: personLoading,
            },
            {
              translationKey: 'gender',
              value: personData?.getPersoon?.geslachtsaanduiding,
              loading: personLoading,
            },
            {
              translationKey: 'citizenServiceNumber',
              value: personData?.getPersoon?.burgerservicenummer,
              loading: personLoading,
            },
            {
              translationKey: 'dateOfBirth',
            },
            {
              translationKey: 'countryOfBirth',
              value: personData?.getPersoon?.geboorte?.land?.omschrijving,
              loading: personLoading,
            },
            {
              translationKey: 'nationality',
              value: getNationalitiesString(personData?.getPersoon?.nationaliteiten),
              loading: personLoading,
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
