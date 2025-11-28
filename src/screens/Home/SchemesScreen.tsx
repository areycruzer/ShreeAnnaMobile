import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { ScreenWrapper } from '../../components/ScreenWrapper';
import { Typography } from '../../components/Typography';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { theme } from '../../theme';
import { useNavigation } from '@react-navigation/native';

export const SchemesScreen = () => {
    const { t } = useTranslation();
    const navigation = useNavigation();

    const schemes = [
        {
            id: 1,
            title: t('schemes.list.pmKisanTitle'),
            description: t('schemes.list.pmKisanDesc'),
            link: 'https://pmkisan.gov.in/',
            icon: 'cash-outline',
            color: '#2F8F46'
        },
        {
            id: 2,
            title: t('schemes.list.nmeoTitle'),
            description: t('schemes.list.nmeoDesc'),
            link: 'https://nmoop.gov.in/',
            icon: 'water-outline',
            color: '#F2A34A'
        },
        {
            id: 3,
            title: t('schemes.list.pmfbyTitle'),
            description: t('schemes.list.pmfbyDesc'),
            link: 'https://pmfby.gov.in/',
            icon: 'shield-checkmark-outline',
            color: '#2196F3'
        },
        {
            id: 4,
            title: t('schemes.list.milletMissionTitle'),
            description: t('schemes.list.milletMissionDesc'),
            link: 'https://www.abhim.gov.in/',
            icon: 'leaf-outline',
            color: '#D4AF37'
        },
        {
            id: 5,
            title: t('schemes.list.enamTitle'),
            description: t('schemes.list.enamDesc'),
            link: 'https://enam.gov.in/',
            icon: 'cart-outline',
            color: '#9C27B0'
        }
    ];

    const openLink = (url: string) => {
        Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
    };

    return (
        <ScreenWrapper style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
                </TouchableOpacity>
                <Typography.Title style={styles.headerTitle}>{t('schemes.title')}</Typography.Title>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <Typography.Body style={styles.subtitle}>
                    {t('schemes.subtitle')}
                </Typography.Body>

                {schemes.map((scheme) => (
                    <TouchableOpacity key={scheme.id} style={styles.card} onPress={() => openLink(scheme.link)}>
                        <View style={[styles.iconContainer, { backgroundColor: scheme.color + '20' }]}>
                            <Ionicons name={scheme.icon as any} size={24} color={scheme.color} />
                        </View>
                        <View style={styles.cardContent}>
                            <Typography.Subtitle style={styles.cardTitle}>{scheme.title}</Typography.Subtitle>
                            <Typography.Caption style={styles.cardDesc}>{scheme.description}</Typography.Caption>
                            <View style={styles.linkRow}>
                                <Typography.Caption style={{ color: scheme.color, fontWeight: 'bold' }}>{t('schemes.applyNow')}</Typography.Caption>
                                <Ionicons name="open-outline" size={14} color={scheme.color} />
                            </View>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color="#CCC" />
                    </TouchableOpacity>
                ))}

                <TouchableOpacity style={styles.moreButton} onPress={() => openLink('https://myscheme.gov.in/')}>
                    <Typography.Body style={styles.moreButtonText}>{t('schemes.viewMoreOnMyScheme')}</Typography.Body>
                    <Ionicons name="open" size={16} color="#FFF" />
                </TouchableOpacity>
            </ScrollView>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    backButton: {
        padding: 4,
    },
    headerTitle: {
        fontSize: 18,
    },
    content: {
        padding: 16,
    },
    subtitle: {
        color: '#666',
        marginBottom: 20,
        textAlign: 'center',
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    cardContent: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
        color: '#1A1A1A',
    },
    cardDesc: {
        color: '#666',
        marginBottom: 8,
        lineHeight: 18,
    },
    linkRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    moreButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2F8F46',
        padding: 16,
        borderRadius: 12,
        gap: 8,
        marginTop: 8,
        marginBottom: 32,
    },
    moreButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    }
});
