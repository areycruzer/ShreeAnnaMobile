import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import LottieView from 'lottie-react-native';
import { theme } from '../theme';
import { Typography } from './Typography';

interface SuccessAnimationProps {
    visible: boolean;
    message?: string;
    onFinish?: () => void;
}

export const SuccessAnimation = ({ visible, message = 'Success!', onFinish }: SuccessAnimationProps) => {
    const animation = useRef<LottieView>(null);

    useEffect(() => {
        if (visible) {
            animation.current?.play();
            // Auto hide after 2 seconds
            const timer = setTimeout(() => {
                if (onFinish) onFinish();
            }, 2000);
            return () => clearTimeout(timer);
        } else {
            animation.current?.reset();
        }
    }, [visible, onFinish]);

    if (!visible) return null;

    return (
        <Modal transparent visible={visible} animationType="fade">
            <View style={styles.container}>
                <View style={styles.card}>
                    <LottieView
                        ref={animation}
                        source={require('../assets/animations/success.json')}
                        style={styles.animation}
                        loop={false}
                    />
                    <Typography.Subtitle style={styles.message}>{message}</Typography.Subtitle>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        backgroundColor: theme.colors.background.paper,
        borderRadius: theme.spacing.radius.l,
        padding: theme.spacing.xl,
        alignItems: 'center',
        elevation: 5,
        minWidth: 200,
    },
    animation: {
        width: 100,
        height: 100,
    },
    message: {
        marginTop: theme.spacing.m,
        textAlign: 'center',
    },
});
