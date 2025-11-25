import React from 'react';
import { View, StyleSheet, StatusBar, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { Typography } from '../../components/Typography';
import { useAuthStore } from '../../store/authStore';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { theme } from '../../theme';
import { FarmerDashboard } from './FarmerDashboard';
import { ConsumerDashboard } from './ConsumerDashboard';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Image } from 'react-native';
import { AdminDashboard } from './AdminDashboard';

export const HomeScreen = () => {
    const { t } = useTranslation();
    const user = useAuthStore(state => state.user);
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <StatusBar backgroundColor="#FFF" barStyle="dark-content" />

            {/* Common Header */}
            <View style={styles.header}>
                <View style={styles.logoRow}>
                    <View style={styles.logoContainer}>
                        <Image
                            source={require('../../../assets/logo.png')}
                            style={styles.logoImage}
                            resizeMode="contain"
                        />
                        <View>
                            <Typography.Title style={styles.appName}>Shree Anna</Typography.Title>
                            <Typography.Caption style={styles.appSubtitle}>Platform</Typography.Caption>
                        </View>
                    </View>
                    <View style={styles.headerActions}>
                        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Notifications')}>
                            <Ionicons name="notifications-outline" size={24} color="#666" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Profile')}>
                            <Ionicons name="person-outline" size={24} color="#666" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconButton} onPress={() => Alert.alert('Menu', 'Coming soon!')}>
                            <MaterialIcons name="menu" size={24} color="#666" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* Dashboard Content */}
            {(() => {
                switch (user?.role) {
                    case 'farmer':
                    case 'fpo':
                    case 'shg': // SHGs are sellers, so they get the Farmer Dashboard
                        return <FarmerDashboard />;
                    case 'admin': // Government Officials get the Admin Dashboard
                        return <AdminDashboard />;
                    default: // Buyers and others get the Consumer Dashboard
                        return <ConsumerDashboard />;
                }
            })()}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    header: {
        backgroundColor: '#FFF',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    logoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    logoImage: {
        width: 36,
        height: 36,
    },
    appName: {
        fontSize: 16,
        color: '#2F8F46',
        lineHeight: 18,
        fontWeight: 'bold',
    },
    appSubtitle: {
        color: '#666',
        fontSize: 11,
    },
    headerActions: {
        flexDirection: 'row',
        gap: 12,
        alignItems: 'center',
    },
    iconButton: {
        padding: 4,
    }
});


