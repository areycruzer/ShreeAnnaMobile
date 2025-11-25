import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ScreenWrapper } from '../../components/ScreenWrapper';
import { Typography } from '../../components/Typography';
import { Button } from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export const LanguageSelectionScreen = () => {
    const { t, i18n } = useTranslation();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const selectLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
        navigation.navigate('Login');
    };

    return (
        <ScreenWrapper style={styles.container}>
            <View style={styles.content}>
                <View style={styles.iconContainer}>
                    <Typography.Title style={{ fontSize: 40 }}>🌐</Typography.Title>
                </View>
                <Typography.Title style={styles.title}>{t('welcome')}</Typography.Title>
                <Typography.Subtitle style={styles.subtitle}>{t('selectLanguage')}</Typography.Subtitle>

                <View style={styles.buttonContainer}>
                    <Button
                        title="English"
                        onPress={() => selectLanguage('en')}
                        variant="secondary"
                        style={styles.button}
                    />
                    <Button
                        title="हिंदी"
                        onPress={() => selectLanguage('hi')}
                        variant="secondary"
                        style={styles.button}
                    />
                </View>
            </View>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        padding: 24,
        backgroundColor: '#FFF',
    },
    content: {
        alignItems: 'center',
    },
    iconContainer: {
        width: 80,
        height: 80,
        backgroundColor: '#E8F5E9',
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    title: {
        fontSize: 28,
        marginBottom: 8,
        color: '#2F8F46',
        textAlign: 'center',
    },
    subtitle: {
        marginBottom: 40,
        textAlign: 'center',
        color: '#666',
    },
    buttonContainer: {
        width: '100%',
        gap: 16,
    },
    button: {
        width: '100%',
        height: 56,
    }
});
