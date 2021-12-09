import * as React from 'react';
import {FC, Fragment, useContext} from 'react';
import {LocaleContext} from '@gemeente-denhaag/nl-portal-localization';

interface LocaleDateProps {
  date: Date | string;
  year?: Intl.DateTimeFormatOptions['year'];
  month?: Intl.DateTimeFormatOptions['month'];
  day?: Intl.DateTimeFormatOptions['day'];
}

const LocaleDate: FC<LocaleDateProps> = ({date, year, month, day}) => {
  const {currentLocale} = useContext(LocaleContext);
  const dateObject: Date = typeof date === 'string' ? new Date(date) : date;
  const options: Intl.DateTimeFormatOptions = {
    year: year || 'numeric',
    month: month || 'long',
    day: day || 'numeric',
  };

  return <Fragment>{dateObject.toLocaleDateString(currentLocale, options)}</Fragment>;
};

export {LocaleDate};
