import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, ViewStyle } from 'react-native';
import { theme } from '../theme';
import { Typography } from './Typography';
import { Badge } from './Badge';

interface CardProps {
    title: string;
    subtitle?: string;
    meta?: string;
    image?: any; // Source object or URI
    status?: React.ReactNode;
    statusType?: 'default' | 'success' | 'warning' | 'danger' | 'info';
    onPress?: () => void;
    action?: React.ReactNode;
    style?: ViewStyle;
}

export const Card = ({
    title,
    subtitle,
    meta,
    image,
    status,
    statusType = 'default',
    onPress,
    action,
    style
}: CardProps) => {
    return (
        <TouchableOpacity
            style={[styles.card, style]}
            onPress={onPress}
            activeOpacity={onPress ? 0.7 : 1}
            disabled={!onPress}
        >
            <View style={styles.content}>
                {image && (
                    <Image source={image} style={styles.thumbnail} />
                )}

                <View style={styles.info}>
                    <View style={styles.headerRow}>
                        <Typography.Subtitle style={styles.title} numberOfLines={1}>{title}</Typography.Subtitle>
                        {typeof status === 'string' ? (
                            <Badge label={status} statusType={statusType} />
                        ) : (
                            status
                        )}
                    </View>

                    {subtitle && <Typography.Body style={styles.subtitle} numberOfLines={1}>{subtitle}</Typography.Body>}
                    {meta && <Typography.Caption style={styles.meta}>{meta}</Typography.Caption>}
                </View>

                {action && (
                    <View style={styles.action}>
                        {action}
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: theme.colors.background.paper,
        borderRadius: theme.spacing.radius.l,
        padding: theme.spacing.layout.cardPadding,
        marginBottom: theme.spacing.m,
        // Shadow
        shadowColor: theme.colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    thumbnail: {
        width: 80,
        height: 80,
        borderRadius: theme.spacing.radius.m,
        marginRight: theme.spacing.m,
        backgroundColor: theme.colors.background.default,
    },
    info: {
        flex: 1,
        justifyContent: 'center',
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    title: {
        marginBottom: 0,
        flex: 1,
        marginRight: 8,
    },
    subtitle: {
        fontSize: 14,
        marginBottom: 2,
    },
    meta: {
        marginTop: 2,
    },
    action: {
        marginLeft: 8,
        justifyContent: 'center',
    },
});
