import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ScreenWrapper } from '../../components/ScreenWrapper';
import { Typography } from '../../components/Typography';
import { Card } from '../../components/Card';
import { FAB } from '../../components/FAB';
import { getLocalBatches, initDatabase } from '../../services/Database';
import api from '../../services/api';
import { useAuthStore } from '../../store/authStore';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { theme } from '../../theme';

// Placeholder images for demo
const thumb1 = { uri: 'https://placehold.co/600x400/2F8F46/FFFFFF/png?text=Millet+Batch+1' };
const thumb2 = { uri: 'https://placehold.co/600x400/F2A34A/FFFFFF/png?text=Millet+Batch+2' };

export const MyBatchesScreen = () => {
    const { t } = useTranslation();
    const user = useAuthStore(state => state.user);
    const [batches, setBatches] = useState<any[]>([]);
    const [refreshing, setRefreshing] = useState(false);
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const isFocused = useIsFocused();

    const fetchBatches = async () => {
        setRefreshing(true);
        try {
            const local = getLocalBatches();
            const response = await api.get(`/batches?farm_user_id=${user?.user_id}`);
            const remote = response.data;
            setBatches([...local, ...remote]);
        } catch (error) {
            console.error(error);
            setBatches(getLocalBatches());
        } finally {
            setRefreshing(false);
        }
    };

    useEffect(() => {
        initDatabase();
        if (isFocused) {
            fetchBatches();
        }
    }, [isFocused]);

    const renderItem = ({ item, index }: { item: any, index: number }) => {
        // Alternate images for demo
        const image = item.sample_image ? { uri: item.sample_image } : (index % 2 === 0 ? thumb1 : thumb2);

        // Map status to badge type
        let statusType: 'default' | 'success' | 'warning' | 'danger' | 'info' = 'default';
        if (item.status === 'Listed') statusType = 'success';
        if (item.status === 'Draft') statusType = 'warning';
        if (item.status === 'QC Pending') statusType = 'info';

        return (
            <Card
                title={item.commodity_code}
                subtitle={`Grade: ${item.grade} • ${item.qty_kg} kg`}
                meta={item.harvest_date}
                image={image}
                status={item.status || 'Draft'}
                statusType={statusType}
                onPress={() => navigation.navigate('Trace', { batchId: item.batch_id })}
                style={styles.card}
            />
        );
    };

    return (
        <ScreenWrapper style={styles.container}>
            <Typography.Title style={styles.header}>{t('home.myBatches')}</Typography.Title>

            <FlatList
                data={batches}
                renderItem={renderItem}
                keyExtractor={(item, index) => item.batch_id || `local-${index}`}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchBatches} />}
                contentContainerStyle={styles.list}
                ListEmptyComponent={<Typography.Body style={{ textAlign: 'center', marginTop: 20 }}>No batches found</Typography.Body>}
            />

            <FAB onPress={() => navigation.navigate('BatchForm')} />
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: theme.spacing.layout.screenPadding,
        flex: 1,
    },
    header: {
        marginBottom: theme.spacing.m,
    },
    list: {
        paddingBottom: 80, // Space for FAB
    },
    card: {
        marginBottom: theme.spacing.m,
    }
});

