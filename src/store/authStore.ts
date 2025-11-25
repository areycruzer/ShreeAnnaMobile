import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
    user_id: string;
    name: string;
    phone: string;
    email?: string;
    role: 'farmer' | 'fpo' | 'buyer' | 'shg' | 'admin';
    village?: string;
    district?: string;
    state?: string;
    language?: string;
    fpo_id?: string;
    createdAt?: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    login: (phone: string, password: string, requiredRole?: string) => Promise<boolean>;
    register: (userData: Partial<User>, password: string) => Promise<boolean>;
    logout: () => Promise<void>;
    restoreSession: () => Promise<void>;
    updateUser: (user: User) => void;
}

const USERS_KEY = '@shree_anna_users';

export const useAuthStore = create<AuthState>((set, get) => ({
    user: null,
    token: null,
    isLoading: true,

    login: async (phone: string, password: string, requiredRole?: string) => {
        console.log('🔐 Login attempt for:', phone, 'Role:', requiredRole);
        try {
            // Get all registered users from AsyncStorage
            const usersJson = await AsyncStorage.getItem(USERS_KEY);
            const users: Record<string, { user: User; password: string }> = usersJson ? JSON.parse(usersJson) : {};

            // Check if user exists and password matches
            const userEntry = users[phone];
            if (userEntry && userEntry.password === password) {
                const mockUser = userEntry.user;

                // Verify role if required
                if (requiredRole && mockUser.role !== requiredRole) {
                    console.log(`❌ Login failed: Role mismatch. Expected ${requiredRole}, got ${mockUser.role}`);
                    return false; // Or throw specific error to handle in UI
                }

                const token = `token-${Date.now()}`;

                set({ user: mockUser, token });
                await SecureStore.setItemAsync('user_session', JSON.stringify(mockUser));
                await SecureStore.setItemAsync('auth_token', token);

                console.log('✅ Login successful:', mockUser.name);
                return true;
            }

            console.log('❌ Login failed: Invalid credentials');
            return false;
        } catch (error) {
            console.error('❌ Login error:', error);
            return false;
        }
    },

    register: async (userData: Partial<User>, password: string) => {
        console.log('📝 Registration attempt for:', userData.phone);
        try {
            // Get existing users
            const usersJson = await AsyncStorage.getItem(USERS_KEY);
            const users: Record<string, { user: User; password: string }> = usersJson ? JSON.parse(usersJson) : {};

            // Check if user already exists
            if (users[userData.phone!]) {
                console.log('❌ Registration failed: User already exists');
                return false;
            }

            // Create new user
            const newUser: User = {
                user_id: `user-${Date.now()}`,
                name: userData.name!,
                phone: userData.phone!,
                email: userData.email,
                role: userData.role as User['role'],
                village: userData.village,
                district: userData.district,
                state: userData.state,
                language: 'en',
                fpo_id: userData.fpo_id,
                createdAt: new Date().toISOString()
            };

            // Save user
            users[userData.phone!] = { user: newUser, password };
            await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));

            console.log('✅ Registration successful:', newUser.name);
            return true;
        } catch (error) {
            console.error('❌ Registration error:', error);
            return false;
        }
    },

    logout: async () => {
        console.log('🚪 Logging out');
        await SecureStore.deleteItemAsync('user_session');
        await SecureStore.deleteItemAsync('auth_token');
        set({ user: null, token: null });
    },

    restoreSession: async () => {
        try {
            const session = await SecureStore.getItemAsync('user_session');
            const token = await SecureStore.getItemAsync('auth_token');
            if (session && token) {
                set({ user: JSON.parse(session), token });
                console.log('✅ Session restored');
            }
        } catch (e) {
            console.error('❌ Failed to restore session', e);
        } finally {
            set({ isLoading: false });
        }
    },

    updateUser: (user: User) => {
        set({ user });
        SecureStore.setItemAsync('user_session', JSON.stringify(user));
    }
}));
