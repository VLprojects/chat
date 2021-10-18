import { createIntl, createIntlCache } from 'react-intl';
import LOCALE_DATA from '../locales';

const cache = createIntlCache();
let lang = 'en';
if (window?.navigator?.language) {
  lang = navigator.language.slice(0, 2);
}

const intl = createIntl(
  {
    locale: lang,
    messages: lang === 'ru' ? LOCALE_DATA.ru : LOCALE_DATA.en,
  },
  cache,
);

export default intl;
