import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuthStore } from '../store/authStore';
import { LoginScreen } from '../screens/Auth/LoginScreen';
import { RoleSelectionScreen } from '../screens/Auth/RoleSelectionScreen';
import { ProfileScreen } from '../screens/Auth/ProfileScreen';
import { RegisterScreen } from '../screens/Auth/RegisterScreen';
import { RegistrationSuccessScreen } from '../screens/Auth/RegistrationSuccessScreen';
import { HomeScreen } from '../screens/Home/HomeScreen';
import { BatchFormScreen } from '../screens/Batches/BatchFormScreen';
import { MyBatchesScreen } from '../screens/Batches/MyBatchesScreen';
import { OrdersScreen } from '../screens/Orders/OrdersScreen';
import { TraceScreen } from '../screens/Trace/TraceScreen';
import { HelpScreen } from '../screens/Home/HelpScreen';
import { ComponentGalleryScreen } from '../screens/Settings/ComponentGalleryScreen';
import { ProductDetailsScreen } from '../screens/Home/ProductDetailsScreen';
import { PlaceOrderScreen } from '../screens/Home/PlaceOrderScreen';
import { NotificationsScreen } from '../screens/Notifications/NotificationsScreen';
import { EditProfileScreen } from '../screens/Auth/EditProfileScreen';
import { ActivityIndicator, View } from 'react-native';
import { seedDemoUser } from '../utils/seedDemoUser';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
    const { user, token, isLoading, restoreSession } = useAuthStore();

    useEffect(() => {
        const initializeApp = async () => {
            await seedDemoUser(); // Seed demo user first
            await restoreSession(); // Then restore session
        };
        initializeApp();
    }, []);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#2F8F46" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {!token ? (
                    <>
                        <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
                        <Stack.Screen name="Login" component={LoginScreen} />
                        <Stack.Screen name="Register" component={RegisterScreen} />
                        <Stack.Screen name="RegistrationSuccess" component={RegistrationSuccessScreen} />
                    </>
                ) : (
                    <>
                        <Stack.Screen name="Home" component={HomeScreen} />
                        <Stack.Screen name="Profile" component={ProfileScreen} />
                        <Stack.Screen name="BatchForm" component={BatchFormScreen} />
                        <Stack.Screen name="MyBatches" component={MyBatchesScreen} />
                        <Stack.Screen name="Orders" component={OrdersScreen} />
                        <Stack.Screen name="Trace" component={TraceScreen} />
                        <Stack.Screen name="Help" component={HelpScreen} />
                        <Stack.Screen name="ComponentGallery" component={ComponentGalleryScreen} />
                        <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
                        <Stack.Screen name="PlaceOrder" component={PlaceOrderScreen} />
                        <Stack.Screen name="Notifications" component={NotificationsScreen} />
                        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};
