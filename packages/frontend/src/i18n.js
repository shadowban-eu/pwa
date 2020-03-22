/* eslint-disable no-console */
/* global i18nVersions */
import i18next from 'i18next';
import ChainedBackend from 'i18next-chained-backend';
import LocalStorageBackend from 'i18next-localstorage-backend';
import XHRBackend from 'i18next-xhr-backend';
import BrowserLanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

export default () => i18next
  .use(ChainedBackend)
  .use(BrowserLanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en-US',
    lng: 'en-US',
    debug: process.env.NODE_ENV === 'development',
    ns: ['common', 'tasks', 'functionality', 'techinfo'],
    defaultNS: 'common',
    backend: {
      backends: [LocalStorageBackend, XHRBackend],
      backendOptions: [
        {
          // LocalStorageBackend options
          versions: i18nVersions
        },
        {
          // XHRBackend options
          loadPath: '/i18n/{{lng}}/{{ns}}.json',
          crossDomain: false
        }
      ]
    }
  });
