import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ScreenWrapper } from '../../components/ScreenWrapper';
import { Typography } from '../../components/Typography';
import { Card } from '../../components/Card';
import { Badge } from '../../components/Badge';
import { Button } from '../../components/Button';
import { theme } from '../../theme';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Mock data - replace with API call
const MOCK_ORDERS = [
    { id: '101', buyer: 'Organic Foods Ltd', item: 'Millet Bajra', qty: '500kg', price: '₹12,500', status: 'Pending', date: '2023-10-25' },
    { id: '102', buyer: 'Green Earth FPO', item: 'Jowar Grade A', qty: '200kg', price: '₹6,000', status: 'Accepted', date: '2023-10-24' },
    { id: '103', buyer: 'Local Mandi', item: 'Ragi', qty: '100kg', price: '₹3,500', status: 'Rejected', date: '2023-10-23' },
];

import { SuccessAnimation } from '../../components/SuccessAnimation';

export const OrdersScreen = () => {
    const { t } = useTranslation();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [orders, setOrders] = useState(MOCK_ORDERS);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleAccept = (id: string) => {
        Alert.alert(t('buttons.confirm'), t('orders.confirmAccept'), [
            { text: t('buttons.cancel'), style: 'cancel' },
            {
                text: t('offers.accept'),
                onPress: () => {
                    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: 'Accepted' } : o));
                    setShowSuccess(true);
                }
            }
        ]);
    };

    const handleReject = (id: string) => {
        Alert.alert(t('buttons.confirm'), t('orders.confirmReject'), [
            { text: t('buttons.cancel'), style: 'cancel' },
            {
                text: t('offers.reject'),
                style: 'destructive',
                onPress: () => {
                    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: 'Rejected' } : o));
                }
            }
        ]);
    };

    const [activeTab, setActiveTab] = useState('Pending');

    const filteredOrders = orders.filter(o => {
        if (activeTab === 'All') return true;
        return o.status === activeTab;
    });

    const TabButton = ({ title }: { title: string }) => (
        <TouchableOpacity
            style={[styles.tab, activeTab === title && styles.activeTab]}
            onPress={() => setActiveTab(title)}
        >
            <Typography.Body style={[styles.tabText, activeTab === title && styles.activeTabText]}>
                {t(`status.${title.toLowerCase()}`, title)}
            </Typography.Body>
        </TouchableOpacity>
    );

    const renderItem = ({ item }: { item: typeof MOCK_ORDERS[0] }) => {
        const getStatusType = (status: string) => {
            switch (status) {
                case 'Accepted': return 'success';
                case 'Rejected': return 'danger';
                default: return 'warning';
            }
        };

        return (
            <Card
                title={item.buyer}
                subtitle={`${item.item} • ${item.qty}`}
                status={<Badge label={t(`status.${item.status.toLowerCase()}`, item.status)} statusType={getStatusType(item.status)} size="small" />}
                meta={item.date}
                onPress={() => item.status === 'Accepted' && navigation.navigate('Trace', { batchId: item.id })}
                action={
                    item.status === 'Pending' ? (
                        <View style={styles.actions}>
                            <Button
                                title={t('offers.reject')}
                                onPress={() => handleReject(item.id)}
                                variant="ghost"
                                style={styles.actionBtn}
                                textStyle={{ color: theme.colors.danger, fontSize: 12 }}
                            />
                            <Button
                                title={t('offers.accept')}
                                onPress={() => handleAccept(item.id)}
                                variant="secondary"
                                style={styles.actionBtn}
                                textStyle={{ fontSize: 12 }}
                            />
                        </View>
                    ) : (
                        <Typography.Caption style={{ color: theme.colors.text.secondary }}>
                            {t('orders.total')} {item.price}
                        </Typography.Caption>
                    )
                }
                style={styles.card}
            />
        );
    };

    return (
        <ScreenWrapper style={styles.container}>
            <View style={styles.header}>
                <Typography.Title>{t('home.orders')}</Typography.Title>
            </View>

            <View style={styles.tabsContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsContent}>
                    {['Pending', 'Accepted', 'Rejected'].map(tab => (
                        <TabButton key={tab} title={tab} />
                    ))}
                </ScrollView>
            </View>

            <FlatList
                data={filteredOrders}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.list}
                ListEmptyComponent={
                    <View style={styles.empty}>
                        <Typography.Body>{t('orders.noOrders', { status: t(`status.${activeTab.toLowerCase()}`) })}</Typography.Body>
                    </View>
                }
            />
            <SuccessAnimation
                visible={showSuccess}
                message={t('orders.orderAccepted')}
                onFinish={() => setShowSuccess(false)}
            />
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    header: {
        padding: 16,
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    tabsContainer: {
        backgroundColor: '#FFF',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    tabsContent: {
        paddingHorizontal: 16,
        gap: 12,
    },
    tab: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#F5F5F5',
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    activeTab: {
        backgroundColor: '#2F8F46',
        borderColor: '#2F8F46',
    },
    tabText: {
        color: '#666',
        fontWeight: '500',
    },
    activeTabText: {
        color: '#FFF',
    },
    list: {
        padding: 16,
        gap: 16,
    },
    card: {
        marginBottom: 0,
        elevation: 2,
        borderRadius: 12,
        borderWidth: 0,
    },
    actions: {
        flexDirection: 'row',
        gap: 8,
        marginTop: 8,
    },
    actionBtn: {
        minHeight: 32,
        paddingVertical: 4,
        paddingHorizontal: 12,
    },
    empty: {
        padding: 40,
        alignItems: 'center',
    }
});
