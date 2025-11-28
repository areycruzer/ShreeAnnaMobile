import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Typography } from '../../components/Typography';
import { theme } from '../../theme';
import { Button } from '../../components/Button';
import { ScreenWrapper } from '../../components/ScreenWrapper';

export const ProductDetailsScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const { t } = useTranslation();
    const route = useRoute<any>();
    const { product } = route.params || {};

    // Fallback data if no product passed (for testing)
    const item = product || {
        name: 'Bajra (Pearl Millet)',
        farm: 'Rajasthan Farmers Collective',
        price: 42,
        quantity: 'kg',
        available: '1000 kg',
        location: 'Rajasthan',
        farmer: 'Suresh Patel'
    };

    return (
        <ScreenWrapper scrollable>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Typography.Body>← {t('productDetails.back')}</Typography.Body>
                    </TouchableOpacity>
                </View>

                {/* Product Image Placeholder */}
                <View style={styles.imageContainer}>
                    <Typography.Title style={{ fontSize: 64 }}>🌾</Typography.Title>
                </View>

                {/* Header Info */}
                <View style={styles.infoSection}>
                    <Typography.Title style={styles.productName}>{item.name}</Typography.Title>
                    <Typography.Caption style={styles.farmName}>{item.farm}</Typography.Caption>
                </View>

                {/* Details Card */}
                <View style={styles.detailsCard}>
                    <View style={styles.row}>
                        <Typography.Body style={styles.label}>{t('productDetails.farmer')}:</Typography.Body>
                        <Typography.Body style={styles.value}>{item.farmer}</Typography.Body>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.row}>
                        <Typography.Body style={styles.label}>{t('productDetails.available')}:</Typography.Body>
                        <Typography.Body style={styles.value}>{item.available}</Typography.Body>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.row}>
                        <Typography.Body style={styles.label}>{t('productDetails.price')}:</Typography.Body>
                        <Typography.Body style={styles.price}>₹{item.price}/{item.quantity}</Typography.Body>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.row}>
                        <Typography.Body style={styles.label}>{t('productDetails.location')}:</Typography.Body>
                        <Typography.Body style={styles.value}>{item.location}</Typography.Body>
                    </View>
                </View>

                <View style={{ flex: 1 }} />

                {/* Action Button */}
                <Button
                    title={t('productDetails.requestPurchase')}
                    onPress={() => navigation.navigate('PlaceOrder', { product: item })}
                    style={styles.button}
                />
            </ScrollView>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
    },
    header: {
        marginBottom: 16,
    },
    backButton: {
        paddingVertical: 8,
    },
    imageContainer: {
        height: 200,
        backgroundColor: '#F5F5F5',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    infoSection: {
        marginBottom: 24,
    },
    productName: {
        fontSize: 24,
        marginBottom: 4,
    },
    farmName: {
        fontSize: 14,
        color: '#666',
    },
    detailsCard: {
        backgroundColor: '#FFF',
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        marginBottom: 24,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
    },
    divider: {
        height: 1,
        backgroundColor: '#F0F0F0',
    },
    label: {
        color: '#666',
    },
    value: {
        fontWeight: '500',
        color: '#333',
    },
    price: {
        fontWeight: 'bold',
        color: '#2F8F46',
        fontSize: 18,
    },
    button: {
        marginTop: 'auto',
    }
});
