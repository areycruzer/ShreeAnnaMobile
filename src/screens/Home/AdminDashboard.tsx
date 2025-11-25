import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Typography } from '../../components/Typography';
import { useAuthStore } from '../../store/authStore';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const StatCard = ({ title, value, icon, color, subtitle }: any) => (
    <View style={styles.statCard}>
        <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
            <Ionicons name={icon} size={24} color={color} />
        </View>
        <View style={styles.statContent}>
            <Typography.Caption style={styles.statTitle}>{title}</Typography.Caption>
            <Typography.Title style={[styles.statValue, { color }]}>{value}</Typography.Title>
            {subtitle && <Typography.Caption style={styles.statSubtitle}>{subtitle}</Typography.Caption>}
        </View>
    </View>
);

const ActionRow = ({ title, icon, onPress }: any) => (
    <TouchableOpacity style={styles.actionRow} onPress={onPress}>
        <View style={styles.actionLeft}>
            <View style={styles.actionIcon}>
                <Ionicons name={icon} size={20} color="#666" />
            </View>
            <Typography.Body style={styles.actionText}>{title}</Typography.Body>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#CCC" />
    </TouchableOpacity>
);

export const AdminDashboard = () => {
    const user = useAuthStore(state => state.user);
    const navigation = useNavigation<any>();

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={styles.header}>
                <View>
                    <Typography.Title style={styles.welcomeText}>Government Portal</Typography.Title>
                    <Typography.Caption style={styles.subText}>Monitor & Manage Platform</Typography.Caption>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                    <View style={styles.avatar}>
                        <Typography.Title style={{ color: '#FFF' }}>
                            {user?.name?.charAt(0).toUpperCase() || 'A'}
                        </Typography.Title>
                    </View>
                </TouchableOpacity>
            </View>

            {/* Platform Overview */}
            <Typography.Subtitle style={styles.sectionTitle}>Platform Overview</Typography.Subtitle>
            <View style={styles.statsGrid}>
                <StatCard title="Total Farmers" value="1,245" icon="people" color="#2F8F46" subtitle="+12 this week" />
                <StatCard title="Active FPOs" value="48" icon="business" color="#F2A34A" subtitle="Across 5 districts" />
                <StatCard title="Total Volume" value="850 MT" icon="cube" color="#2F80ED" subtitle="Millet produce" />
                <StatCard title="Market Price" value="₹2,450" icon="trending-up" color="#9C27B0" subtitle="Avg per quintal" />
            </View>

            {/* Quick Actions */}
            <Typography.Subtitle style={styles.sectionTitle}>Management</Typography.Subtitle>
            <View style={styles.actionsContainer}>
                <ActionRow title="Verify Farmer Registrations" icon="checkmark-circle-outline" />
                <ActionRow title="Approve FPO Licenses" icon="document-text-outline" />
                <ActionRow title="Market Price Updates" icon="pricetag-outline" />
                <ActionRow title="Scheme Beneficiaries" icon="people-outline" />
                <ActionRow title="Grievance Redressal" icon="chatbubble-ellipses-outline" />
            </View>

            {/* Recent Alerts */}
            <Typography.Subtitle style={styles.sectionTitle}>System Alerts</Typography.Subtitle>
            <View style={styles.alertCard}>
                <Ionicons name="warning-outline" size={24} color="#F2A34A" />
                <View style={{ flex: 1 }}>
                    <Typography.Subtitle style={{ fontSize: 14 }}>Heavy Rain Alert</Typography.Subtitle>
                    <Typography.Caption>Advisory issued for Karnataka region farmers.</Typography.Caption>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        paddingTop: 0,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
        marginTop: 16,
    },
    welcomeText: {
        fontSize: 24,
        color: '#1A1A1A',
    },
    subText: {
        color: '#666',
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#1A1A1A',
        justifyContent: 'center',
        alignItems: 'center',
    },
    sectionTitle: {
        fontSize: 18,
        marginBottom: 16,
        color: '#1A1A1A',
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        marginBottom: 32,
    },
    statCard: {
        width: '48%',
        backgroundColor: '#FFF',
        borderRadius: 16,
        padding: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    statContent: {
        gap: 4,
    },
    statTitle: {
        color: '#666',
        fontSize: 12,
    },
    statValue: {
        fontSize: 20,
    },
    statSubtitle: {
        fontSize: 10,
        color: '#999',
    },
    actionsContainer: {
        backgroundColor: '#FFF',
        borderRadius: 16,
        padding: 8,
        marginBottom: 32,
        elevation: 1,
    },
    actionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F5F5F5',
    },
    actionLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    actionIcon: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionText: {
        fontSize: 15,
        color: '#333',
    },
    alertCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF8E1',
        padding: 16,
        borderRadius: 12,
        gap: 12,
        marginBottom: 32,
        borderWidth: 1,
        borderColor: '#FFE082',
    }
});
