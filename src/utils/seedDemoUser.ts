import AsyncStorage from '@react-native-async-storage/async-storage';

const USERS_KEY = '@shree_anna_users';

export const seedDemoUser = async () => {
    try {
        const usersJson = await AsyncStorage.getItem(USERS_KEY);
        const users: Record<string, { user: any; password: string }> = usersJson ? JSON.parse(usersJson) : {};

        const demoUsers = [
            {
                phone: '1234567890',
                password: 'demo1234',
                user: {
                    user_id: 'demo-farmer-001',
                    name: 'Ramesh Kumar',
                    phone: '1234567890',
                    email: 'farmer@shreeanna.com',
                    role: 'farmer',
                    village: 'Sonpur',
                    district: 'Nashik',
                    state: 'Maharashtra',
                    language: 'en',
                    createdAt: '2024-01-01T00:00:00.000Z'
                }
            },
            {
                phone: '1234567891',
                password: 'demo1234',
                user: {
                    user_id: 'demo-fpo-001',
                    name: 'Sahyadri FPO',
                    phone: '1234567891',
                    email: 'fpo@shreeanna.com',
                    role: 'fpo',
                    fpo_id: 'FPO-MH-001',
                    district: 'Pune',
                    state: 'Maharashtra',
                    language: 'en',
                    createdAt: '2024-01-01T00:00:00.000Z'
                }
            },
            {
                phone: '1234567892',
                password: 'demo1234',
                user: {
                    user_id: 'demo-shg-001',
                    name: 'Mahila Shakti SHG',
                    phone: '1234567892',
                    email: 'shg@shreeanna.com',
                    role: 'shg',
                    district: 'Nagpur',
                    state: 'Maharashtra',
                    language: 'en',
                    createdAt: '2024-01-01T00:00:00.000Z'
                }
            },
            {
                phone: '1234567893',
                password: 'demo1234',
                user: {
                    user_id: 'demo-buyer-001',
                    name: 'Urban Organics',
                    phone: '1234567893',
                    email: 'buyer@shreeanna.com',
                    role: 'buyer',
                    district: 'Mumbai',
                    state: 'Maharashtra',
                    language: 'en',
                    createdAt: '2024-01-01T00:00:00.000Z'
                }
            },
            {
                phone: '1234567894',
                password: 'demo1234',
                user: {
                    user_id: 'demo-admin-001',
                    name: 'District Officer',
                    phone: '1234567894',
                    email: 'admin@gov.in',
                    role: 'admin',
                    district: 'Delhi',
                    state: 'Delhi',
                    language: 'en',
                    createdAt: '2024-01-01T00:00:00.000Z'
                }
            }
        ];

        let updated = false;
        for (const demo of demoUsers) {
            if (!users[demo.phone]) {
                users[demo.phone] = { user: demo.user, password: demo.password };
                updated = true;
                console.log(`🌱 Seeded demo ${demo.user.role}: ${demo.phone}`);
            }
        }

        if (updated) {
            await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
            console.log('✅ All demo users seeded successfully!');
        }
    } catch (error) {
        console.error('❌ Failed to seed demo users:', error);
    }
};
