import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { Typography } from '../../components/Typography';
import { Button } from '../../components/Button';
import { useAuthStore } from '../../store/authStore';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { theme } from '../../theme';
import { Ionicons } from '@expo/vector-icons';

const InfoCard = ({ icon, label, value }: any) => {
    const { t } = useTranslation();
    return (
        <View style={styles.infoCard}>
            <View style={styles.infoIconContainer}>
                <Ionicons name={icon} size={20} color="#2F8F46" />
            </View>
            <View style={styles.infoContent}>
                <Typography.Caption style={styles.infoLabel}>{label}</Typography.Caption>
                <Typography.Body style={styles.infoValue}>{value || t('profile.notProvided')}</Typography.Body>
            </View>
        </View>
    );
};

export const ProfileScreen = () => {
    const { t, i18n } = useTranslation();
    const navigation = useNavigation<any>();
    const user = useAuthStore(state => state.user);
    const logout = useAuthStore(state => state.logout);

    const handleLogout = async () => {
        Alert.alert(
            t('settings.logout'),
            t('profile.logoutConfirm'),
            [
                { text: t('buttons.cancel'), style: 'cancel' },
                {
                    text: t('settings.logout'),
                    style: 'destructive',
                    onPress: async () => {
                        await logout();
                    }
                }
            ]
        );
    };

    const handleGoBack = () => {
        navigation.goBack();
    };

    const [showLanguageModal, setShowLanguageModal] = React.useState(false);

    const languages = [
        { code: 'en', name: 'English', native: 'English', flag: '🇬🇧' },
        { code: 'hi', name: 'Hindi', native: 'हिंदी', flag: '🇮🇳' },
        { code: 'ta', name: 'Tamil', native: 'தமிழ்', flag: '🇮🇳' },
        { code: 'te', name: 'Telugu', native: 'తెలుగు', flag: '🇮🇳' },
        { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ', flag: '🇮🇳' },
        { code: 'ml', name: 'Malayalam', native: 'മലയാളം', flag: '🇮🇳' },
        { code: 'mr', name: 'Marathi', native: 'मराठी', flag: '🇮🇳' },
        { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી', flag: '🇮🇳' },
        { code: 'bn', name: 'Bengali', native: 'বাংলা', flag: '🇮🇳' },
        { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ', flag: '🇮🇳' }
    ];

    const currentLanguage = languages.find(l => l.code === i18n.language) || languages[0];

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header with Back Button */}
                <View style={styles.headerContainer}>
                    <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
                        <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
                    </TouchableOpacity>
                    <Typography.Title style={styles.headerTitle}>{t('onboarding.createProfile')}</Typography.Title>
                    <View style={{ width: 24 }} />
                </View>

                {/* Profile Avatar Section */}
                <View style={styles.profileHeader}>
                    <View style={styles.avatarContainer}>
                        <Typography.Title style={styles.avatarText}>
                            {user?.name?.charAt(0).toUpperCase() || 'U'}
                        </Typography.Title>
                    </View>
                    <Typography.Title style={styles.nameText}>{user?.name || 'User'}</Typography.Title>
                    <View style={styles.roleBadge}>
                        <Ionicons name="leaf" size={14} color="#2F8F46" />
                        <Typography.Caption style={styles.roleText}>{user?.role?.toUpperCase()}</Typography.Caption>
                    </View>
                </View>

                {/* Personal Information Section */}
                <View style={styles.section}>
                    <Typography.Subtitle style={styles.sectionTitle}>{t('onboarding.name')}</Typography.Subtitle>
                    <InfoCard icon="person" label={t('onboarding.name')} value={user?.name} />
                    <InfoCard icon="call" label={t('phonePlaceholder')} value={user?.phone} />
                    <InfoCard icon="mail" label={t('profile.email')} value={user?.email} />
                    <InfoCard icon="calendar" label={t('profile.memberSince')} value={user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'} />
                </View>

                {/* Location Information Section */}
                {(user?.village || user?.district || user?.state) && (
                    <View style={styles.section}>
                        <Typography.Subtitle style={styles.sectionTitle}>{t('onboarding.village')}</Typography.Subtitle>
                        {user?.village && <InfoCard icon="home" label={t('onboarding.village')} value={user.village} />}
                        {user?.district && <InfoCard icon="location" label={t('profile.district')} value={user.district} />}
                        {user?.state && <InfoCard icon="map" label={t('profile.state')} value={user.state} />}
                    </View>
                )}

                {/* Role-Specific Information */}
                {user?.fpo_id && (
                    <View style={styles.section}>
                        <Typography.Subtitle style={styles.sectionTitle}>{t('profile.organization')}</Typography.Subtitle>
                        <InfoCard icon="business" label={t('onboarding.fpoId')} value={user.fpo_id} />
                    </View>
                )}

                {/* Account Settings Section */}
                <View style={styles.section}>
                    <Typography.Subtitle style={styles.sectionTitle}>{t('profile.accountSettings')}</Typography.Subtitle>
                    <TouchableOpacity style={styles.settingRow} onPress={() => navigation.navigate('EditProfile')}>
                        <View style={styles.settingLeft}>
                            <Ionicons name="create-outline" size={20} color="#666" />
                            <Typography.Body style={styles.settingText}>{t('profile.editProfile')}</Typography.Body>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color="#999" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.settingRow} onPress={() => setShowLanguageModal(true)}>
                        <View style={styles.settingLeft}>
                            <Ionicons name="language-outline" size={20} color="#666" />
                            <Typography.Body style={styles.settingText}>{t('settings.language')}</Typography.Body>
                        </View>
                        <View style={styles.settingRight}>
                            <Typography.Caption style={{ color: '#999' }}>{currentLanguage.name}</Typography.Caption>
                            <Ionicons name="chevron-forward" size={20} color="#999" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.settingRow}>
                        <View style={styles.settingLeft}>
                            <Ionicons name="shield-checkmark-outline" size={20} color="#666" />
                            <Typography.Body style={styles.settingText}>{t('profile.privacySecurity')}</Typography.Body>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color="#999" />
                    </TouchableOpacity>
                </View>

                {/* Logout Button */}
                <View style={styles.logoutContainer}>
                    <Button
                        title={t('settings.logout')}
                        onPress={handleLogout}
                        variant="ghost"
                        style={styles.logoutButton}
                        textStyle={{ color: theme.colors.danger }}
                    />
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>

            <Modal visible={showLanguageModal} transparent={true} animationType="fade" onRequestClose={() => setShowLanguageModal(false)}>
                <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setShowLanguageModal(false)}>
                    <View style={styles.modalContent} onStartShouldSetResponder={() => true}>
                        <View style={styles.modalHeader}>
                            <Typography.Title style={styles.modalTitle}>{t('auth.selectLanguage')}</Typography.Title>
                            <Typography.Caption style={styles.modalSubtitle}>{t('selectLanguage')}</Typography.Caption>
                        </View>

                        <ScrollView style={{ maxHeight: 400 }} showsVerticalScrollIndicator={false}>
                            {languages.map((lang) => (
                                <TouchableOpacity
                                    key={lang.code}
                                    style={[styles.languageOption, i18n.language === lang.code && styles.languageOptionActive]}
                                    onPress={() => { i18n.changeLanguage(lang.code); setShowLanguageModal(false); }}
                                >
                                    <Typography.Body style={styles.languageFlag}>{lang.flag}</Typography.Body>
                                    <View style={styles.languageInfo}>
                                        <Typography.Subtitle style={styles.languageName}>{lang.name}</Typography.Subtitle>
                                        <Typography.Caption style={styles.languageNative}>{lang.native}</Typography.Caption>
                                    </View>
                                    {i18n.language === lang.code && <Typography.Body style={{ color: '#2F8F46', fontSize: 20 }}>✓</Typography.Body>}
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </TouchableOpacity>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    backButton: {
        padding: 4,
    },
    headerTitle: {
        fontSize: 18,
        color: '#1A1A1A',
    },
    profileHeader: {
        alignItems: 'center',
        paddingVertical: 32,
        backgroundColor: '#FFF',
        marginBottom: 16,
    },
    avatarContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#E8F5E9',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        borderWidth: 4,
        borderColor: '#2F8F46',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    avatarText: {
        fontSize: 40,
        color: '#2F8F46',
        fontWeight: 'bold',
    },
    nameText: {
        fontSize: 24,
        color: '#1A1A1A',
        marginBottom: 8,
    },
    roleBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: '#E8F5E9',
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 20,
    },
    roleText: {
        color: '#2F8F46',
        fontWeight: 'bold',
        fontSize: 12,
    },
    section: {
        backgroundColor: '#FFF',
        paddingHorizontal: 20,
        paddingVertical: 16,
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1A1A1A',
        marginBottom: 16,
    },
    infoCard: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    infoIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#E8F5E9',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    infoContent: {
        flex: 1,
    },
    infoLabel: {
        fontSize: 12,
        color: '#666',
        marginBottom: 2,
    },
    infoValue: {
        fontSize: 15,
        color: '#1A1A1A',
        fontWeight: '500',
    },
    settingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    settingLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    settingText: {
        fontSize: 15,
        color: '#1A1A1A',
    },
    settingRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    logoutContainer: {
        paddingHorizontal: 20,
        marginTop: 8,
    },
    logoutButton: {
        borderWidth: 1,
        borderColor: theme.colors.danger,
    },
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center', padding: 24 },
    modalContent: { backgroundColor: '#FFF', borderRadius: 20, padding: 24, width: '100%', maxWidth: 400, elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 8 },
    modalHeader: { alignItems: 'center', marginBottom: 24, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: '#E8E8E8' },
    modalTitle: { fontSize: 22, fontWeight: 'bold', color: '#1A1A1A', marginBottom: 4 },
    modalSubtitle: { fontSize: 14, color: '#666' },
    languageOption: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 12, marginBottom: 12, borderWidth: 2, borderColor: '#E8E8E8', backgroundColor: '#FFF' },
    languageOptionActive: { borderColor: '#2F8F46', backgroundColor: '#F0F9F4' },
    languageFlag: { fontSize: 32, marginRight: 16 },
    languageInfo: { flex: 1 },
    languageName: { fontSize: 16, fontWeight: 'bold', color: '#1A1A1A', marginBottom: 2 },
    languageNative: { fontSize: 13, color: '#666' }
});
