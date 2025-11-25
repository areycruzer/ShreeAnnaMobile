import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Modal, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { Typography } from '../../components/Typography';
import { ScreenWrapper } from '../../components/ScreenWrapper';

const RoleCard = ({ title, description, color, icon, roleId, onPress }: any) => (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
        <View style={[styles.iconContainer, { backgroundColor: color }]}>
            <Typography.Title style={styles.iconText}>{icon}</Typography.Title>
        </View>
        <View style={styles.cardContent}>
            <Typography.Subtitle style={styles.cardTitle}>{title}</Typography.Subtitle>
            <Typography.Caption style={styles.cardDescription}>{description}</Typography.Caption>
        </View>
        <Typography.Body style={{ color }}>→</Typography.Body>
    </TouchableOpacity>
);

export const RoleSelectionScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const { t, i18n } = useTranslation();
    const [showLanguageModal, setShowLanguageModal] = useState(false);

    const roles = [
        { title: t('auth.roles.farmer'), description: t('auth.roles.farmerDesc'), color: '#2F8F46', icon: '🌾', roleId: 'farmer' },
        { title: t('auth.roles.shg'), description: t('auth.roles.shgDesc'), color: '#F2A34A', icon: '🤝', roleId: 'shg' },
        { title: t('auth.roles.buyer'), description: t('auth.roles.buyerDesc'), color: '#2F80ED', icon: '🏭', roleId: 'buyer' },
        { title: t('auth.roles.admin'), description: t('auth.roles.adminDesc'), color: '#EB5757', icon: '🏛️', roleId: 'admin' }
    ];

    return (
        <ScreenWrapper style={styles.container}>
            <StatusBar backgroundColor="#FFF" barStyle="dark-content" />
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.brandingContainer}>
                    <Image
                        source={require('../../../assets/logo.png')}
                        style={styles.logoImage}
                        resizeMode="contain"
                    />
                </View>

                <TouchableOpacity style={styles.languageButton} onPress={() => setShowLanguageModal(true)}>
                    <Typography.Body>🌐 {i18n.language === 'hi' ? 'हिंदी' : 'English'}</Typography.Body>
                    <Typography.Caption style={{ color: '#666' }}>{t('auth.changeLanguage')}</Typography.Caption>
                </TouchableOpacity>

                <View style={styles.mainContent}>
                    <Typography.Title style={styles.heading}>{t('auth.chooseRole')}</Typography.Title>
                    <Typography.Body style={styles.subheading}>{t('auth.selectRoleSubtitle')}</Typography.Body>
                    <View style={styles.rolesContainer}>
                        {roles.map((role, index) => (
                            <RoleCard key={index} {...role} onPress={() => navigation.navigate('Register', { role: role.roleId, color: role.color, title: role.title, icon: role.icon })} />
                        ))}
                    </View>
                </View>

                <View style={styles.footer}>
                    <Typography.Caption style={styles.footerText}>{t('auth.byContinuing')}</Typography.Caption>
                </View>
            </ScrollView>

            <Modal visible={showLanguageModal} transparent={true} animationType="fade" onRequestClose={() => setShowLanguageModal(false)}>
                <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setShowLanguageModal(false)}>
                    <View style={styles.modalContent} onStartShouldSetResponder={() => true}>
                        <View style={styles.modalHeader}>
                            <Typography.Title style={styles.modalTitle}>{t('auth.selectLanguage')}</Typography.Title>
                            <Typography.Caption style={styles.modalSubtitle}>{t('selectLanguage')}</Typography.Caption>
                        </View>
                        <TouchableOpacity
                            style={[styles.languageOption, i18n.language === 'en' && styles.languageOptionActive]}
                            onPress={() => { i18n.changeLanguage('en'); setShowLanguageModal(false); }}
                        >
                            <Typography.Body style={styles.languageFlag}>🇬🇧</Typography.Body>
                            <View style={styles.languageInfo}>
                                <Typography.Subtitle style={styles.languageName}>English</Typography.Subtitle>
                                <Typography.Caption style={styles.languageNative}>English</Typography.Caption>
                            </View>
                            {i18n.language === 'en' && <Typography.Body style={{ color: '#2F8F46', fontSize: 20 }}>✓</Typography.Body>}
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.languageOption, i18n.language === 'hi' && styles.languageOptionActive]}
                            onPress={() => { i18n.changeLanguage('hi'); setShowLanguageModal(false); }}
                        >
                            <Typography.Body style={styles.languageFlag}>🇮🇳</Typography.Body>
                            <View style={styles.languageInfo}>
                                <Typography.Subtitle style={styles.languageName}>Hindi</Typography.Subtitle>
                                <Typography.Caption style={styles.languageNative}>हिंदी</Typography.Caption>
                            </View>
                            {i18n.language === 'hi' && <Typography.Body style={{ color: '#2F8F46', fontSize: 20 }}>✓</Typography.Body>}
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFF' },
    scrollContent: { paddingBottom: 32 },
    brandingContainer: { alignItems: 'center', paddingTop: 40, paddingBottom: 30 },
    logoImage: { width: 200, height: 200 },
    languageButton: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F5F5F5', marginHorizontal: 24, marginBottom: 32, padding: 16, borderRadius: 12 },
    mainContent: { paddingHorizontal: 24 },
    heading: { fontSize: 24, fontWeight: 'bold', color: '#1A1A1A', marginBottom: 8 },
    subheading: { color: '#666', marginBottom: 24, lineHeight: 22 },
    rolesContainer: { gap: 16 },
    card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderRadius: 16, padding: 20, gap: 16, borderWidth: 1.5, borderColor: '#E8E8E8', elevation: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2 },
    iconContainer: { width: 56, height: 56, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
    iconText: { fontSize: 28 },
    cardContent: { flex: 1 },
    cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#1A1A1A', marginBottom: 4 },
    cardDescription: { color: '#666', fontSize: 13, lineHeight: 18 },
    footer: { paddingHorizontal: 24, paddingTop: 32, alignItems: 'center' },
    footerText: { color: '#999', textAlign: 'center', lineHeight: 18 },
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
