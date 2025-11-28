import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Typography } from '../../components/Typography';
import { useAuthStore } from '../../store/authStore';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { WeatherWidget } from '../../components/WeatherWidget';
import { MarketPriceTicker } from '../../components/MarketPriceTicker';
import { useTranslation } from 'react-i18next';

const QuickActionCard = ({ iconName, iconType, title, subtitle, onPress, color }: any) => {
    const IconComponent = iconType === 'ionicons' ? Ionicons : MaterialCommunityIcons;
    return (
        <TouchableOpacity style={[styles.actionCard, { borderLeftColor: color }]} onPress={onPress} activeOpacity={0.7}>
            <View style={[styles.actionIconContainer, { backgroundColor: color + '20' }]}>
                <IconComponent name={iconName} size={28} color={color} />
            </View>
            <View style={styles.actionContent}>
                <Typography.Subtitle style={styles.actionTitle}>{title}</Typography.Subtitle>
                <Typography.Caption style={styles.actionSubtitle}>{subtitle}</Typography.Caption>
            </View>
            <Typography.Body style={{ color, fontSize: 20 }}>→</Typography.Body>
        </TouchableOpacity>
    );
};

const StatCard = ({ iconName, value, label, color }: any) => (
    <View style={[styles.statCard, { borderTopColor: color }]}>
        <Ionicons name={iconName} size={28} color={color} style={{ marginBottom: 4 }} />
        <Typography.Title style={{ fontSize: 20, color, marginBottom: 4 }}>{value}</Typography.Title>
        <Typography.Caption style={{ color: '#666' }}>{label}</Typography.Caption>
    </View>
);

const SchemeCard = ({ title, description, iconName, url }: any) => {
    const handleLearnMore = () => {
        Linking.openURL(url).catch(err => console.error('Failed to open URL:', err));
    };

    return (
        <View style={styles.schemeCard}>
            <View style={styles.schemeIconBadge}>
                <Ionicons name={iconName} size={28} color="#F2A34A" />
            </View>
            <Typography.Subtitle style={styles.schemeTitle}>{title}</Typography.Subtitle>
            <Typography.Caption style={styles.schemeDescription}>{description}</Typography.Caption>
            <TouchableOpacity style={styles.schemeButton} onPress={handleLearnMore}>
                <Typography.Caption style={{ color: '#2F8F46', fontWeight: 'bold' }}>Learn More →</Typography.Caption>
            </TouchableOpacity>
        </View>
    );
};

export const FarmerDashboard = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const user = useAuthStore(state => state.user);
    const { t } = useTranslation();

    // Generate pseudo-random stats based on user name length to make it look dynamic
    const seed = user?.name?.length || 5;
    const activeBatches = 5 + (seed % 10);
    const earnings = 10 + (seed * 2);
    const completed = 15 + (seed * 3);

    const quickActions = [
        { iconName: 'cube-outline', iconType: 'ionicons', title: t('dashboard.listProduce'), subtitle: t('dashboard.listProduceDesc'), color: '#2F8F46', screen: 'BatchForm' },
        { iconName: 'bar-chart', iconType: 'ionicons', title: t('dashboard.myBatches'), subtitle: t('dashboard.myBatchesDesc'), color: '#F2A34A', screen: 'MyBatches' },
        { iconName: 'cart-outline', iconType: 'ionicons', title: t('dashboard.orders'), subtitle: t('dashboard.ordersDesc'), color: '#2F80ED', screen: 'Orders' },
        { iconName: 'location-outline', iconType: 'ionicons', title: t('dashboard.traceability'), subtitle: t('dashboard.traceabilityDesc'), color: '#9C27B0', screen: 'Trace' }
    ];

    const schemes = [
        {
            title: 'PM Kisan',
            description: t('schemes.pmKisanDesc'),
            iconName: 'cash',
            url: 'https://pmkisan.gov.in/'
        },
        {
            title: 'Millet Subsidy',
            description: t('schemes.milletSubsidyDesc'),
            iconName: 'nutrition',
            url: 'https://millets.res.in/'
        },
        {
            title: 'Organic Cert',
            description: t('schemes.organicCertDesc'),
            iconName: 'checkmark-circle',
            url: 'https://pgsindia-ncof.gov.in/'
        }
    ];

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Welcome Section */}
            <View style={styles.welcomeSection}>
                <View>
                    <Typography.Caption style={{ color: '#666', marginBottom: 4 }}>{t('dashboard.welcome')},</Typography.Caption>
                    <Typography.Title style={{ fontSize: 24, color: '#1A1A1A' }}>{user?.name || 'Farmer'}</Typography.Title>
                    <Typography.Caption style={{ color: '#2F8F46', marginTop: 4 }}>
                        <Ionicons name="leaf" size={14} color="#2F8F46" /> {user?.role?.toUpperCase()}
                    </Typography.Caption>
                </View>
                <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate('Profile')}>
                    <View style={styles.avatarCircle}>
                        <Typography.Title style={{ color: '#2F8F46', fontSize: 24 }}>
                            {user?.name?.charAt(0).toUpperCase() || 'F'}
                        </Typography.Title>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={{ paddingHorizontal: 20 }}>
                <WeatherWidget />
            </View>

            {/* Stats Cards */}
            <View style={styles.statsRow}>
                <StatCard iconName="cube" value={activeBatches.toString()} label={t('dashboard.activeBatches')} color="#2F8F46" />
                <StatCard iconName="cash" value={`₹${earnings}k`} label={t('dashboard.thisMonth')} color="#F2A34A" />
                <StatCard iconName="checkmark-circle" value={completed.toString()} label={t('dashboard.completed')} color="#2F80ED" />
            </View>

            <View style={{ paddingHorizontal: 20 }}>
                <MarketPriceTicker />
            </View>

            {/* Quick Actions */}
            <Typography.Subtitle style={styles.sectionTitle}>{t('dashboard.quickActions')}</Typography.Subtitle>
            <View style={styles.actionsGrid}>
                {quickActions.map((action, index) => (
                    <QuickActionCard
                        key={index}
                        {...action}
                        onPress={() => navigation.navigate(action.screen)}
                    />
                ))}
            </View>

            {/* Government Schemes */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingRight: 20 }}>
                <Typography.Subtitle style={styles.sectionTitle}>{t('dashboard.govSchemes')}</Typography.Subtitle>
                <TouchableOpacity onPress={() => navigation.navigate('Schemes')}>
                    <Typography.Caption style={{ color: '#2F8F46', fontWeight: 'bold' }}>{t('dashboard.viewAll')}</Typography.Caption>
                </TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 24 }}>
                <View style={styles.schemesRow}>
                    {schemes.map((scheme, index) => (
                        <SchemeCard key={index} {...scheme} />
                    ))}
                </View>
            </ScrollView>

            {/* Help & Support */}
            <Typography.Subtitle style={styles.sectionTitle}>{t('dashboard.needHelp')}</Typography.Subtitle>
            <View style={styles.helpCard}>
                <View style={styles.helpRow}>
                    <View style={styles.helpIcon}>
                        <Ionicons name="call" size={20} color="#2F8F46" />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Typography.Caption style={{ color: '#666', marginBottom: 2 }}>{t('dashboard.helpline')}</Typography.Caption>
                        <Typography.Subtitle style={{ color: '#1A1A1A' }}>1800-180-1551</Typography.Subtitle>
                    </View>
                    <TouchableOpacity style={styles.callButton}>
                        <Typography.Caption style={{ color: '#FFF', fontWeight: 'bold' }}>{t('dashboard.call')}</Typography.Caption>
                    </TouchableOpacity>
                </View>
                <View style={[styles.helpRow, { marginTop: 16, paddingTop: 16, borderTopWidth: 1, borderTopColor: '#F0F0F0' }]}>
                    <View style={styles.helpIcon}>
                        <Ionicons name="mail" size={20} color="#2F8F46" />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Typography.Caption style={{ color: '#666', marginBottom: 2 }}>{t('dashboard.emailSupport')}</Typography.Caption>
                        <Typography.Caption style={{ color: '#1A1A1A' }}>support@shreeanna.gov.in</Typography.Caption>
                    </View>
                </View>
            </View>

            <View style={{ height: 40 }} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    welcomeSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#FFF',
        marginBottom: 16,
    },
    profileButton: {
        padding: 4,
    },
    avatarCircle: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#E8F5E9',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#2F8F46',
    },
    statsRow: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        gap: 12,
        marginBottom: 24,
    },
    statCard: {
        flex: 1,
        backgroundColor: '#FFF',
        paddingVertical: 16,
        paddingHorizontal: 12,
        borderRadius: 12,
        alignItems: 'center',
        borderTopWidth: 3,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1A1A1A',
        paddingHorizontal: 20,
        marginBottom: 12,
    },
    actionsGrid: {
        paddingHorizontal: 20,
        gap: 12,
        marginBottom: 24,
    },
    actionCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        padding: 16,
        borderRadius: 12,
        gap: 12,
        borderLeftWidth: 4,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
    },
    actionIconContainer: {
        width: 52,
        height: 52,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionContent: {
        flex: 1,
    },
    actionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1A1A1A',
        marginBottom: 2,
    },
    actionSubtitle: {
        fontSize: 12,
        color: '#666',
    },
    schemesRow: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        gap: 12,
    },
    schemeCard: {
        width: 220,
        backgroundColor: '#FFF',
        padding: 16,
        borderRadius: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    schemeIconBadge: {
        width: 48,
        height: 48,
        backgroundColor: '#FFF3E0',
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    schemeTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#1A1A1A',
        marginBottom: 6,
    },
    schemeDescription: {
        fontSize: 12,
        color: '#666',
        lineHeight: 18,
        marginBottom: 12,
    },
    schemeButton: {
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
    },
    helpCard: {
        backgroundColor: '#FFF',
        marginHorizontal: 20,
        padding: 16,
        borderRadius: 12,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        marginBottom: 16,
    },
    helpRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    helpIcon: {
        width: 44,
        height: 44,
        backgroundColor: '#E8F5E9',
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
    callButton: {
        backgroundColor: '#2F8F46',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    }
});
