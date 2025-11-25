import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Typography } from '../../components/Typography';
import { Button } from '../../components/Button';
import { ScreenWrapper } from '../../components/ScreenWrapper';

export const RegistrationSuccessScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const route = useRoute<any>();
    const { role, mobile } = route.params || {};

    return (
        <ScreenWrapper style={styles.container}>
            <View style={styles.content}>
                <View style={styles.iconContainer}>
                    <Typography.Title style={styles.successIcon}>✅</Typography.Title>
                </View>

                <Typography.Title style={styles.title}>
                    Registration Successful!
                </Typography.Title>

                <Typography.Body style={styles.description}>
                    Your account has been created successfully. You can now login with your mobile number {mobile}.
                </Typography.Body>

                <View style={styles.infoBox}>
                    <Typography.Caption style={styles.infoText}>
                        📧 A verification link has been sent to your mobile number. Please verify your account to access all features.
                    </Typography.Caption>
                </View>

                <Button
                    title="Go to Login"
                    onPress={() => navigation.navigate('Login', { role })}
                    style={styles.button}
                />

                <Button
                    title="Back to Home"
                    onPress={() => navigation.navigate('RoleSelection')}
                    variant="secondary"
                    style={styles.secondaryButton}
                />
            </View>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    content: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#F0F9F4',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 32,
    },
    successIcon: {
        fontSize: 60,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2F8F46',
        marginBottom: 16,
        textAlign: 'center',
    },
    description: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 24,
    },
    infoBox: {
        backgroundColor: '#FFF8E5',
        padding: 16,
        borderRadius: 12,
        borderLeftWidth: 4,
        borderLeftColor: '#F2A34A',
        marginBottom: 32,
        width: '100%',
    },
    infoText: {
        color: '#8B6914',
        lineHeight: 20,
    },
    button: {
        width: '100%',
        marginBottom: 12,
    },
    secondaryButton: {
        width: '100%',
    }
});
