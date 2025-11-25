import React from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ScreenWrapper } from '../../components/ScreenWrapper';
import { Typography } from '../../components/Typography';

import { theme } from '../../theme';

const TimelineItem = ({ title, date, status, isLast }: any) => (
    <View style={styles.timelineItem}>
        <View style={styles.timelineLeft}>
            <View style={[styles.dot, status === 'completed' && styles.dotActive]} />
            {!isLast && <View style={styles.line} />}
        </View>
        <View style={styles.timelineContent}>
            <Typography.Subtitle>{title}</Typography.Subtitle>
            <Typography.Caption>{date}</Typography.Caption>
            <Typography.Caption style={{ color: status === 'completed' ? theme.colors.success : theme.colors.text.muted }}>
                {status}
            </Typography.Caption>
        </View>
    </View>
);

export const TraceScreen = () => {
    const { t } = useTranslation();

    return (
        <ScreenWrapper style={styles.container}>
            <View style={styles.header}>
                <Typography.Title>Traceability</Typography.Title>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.qrSection}>
                    <Image
                        source={{ uri: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=ExampleBatch123' }}
                        style={styles.qrCode}
                    />
                    <Typography.Body style={{ textAlign: 'center', marginTop: theme.spacing.m, fontWeight: 'bold' }}>
                        Batch #12345
                    </Typography.Body>
                </View>

                <View style={styles.mapPlaceholder}>
                    <Typography.Subtitle style={{ color: theme.colors.primary }}>🗺️ Map View</Typography.Subtitle>
                    <Typography.Caption>Origin: Rajasthan, India</Typography.Caption>
                </View>

                <View style={styles.timeline}>
                    <TimelineItem
                        title="Harvested"
                        date="25 Oct 2023"
                        status="completed"
                    />
                    <TimelineItem
                        title="Quality Check"
                        date="26 Oct 2023"
                        status="completed"
                    />
                    <TimelineItem
                        title="Stored at Warehouse"
                        date="27 Oct 2023"
                        status="completed"
                    />
                    <TimelineItem
                        title="Dispatched"
                        date="Pending"
                        status="pending"
                        isLast
                    />
                </View>


            </ScrollView>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background.default,
    },
    header: {
        padding: theme.spacing.layout.screenPadding,
        backgroundColor: theme.colors.background.paper,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.divider,
    },
    content: {
        padding: theme.spacing.layout.screenPadding,
    },
    qrSection: {
        alignItems: 'center',
        marginBottom: theme.spacing.xl,
        padding: theme.spacing.l,
        backgroundColor: '#FFF',
        borderRadius: 16,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    qrCode: {
        width: 180,
        height: 180,
    },
    mapPlaceholder: {
        height: 150,
        backgroundColor: '#E8F5E9',
        borderRadius: 12,
        marginBottom: 24,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#C8E6C9',
    },
    timeline: {
        marginBottom: theme.spacing.xl,
        backgroundColor: '#FFF',
        padding: 16,
        borderRadius: 16,
    },
    timelineItem: {
        flexDirection: 'row',
        minHeight: 80,
    },
    timelineLeft: {
        alignItems: 'center',
        width: 40,
    },
    dot: {
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: '#E0E0E0',
        marginTop: 4,
        borderWidth: 2,
        borderColor: '#FFF',
        elevation: 2,
    },
    dotActive: {
        backgroundColor: theme.colors.primary,
        borderColor: '#FFF',
    },
    line: {
        width: 2,
        flex: 1,
        backgroundColor: '#E0E0E0',
        marginVertical: 4,
    },
    timelineContent: {
        flex: 1,
        paddingLeft: 12,
        paddingBottom: 24,
    },
});
