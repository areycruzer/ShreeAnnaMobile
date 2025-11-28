import React, { useState } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ScreenWrapper } from '../../components/ScreenWrapper';
import { Typography } from '../../components/Typography';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { useAuthStore } from '../../store/authStore';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { theme } from '../../theme';
import { logScreenView, logButtonClick, logLogin, logError } from '../../utils/eventLogger';

export const LoginScreen = () => {
    const { t } = useTranslation();
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const login = useAuthStore(state => state.login);
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const route = useRoute<any>();

    const { role = 'farmer', color = '#2F8F46', title = 'Farmer / FPO', icon = '🌾' } = route.params || {};

    // Log screen view
    React.useEffect(() => {
        logScreenView('LoginScreen');
    }, []);

    const handleLogin = async () => {
        if (phone.length < 10) {
            Alert.alert(t('login.error'), t('login.errorPhone'));
            return;
        }
        if (!password) {
            Alert.alert(t('login.error'), t('login.errorPassword'));
            return;
        }

        logButtonClick('LoginScreen', 'login_button', undefined, { phone });
        setLoading(true);
        try {
            // Pass the expected role to the login function
            const success = await login(phone, password, role);
            if (success) {
                logLogin(phone, 'password');
                console.log('✅ Login successful, navigating to Home');
            } else {
                logError('LoginScreen', 'login_failed', undefined, { phone });
                Alert.alert(t('login.loginFailed'), t('login.invalidCredentials'));
            }
        } catch (error) {
            logError('LoginScreen', 'login_error', undefined, { phone, error: String(error) });
            Alert.alert(t('login.error'), t('login.errorGeneric'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScreenWrapper style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    {/* Back Button */}
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.backButton}
                        activeOpacity={0.7}
                    >
                        <Typography.Body style={{ color: '#666' }}>← {t('login.back')}</Typography.Body>
                    </TouchableOpacity>

                    {/* Demo User Button - Development Only */}
                    <TouchableOpacity
                        onPress={() => {
                            // Select demo credentials based on current role
                            let demoPhone = '1234567890'; // Default Farmer
                            if (role === 'fpo') demoPhone = '1234567891';
                            if (role === 'shg') demoPhone = '1234567892';
                            if (role === 'buyer') demoPhone = '1234567893';
                            if (role === 'admin') demoPhone = '1234567894';

                            setPhone(demoPhone);
                            setPassword('demo1234');
                            logButtonClick('LoginScreen', 'demo_user_button', undefined, { role });
                        }}
                        style={styles.demoButton}
                        activeOpacity={0.7}
                    >
                        <Typography.Caption style={{ color: '#FFF', fontWeight: 'bold' }}>👤 {t('login.demo')}</Typography.Caption>
                    </TouchableOpacity>

                    {/* Header */}
                    <View style={styles.header}>
                        <View style={[styles.roleIcon, { backgroundColor: color }]}>
                            <Typography.Title style={{ fontSize: 40 }}>{icon}</Typography.Title>
                        </View>
                        <Typography.Title style={styles.title}>
                            {t('login.welcomeBack')}
                        </Typography.Title>
                        <Typography.Caption style={styles.subtitle}>
                            {t('login.loginAs')} {title}
                        </Typography.Caption>
                    </View>

                    {/* Form */}
                    <View style={styles.form}>
                        <Input
                            label={t('login.mobileLabel')}
                            placeholder={t('login.mobilePlaceholder')}
                            value={phone}
                            onChangeText={setPhone}
                            keyboardType="phone-pad"
                            maxLength={10}
                            returnKeyType="next"
                        />

                        <Input
                            label={t('login.passwordLabel')}
                            placeholder={t('login.passwordPlaceholder')}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            returnKeyType="done"
                            onSubmitEditing={handleLogin}
                        />

                        <TouchableOpacity style={styles.forgotPassword}>
                            <Typography.Caption style={{ color }}>
                                {t('login.forgotPassword')}
                            </Typography.Caption>
                        </TouchableOpacity>

                        <Button
                            title={t('login.loginButton')}
                            onPress={handleLogin}
                            loading={loading}
                            style={[styles.loginButton, { backgroundColor: color }]}
                        />

                        {/* Divider */}
                        <View style={styles.divider}>
                            <View style={styles.dividerLine} />
                            <Typography.Caption style={styles.dividerText}>
                                {t('login.or')}
                            </Typography.Caption>
                            <View style={styles.dividerLine} />
                        </View>

                        {/* Register Link */}
                        <TouchableOpacity
                            style={styles.registerContainer}
                            onPress={() => navigation.navigate('Register', { role, color, title, icon })}
                        >
                            <Typography.Body style={{ color: '#666' }}>
                                {t('login.noAccount')}{' '}
                            </Typography.Body>
                            <Typography.Body style={{ color, fontWeight: 'bold' }}>
                                {t('login.registerNow')}
                            </Typography.Body>
                        </TouchableOpacity>
                    </View>

                    {/* Help Text */}
                    <View style={styles.helpContainer}>
                        <Typography.Caption style={styles.helpText}>
                            💡 {t('login.newToApp')}
                        </Typography.Caption>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    scrollContent: {
        flexGrow: 1,
        padding: 24,
    },
    backButton: {
        marginBottom: 24,
        paddingVertical: 8,
    },
    demoButton: {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: '#2F8F46',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    roleIcon: {
        width: 100,
        height: 100,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1A1A1A',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
    },
    form: {
        marginBottom: 32,
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: 24,
        paddingVertical: 4,
    },
    loginButton: {
        marginBottom: 24,
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#E8E8E8',
    },
    dividerText: {
        marginHorizontal: 16,
        color: '#999',
    },
    registerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    helpContainer: {
        marginTop: 'auto',
        backgroundColor: '#F0F9F4',
        padding: 16,
        borderRadius: 12,
    },
    helpText: {
        color: '#2F8F46',
        lineHeight: 20,
        textAlign: 'center',
    }
});
