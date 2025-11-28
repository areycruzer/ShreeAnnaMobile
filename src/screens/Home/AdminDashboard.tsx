import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Typography } from '../../components/Typography';
import { useAuthStore } from '../../store/authStore';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

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
    const { t } = useTranslation();

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={styles.header}>
                <View>
                    <Typography.Title style={styles.welcomeText}>{t('adminDashboard.portalTitle')}</Typography.Title>
                    <Typography.Caption style={styles.subText}>{t('adminDashboard.portalSubtitle')}</Typography.Caption>
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
            <Typography.Subtitle style={styles.sectionTitle}>{t('adminDashboard.platformOverview')}</Typography.Subtitle>
            <View style={styles.statsGrid}>
                <StatCard title={t('adminDashboard.totalFarmers')} value="1,245" icon="people" color="#2F8F46" subtitle={t('adminDashboard.farmersSubtitle')} />
                <StatCard title={t('adminDashboard.activeFPOs')} value="48" icon="business" color="#F2A34A" subtitle={t('adminDashboard.fposSubtitle')} />
                <StatCard title={t('adminDashboard.totalVolume')} value="850 MT" icon="cube" color="#2F80ED" subtitle={t('adminDashboard.volumeSubtitle')} />
                <StatCard title={t('adminDashboard.marketPrice')} value="₹2,450" icon="trending-up" color="#9C27B0" subtitle={t('adminDashboard.priceSubtitle')} />
            </View>

            {/* Quick Actions */}
            <Typography.Subtitle style={styles.sectionTitle}>{t('adminDashboard.management')}</Typography.Subtitle>
            <View style={styles.actionsContainer}>
                <ActionRow title={t('adminDashboard.verifyFarmers')} icon="checkmark-circle-outline" />
                <ActionRow title={t('adminDashboard.approveFPOs')} icon="document-text-outline" />
                <ActionRow title={t('adminDashboard.priceUpdates')} icon="pricetag-outline" />
                <ActionRow title={t('adminDashboard.schemeBeneficiaries')} icon="people-outline" />
                <ActionRow title={t('adminDashboard.grievanceRedressal')} icon="chatbubble-ellipses-outline" />
            </View>

            {/* Recent Alerts */}
            <Typography.Subtitle style={styles.sectionTitle}>{t('adminDashboard.systemAlerts')}</Typography.Subtitle>
            <View style={styles.alertCard}>
                <Ionicons name="warning-outline" size={24} color="#F2A34A" />
                <View style={{ flex: 1 }}>
                    <Typography.Subtitle style={{ fontSize: 14 }}>{t('adminDashboard.rainAlertTitle')}</Typography.Subtitle>
                    <Typography.Caption>{t('adminDashboard.rainAlertBody')}</Typography.Caption>
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
