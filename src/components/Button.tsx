import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle, StyleProp } from 'react-native';
import { theme } from '../theme';

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'ghost';
    loading?: boolean;
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
    textStyle?: TextStyle;
}

export const Button = ({
    title,
    onPress,
    variant = 'primary',
    loading = false,
    disabled = false,
    style,
    textStyle
}: ButtonProps) => {
    const getBackgroundColor = () => {
        if (disabled) return theme.colors.background.default;
        switch (variant) {
            case 'primary': return theme.colors.primary;
            case 'secondary': return 'transparent';
            case 'ghost': return 'transparent';
            default: return theme.colors.primary;
        }
    };

    const getTextColor = () => {
        if (disabled) return theme.colors.text.muted;
        switch (variant) {
            case 'primary': return theme.colors.text.inverse;
            case 'secondary': return theme.colors.primary;
            case 'ghost': return theme.colors.text.secondary;
            default: return theme.colors.text.inverse;
        }
    };

    const getBorderColor = () => {
        if (disabled) return 'transparent';
        if (variant === 'secondary') return theme.colors.primary;
        return 'transparent';
    };

    return (
        <TouchableOpacity
            style={[
                styles.button,
                {
                    backgroundColor: getBackgroundColor(),
                    borderColor: getBorderColor(),
                    borderWidth: variant === 'secondary' ? 1 : 0,
                },
                style
            ]}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.7}
        >
            {loading ? (
                <ActivityIndicator color={getTextColor()} />
            ) : (
                <Text style={[styles.text, { color: getTextColor() }, textStyle]}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: theme.spacing.radius.m,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 48, // Touch target
    },
    text: {
        fontSize: theme.typography.sizes.body,
        fontWeight: theme.typography.weights.medium as any,
    },
});
