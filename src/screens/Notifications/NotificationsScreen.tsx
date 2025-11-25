import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '../../components/Typography';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

interface Notification {
    id: string;
    title: string;
    message: string;
    time: string;
    type: 'info' | 'success' | 'warning';
    icon: string;
    read: boolean;
}

const mockNotifications: Notification[] = [
    {
        id: '1',
        title: 'New Order Received',
        message: 'You have received a new order for 50kg of Foxtail Millet',
        time: '2 hours ago',
        type: 'success',
        icon: 'checkmark-circle',
        read: false
    },
    {
        id: '2',
        title: 'Payment Received',
        message: 'Payment of ₹15,000 has been credited to your account',
        time: '5 hours ago',
        type: 'success',
        icon: 'cash',
        read: false
    },
    {
        id: '3',
        title: 'PM Kisan Update',
        message: 'Next installment of PM Kisan will be credited on 1st December',
        time: '1 day ago',
        type: 'info',
        icon: 'information-circle',
        read: true
    },
    {
        id: '4',
        title: 'Weather Alert',
        message: 'Heavy rainfall expected in your area. Protect your crops.',
        time: '2 days ago',
        type: 'warning',
        icon: 'warning',
        read: true
    },
    {
        id: '5',
        title: 'Millet Subsidy Available',
        message: 'Apply for the new millet cultivation subsidy scheme',
        time: '3 days ago',
        type: 'info',
        icon: 'leaf',
        read: true
    },
    {
        id: '6',
        title: 'Order Delivered',
        message: 'Your order #12345 has been successfully delivered',
        time: '4 days ago',
        type: 'success',
        icon: 'checkmark-done',
        read: true
    },
];

const NotificationCard = ({ notification }: { notification: Notification }) => {
    const iconColors = {
        info: '#2F80ED',
        success: '#2F8F46',
        warning: '#F2A34A'
    };

    const bgColors = {
        info: '#E3F2FD',
        success: '#E8F5E9',
        warning: '#FFF3E0'
    };

    return (
        <TouchableOpacity
            style={[
                styles.notificationCard,
                !notification.read && styles.unreadCard
            ]}
            activeOpacity={0.7}
        >
            <View style={[styles.iconContainer, { backgroundColor: bgColors[notification.type] }]}>
                <Ionicons name={notification.icon as any} size={24} color={iconColors[notification.type]} />
            </View>
            <View style={styles.contentContainer}>
                <View style={styles.headerRow}>
                    <Typography.Subtitle style={styles.title}>{notification.title}</Typography.Subtitle>
                    {!notification.read && <View style={styles.unreadDot} />}
                </View>
                <Typography.Body style={styles.message}>{notification.message}</Typography.Body>
                <Typography.Caption style={styles.time}>{notification.time}</Typography.Caption>
            </View>
        </TouchableOpacity>
    );
};

export const NotificationsScreen = () => {
    const navigation = useNavigation<any>();
    const unreadCount = mockNotifications.filter(n => !n.read).length;

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
                </TouchableOpacity>
                <View style={styles.headerCenter}>
                    <Typography.Title style={styles.headerTitle}>Notifications</Typography.Title>
                    {unreadCount > 0 && (
                        <View style={styles.badge}>
                            <Typography.Caption style={styles.badgeText}>{unreadCount}</Typography.Caption>
                        </View>
                    )}
                </View>
                <TouchableOpacity style={styles.markAllButton}>
                    <Typography.Caption style={{ color: '#2F8F46' }}>Mark all read</Typography.Caption>
                </TouchableOpacity>
            </View>

            {/* Notifications List */}
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {mockNotifications.length > 0 ? (
                    mockNotifications.map(notification => (
                        <NotificationCard key={notification.id} notification={notification} />
                    ))
                ) : (
                    <View style={styles.emptyState}>
                        <Ionicons name="notifications-off-outline" size={64} color="#CCC" />
                        <Typography.Body style={styles.emptyText}>No notifications yet</Typography.Body>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    header: {
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
    headerCenter: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    headerTitle: {
        fontSize: 18,
        color: '#1A1A1A',
    },
    badge: {
        backgroundColor: '#2F8F46',
        borderRadius: 12,
        paddingHorizontal: 8,
        paddingVertical: 2,
        minWidth: 24,
        alignItems: 'center',
    },
    badgeText: {
        color: '#FFF',
        fontSize: 12,
        fontWeight: 'bold',
    },
    markAllButton: {
        padding: 4,
    },
    scrollView: {
        flex: 1,
    },
    notificationCard: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        padding: 16,
        marginHorizontal: 16,
        marginTop: 12,
        borderRadius: 12,
        gap: 12,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
    },
    unreadCard: {
        borderLeftWidth: 4,
        borderLeftColor: '#2F8F46',
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentContainer: {
        flex: 1,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#1A1A1A',
        flex: 1,
    },
    unreadDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#2F8F46',
        marginLeft: 8,
    },
    message: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
        marginBottom: 6,
    },
    time: {
        fontSize: 12,
        color: '#999',
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 80,
    },
    emptyText: {
        marginTop: 16,
        color: '#999',
    }
});
