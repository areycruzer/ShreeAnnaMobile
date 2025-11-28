import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Typography } from './Typography';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

export const MarketPriceTicker = () => {
    const { t } = useTranslation();

    // Mock eNAM Data
    const prices = [
        { name: 'Ragi', price: '₹2,200', change: '+2%', up: true },
        { name: 'Jowar', price: '₹2,850', change: '-1%', up: false },
        { name: 'Bajra', price: '₹2,100', change: '+0.5%', up: true },
        { name: 'Foxtail', price: '₹3,500', change: '+5%', up: true },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Typography.Subtitle style={styles.title}>{t('market.livePrices')} (eNAM)</Typography.Subtitle>
                <Typography.Caption style={styles.subtitle}>{t('market.updatedJustNow')}</Typography.Caption>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {prices.map((item, index) => (
                    <View key={index} style={styles.priceCard}>
                        <Typography.Body style={styles.cropName}>{item.name}</Typography.Body>
                        <Typography.Title style={styles.price}>{item.price}/Q</Typography.Title>
                        <View style={[styles.changeBadge, { backgroundColor: item.up ? '#E8F5E9' : '#FFEBEE' }]}>
                            <Ionicons name={item.up ? "arrow-up" : "arrow-down"} size={12} color={item.up ? "#2F8F46" : "#D32F2F"} />
                            <Typography.Caption style={{ color: item.up ? "#2F8F46" : "#D32F2F", fontWeight: 'bold' }}>
                                {item.change}
                            </Typography.Caption>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 24,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: 12,
        paddingHorizontal: 4,
    },
    title: {
        fontWeight: 'bold',
        color: '#1A1A1A',
    },
    subtitle: {
        color: '#666',
    },
    scrollContent: {
        paddingRight: 16,
    },
    priceCard: {
        backgroundColor: '#FFF',
        padding: 12,
        borderRadius: 12,
        marginRight: 12,
        width: 120,
        borderWidth: 1,
        borderColor: '#E8E8E8',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    cropName: {
        color: '#666',
        marginBottom: 4,
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1A1A1A',
        marginBottom: 8,
    },
    changeBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        gap: 2,
    }
});
