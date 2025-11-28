import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ScreenWrapper } from '../../components/ScreenWrapper';
import { Typography } from '../../components/Typography';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { useAuthStore } from '../../store/authStore';
import { useNavigation, useRoute } from '@react-navigation/native';
import { theme } from '../../theme';

export const OtpScreen = () => {
    const { t } = useTranslation();
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const verifyOtp = useAuthStore(state => state.verifyOtp);
    const navigation = useNavigation();
    const route = useRoute<any>();
    const { phone, requestId } = route.params;

    const handleVerify = async () => {
        if (otp.length !== 6) {
            Alert.alert(t('otpScreen.error'), t('otpScreen.invalidOtp'));
            return;
        }
        setLoading(true);
        try {
            await verifyOtp(requestId, otp);
            // Navigation handled by AppNavigator based on token state
        } catch (error) {
            Alert.alert(t('otpScreen.error'), t('otpScreen.invalidOtp'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScreenWrapper style={styles.container}>
            <View style={styles.content}>
                <Typography.Title style={styles.title}>{t('otpScreen.enterOtp')}</Typography.Title>
                <Typography.Body style={styles.instruction}>
                    {t('otpScreen.sentTo')} {phone}
                </Typography.Body>

                <Input
                    label={t('otpScreen.otpLabel')}
                    placeholder={t('otpScreen.otpPlaceholder')}
                    value={otp}
                    onChangeText={setOtp}
                    keyboardType="number-pad"
                    maxLength={6}
                    style={styles.input}
                />

                <Button
                    title={t('otpScreen.verify')}
                    onPress={handleVerify}
                    loading={loading}
                    style={styles.button}
                />
            </View>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: theme.spacing.layout.screenPadding,
        justifyContent: 'center',
        backgroundColor: theme.colors.background.default,
    },
    content: {
        backgroundColor: theme.colors.background.paper,
        padding: theme.spacing.l,
        borderRadius: theme.spacing.radius.l,
        elevation: 2,
    },
    title: {
        textAlign: 'center',
        marginBottom: theme.spacing.s,
    },
    instruction: {
        marginBottom: theme.spacing.l,
        textAlign: 'center',
    },
    input: {
        fontSize: 24, // Very large for OTP
        textAlign: 'center',
        letterSpacing: 8,
    },
    button: {
        marginTop: theme.spacing.m,
    }
});
