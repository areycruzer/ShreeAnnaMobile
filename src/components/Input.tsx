import React from 'react';
import { TextInput, View, Text, StyleSheet, TextInputProps } from 'react-native';
import { theme } from '../theme';

interface InputProps extends TextInputProps {
    label?: string;
    error?: string;
}

export const Input = ({ label, error, style, ...props }: InputProps) => {
    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <TextInput
                style={[styles.input, error && styles.inputError, style]}
                placeholderTextColor={theme.colors.text.muted}
                {...props}
            />
            {error && <Text style={styles.error}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: theme.spacing.m,
        width: '100%',
    },
    label: {
        fontSize: theme.typography.sizes.caption,
        fontWeight: theme.typography.weights.medium as any,
        color: theme.colors.text.primary,
        marginBottom: theme.spacing.xs,
    },
    input: {
        minHeight: 56, // Large touch target for mobile
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: theme.spacing.radius.m,
        paddingHorizontal: theme.spacing.m,
        paddingVertical: theme.spacing.m,
        fontSize: theme.typography.sizes.body,
        backgroundColor: theme.colors.background.paper,
        color: theme.colors.text.primary,
        textAlignVertical: 'top', // For multiline inputs
    },
    inputError: {
        borderColor: theme.colors.danger,
    },
    error: {
        fontSize: theme.typography.sizes.small,
        color: theme.colors.danger,
        marginTop: theme.spacing.xs,
    },
});

