import React from 'react';
import { Text, StyleSheet, TextProps } from 'react-native';
import { theme } from '../theme';

interface TypographyProps extends TextProps {
    children: React.ReactNode;
    style?: any;
    color?: string;
    align?: 'left' | 'center' | 'right';
}

const BaseText = ({ style, color, align, ...props }: TypographyProps) => {
    const customStyle = {
        color: color || theme.colors.text.primary,
        textAlign: align || 'left',
    };
    return <Text style={[style, customStyle]} {...props} />;
};

export const Typography = {
    Title: (props: TypographyProps) => (
        <BaseText
            {...props}
            style={[styles.title, props.style]}
        />
    ),
    Subtitle: (props: TypographyProps) => (
        <BaseText
            {...props}
            style={[styles.subtitle, props.style]}
        />
    ),
    Body: (props: TypographyProps) => (
        <BaseText
            {...props}
            style={[styles.body, props.style]}
        />
    ),
    Caption: (props: TypographyProps) => (
        <BaseText
            {...props}
            style={[styles.caption, props.style]}
        />
    ),
    ButtonText: (props: TypographyProps) => (
        <BaseText
            {...props}
            style={[styles.buttonText, props.style]}
        />
    ),
};

const styles = StyleSheet.create({
    title: {
        fontSize: theme.typography.sizes.h1,
        fontWeight: theme.typography.weights.bold as any,
        marginBottom: theme.spacing.s,
        color: theme.colors.text.primary,
    },
    subtitle: {
        fontSize: theme.typography.sizes.h3,
        fontWeight: theme.typography.weights.medium as any,
        marginBottom: theme.spacing.xs,
        color: theme.colors.text.primary,
    },
    body: {
        fontSize: theme.typography.sizes.body,
        lineHeight: theme.typography.lineHeights.body,
        color: theme.colors.text.secondary,
    },
    caption: {
        fontSize: theme.typography.sizes.caption,
        color: theme.colors.text.muted,
    },
    buttonText: {
        fontSize: theme.typography.sizes.body,
        fontWeight: theme.typography.weights.medium as any,
        color: theme.colors.primary,
    },
});
