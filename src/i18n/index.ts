import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';
import en from './en.json';
import hi from './hi.json';

const LANGUAGE_KEY = '@shree_anna_language';

const resources = {
    en: { translation: en },
    hi: { translation: hi },
};

// Load saved language preference
const initI18n = async () => {
    let savedLanguage = 'en';
    try {
        const storedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
        if (storedLanguage) {
            savedLanguage = storedLanguage;
        }
    } catch (error) {
        console.log('Error loading language:', error);
    }

    i18n
        .use(initReactI18next)
        .init({
            resources,
            lng: savedLanguage,
            fallbackLng: 'en',
            interpolation: {
                escapeValue: false,
            },
            react: {
                useSuspense: false,
            },
        });

    // Save language whenever it changes
    i18n.on('languageChanged', async (lng) => {
        try {
            await AsyncStorage.setItem(LANGUAGE_KEY, lng);
        } catch (error) {
            console.log('Error saving language:', error);
        }
    });
};

initI18n();

export default i18n;
