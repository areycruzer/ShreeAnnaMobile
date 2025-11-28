import React from 'react';
import { View, StyleSheet, Linking, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ScreenWrapper } from '../../components/ScreenWrapper';
import { Typography } from '../../components/Typography';
import { Button } from '../../components/Button';
import api from '../../services/api';

export const HelpScreen = () => {
    const { t } = useTranslation();

    const handleCallAgent = () => {
        Linking.openURL('tel:18001801551'); // Kisan Call Center
    };

    const handleRequestCallback = async () => {
        try {
            await api.post('/telephony/request-callback', { language: 'hi' });
            Alert.alert(t('helpScreen.callbackSuccessTitle'), t('helpScreen.callbackSuccessMsg'));
        } catch (error) {
            Alert.alert(t('helpScreen.callbackErrorTitle'), t('helpScreen.callbackErrorMsg'));
        }
    };

    return (
        <ScreenWrapper style={styles.container}>
            <Typography.Title>{t('home.help')}</Typography.Title>

            <View style={styles.content}>
                <Button
                    title={t('helpScreen.callAgent')}
                    onPress={handleCallAgent}
                    style={styles.button}
                />

                <Button
                    title={t('helpScreen.requestCallback')}
                    onPress={handleRequestCallback}
                    variant="secondary"
                    style={styles.button}
                />

                <Typography.Subtitle style={styles.faqTitle}>{t('helpScreen.faq')}</Typography.Subtitle>
                <Typography.Body>
                    {t('helpScreen.faq1')}
                </Typography.Body>
                <Typography.Body>
                    {t('helpScreen.faq2')}
                </Typography.Body>
            </View>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    content: {
        marginTop: 24,
    },
    button: {
        marginBottom: 16,
    },
    faqTitle: {
        marginTop: 24,
        marginBottom: 8,
    }
});
