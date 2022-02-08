import {PersoonGeboorteDatum, PersoonNationaliteiten} from '@gemeente-denhaag/nl-portal-api';
import {ReactElement} from 'react';
import * as React from 'react';
import {LocaleDate} from '../components';

const getNationalitiesString = (
  nationalities: Array<PersoonNationaliteiten> | undefined | null
): string => {
  if (Array.isArray(nationalities)) {
    return nationalities
      .map(nationality => nationality?.nationaliteit?.omschrijving)
      .filter(nationalityString => nationalityString)
      .reduce((accumulatedString, currentNationalityString) => {
        if (accumulatedString === '') {
          return currentNationalityString;
        }
        return `${accumulatedString}, ${currentNationalityString}`;
      }, '') as string;
  }

  return '';
};

const getStreetString = (
  street: string | null | undefined,
  number: string | null | undefined,
  letter: string | null | undefined,
  addition: string | null | undefined
): string => {
  if (street && number && letter && addition) {
    return `${street} ${number}${letter} ${addition}`;
  }
  if (street && number && letter) {
    return `${street} ${number}${letter}`;
  }
  if (street && number) {
    return `${street} ${number}`;
  }
  if (street) {
    return street;
  }

  return '';
};

const getPostalCodeCityString = (
  postalCode: string | null | undefined,
  city: string | null | undefined
): string => {
  if (city) {
    if (postalCode) {
      return `${postalCode} ${city}`;
    }

    return city;
  }

  return '';
};

const getLocaleDateOfBirth = (
  dateOfBirth: PersoonGeboorteDatum | null | undefined
): string | ReactElement => {
  if (dateOfBirth?.jaar && dateOfBirth?.maand && dateOfBirth?.dag) {
    return <LocaleDate date={new Date(dateOfBirth.jaar, dateOfBirth.maand - 1, dateOfBirth.dag)} />;
  }
  if (dateOfBirth?.jaar && dateOfBirth?.maand) {
    return <LocaleDate date={new Date(dateOfBirth.jaar, dateOfBirth.maand - 1)} />;
  }
  if (dateOfBirth?.jaar) {
    return <LocaleDate date={new Date(dateOfBirth.jaar)} />;
  }

  return '';
};

const getNameString = (
  firstNames: string | null | undefined,
  prefix: string | null | undefined,
  lastName: string | null | undefined,
  returnType: 'fullName' | 'firstNames' | 'lastName' = 'fullName'
): string => {
  const returnFullName = returnType === 'fullName';
  const returnLastName = returnType === 'lastName';
  const returnFirstName = returnType === 'firstNames';
  const fullNameWithPrefix = `${firstNames} ${prefix} ${lastName}`;
  const fullName = `${firstNames} ${lastName}`;
  const lastNameWithPrefix = `${prefix} ${lastName}`;

  if (returnFullName || returnLastName) {
    if (returnFullName && firstNames && prefix && lastName) {
      return fullNameWithPrefix;
    }
    if (returnFullName && firstNames && lastName) {
      return fullName;
    }
    if (prefix && lastName) {
      return lastNameWithPrefix;
    }
    if (lastName) {
      return lastName;
    }
  }

  if (returnFirstName && firstNames) {
    return firstNames;
  }

  return '';
};

export {
  getNationalitiesString,
  getStreetString,
  getPostalCodeCityString,
  getLocaleDateOfBirth,
  getNameString,
};
