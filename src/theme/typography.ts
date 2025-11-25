import { Platform } from 'react-native';

export const typography = {
    fonts: {
        // Assuming system fonts for now, but Noto Sans would be configured here if custom fonts were loaded
        regular: Platform.select({ android: 'sans-serif', ios: 'System' }),
        medium: Platform.select({ android: 'sans-serif-medium', ios: 'System' }),
        bold: Platform.select({ android: 'sans-serif-bold', ios: 'System' }),
    },
    sizes: {
        h1: 24,
        h2: 20,
        h3: 18,
        body: 16,
        caption: 14,
        small: 12,
        tiny: 10,
    },
    lineHeights: {
        h1: 32,
        h2: 28,
        h3: 24,
        body: 24,
        caption: 20,
        small: 16,
    },
    weights: {
        regular: '400',
        medium: '500',
        bold: '700',
    }
};
