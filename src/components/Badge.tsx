import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../theme';

interface BadgeProps {
    label: string;
    statusType?: 'default' | 'success' | 'warning' | 'danger' | 'info';
    size?: 'small' | 'medium';
}

export const Badge = ({ label, statusType = 'default', size = 'small' }: BadgeProps) => {
    const getColors = () => {
        switch (statusType) {
            case 'success': return { bg: theme.colors.primaryLight, text: theme.colors.primaryDark };
            case 'warning': return { bg: '#FFF8E1', text: theme.colors.warning }; // Light yellow
            case 'danger': return { bg: '#FEEBE5', text: theme.colors.danger };
            case 'info': return { bg: '#E3F2FD', text: theme.colors.info };
            default: return { bg: theme.colors.background.default, text: theme.colors.text.secondary };
        }
    };

    const colors = getColors();

    return (
        <View style={[styles.container, { backgroundColor: colors.bg, paddingVertical: size === 'small' ? 2 : 4, paddingHorizontal: size === 'small' ? 8 : 12 }]}>
            <Text style={[styles.text, { color: colors.text, fontSize: size === 'small' ? 10 : 12 }]}>
                {label?.toUpperCase() || ''}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: theme.spacing.radius.round,
        alignSelf: 'flex-start',
    },
    text: {
        fontWeight: '700',
        letterSpacing: 0.5,
    },
});
