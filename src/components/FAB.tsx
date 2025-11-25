import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated, Text } from 'react-native';
import { theme } from '../theme';

interface Action {
    icon: string; // Just a label for now, would be an Icon component
    label: string;
    onPress: () => void;
}

interface FABProps {
    onPress: () => void;
    actions?: Action[];
}

export const FAB = ({ onPress, actions }: FABProps) => {
    const [expanded, setExpanded] = useState(false);

    // Simple implementation for now, animation would go here
    const handlePress = () => {
        if (actions) {
            setExpanded(!expanded);
        } else {
            onPress();
        }
    };

    return (
        <View style={styles.container}>
            {expanded && actions && (
                <View style={styles.actions}>
                    {actions.map((action, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.actionItem}
                            onPress={() => {
                                action.onPress();
                                setExpanded(false);
                            }}
                        >
                            <View style={styles.actionLabel}>
                                <Text style={styles.actionLabelText}>{action.label}</Text>
                            </View>
                            <View style={styles.miniFab}>
                                <Text style={styles.miniFabIcon}>+</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            )}

            <TouchableOpacity
                style={[styles.fab, expanded && styles.fabExpanded]}
                onPress={handlePress}
                activeOpacity={0.8}
            >
                <Text style={styles.icon}>{expanded ? '×' : '+'}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 24,
        right: 24,
        alignItems: 'flex-end',
    },
    fab: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: theme.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 6,
        shadowColor: theme.colors.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    fabExpanded: {
        backgroundColor: theme.colors.text.secondary,
    },
    icon: {
        fontSize: 32,
        color: '#FFF',
        marginTop: -2,
    },
    actions: {
        marginBottom: 16,
        alignItems: 'flex-end',
    },
    actionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    miniFab: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: theme.colors.accent,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        marginLeft: 12,
    },
    miniFabIcon: {
        color: '#FFF',
        fontSize: 24,
    },
    actionLabel: {
        backgroundColor: '#FFF',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
        elevation: 2,
    },
    actionLabelText: {
        fontSize: 14,
        fontWeight: '600',
        color: theme.colors.text.primary,
    },
});
