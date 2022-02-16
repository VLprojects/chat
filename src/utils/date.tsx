import { differenceInDays, format, isThisYear, isToday, isYesterday, parseISO } from 'date-fns';
import React from 'react';
import { FormattedMessage } from 'react-intl';

export const formatDate = (date?: string | null, formatString: string = 'HH:mm') => {
  if (!date) return '';

  return format(parseISO(date), formatString);
};

export const checkDayInterval = (dateLeft: string, dateRight: string) =>
  differenceInDays(parseISO(dateLeft), parseISO(dateRight));

export const checkDateWhen = (date: string, when: 'today' | 'yesterday' | 'year') => {
  switch (when) {
    case 'today':
      return isToday(parseISO(date));
    case 'yesterday':
      return isYesterday(parseISO(date));
    case 'year':
      return isThisYear(parseISO(date));
    default:
      return false;
  }
};

export const getPreparedDate = (date?: string) => {
  if (!date) return null;

  if (checkDateWhen(date, 'today')) return formatDate(date, 'HH:mm');
  if (!checkDateWhen(date, 'year')) return formatDate(date, 'dd MMMM yyyy');
  if (checkDateWhen(date, 'yesterday')) return <FormattedMessage id="time.yesterday" />;

  const days = checkDayInterval(date, new Date().toISOString());
  if (days === -2) return <FormattedMessage id="time.dayBefore" />;
  if (days < -2) return formatDate(date, 'dd MMMM');

  return formatDate(date, 'HH:mm');
};
