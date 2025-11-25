import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, RefreshControl, Image } from 'react-native';
import { Typography } from '../../components/Typography';
import { theme } from '../../theme';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../../store/authStore';

const CategoryChip = ({ label, active, onPress }: { label: string, active?: boolean, onPress: () => void }) => (
    <TouchableOpacity
        style={[styles.chip, active && styles.activeChip]}
        onPress={onPress}
        activeOpacity={0.7}
    >
        <Typography.Caption style={[styles.chipText, active && styles.activeChipText]}>
            {label}
        </Typography.Caption>
    </TouchableOpacity>
);

const ProductCard = ({ name, farm, price, quantity, image, onPress }: any) => (
    <TouchableOpacity
        style={styles.productCard}
        onPress={onPress}
        activeOpacity={0.8}
    >
        <View style={styles.productImageContainer}>
            {image ? (
                <Image source={image} style={styles.productImage} resizeMode="cover" />
            ) : (
                <View style={styles.productImagePlaceholder}>
                    <Ionicons name="nutrition" size={32} color="#2F8F46" />
                </View>
            )}
        </View>
        <View style={styles.productInfo}>
            <Typography.Subtitle style={styles.productName}>{name}</Typography.Subtitle>
            <Typography.Caption style={styles.farmName}>{farm}</Typography.Caption>
            <View style={styles.priceRow}>
                <Typography.Body style={styles.price}>₹{price} <Typography.Caption>/ {quantity}</Typography.Caption></Typography.Body>
            </View>
            <Button
                title="View Details"
                onPress={onPress}
                style={styles.viewButton}
                textStyle={{ fontSize: 12 }}
                variant="secondary"
            />
        </View>
    </TouchableOpacity>
);

export const ConsumerDashboard = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const user = useAuthStore(state => state.user);
    const [activeCategory, setActiveCategory] = useState('All');
    const [refreshing, setRefreshing] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const categories = ['All', 'Millets', 'Flours', 'Snacks', 'Beverages', 'Organic'];

    const products = [
        {
            name: 'Organic Ragi Flour',
            farm: 'Karnataka Millet FPO',
            price: 45,
            quantity: 'kg',
            farmer: 'Ramesh Kumar',
            location: 'Karnataka',
            available: '500 kg',
            image: require('../../../assets/products/ragi_flour.png')
        },
        {
            name: 'Millet Cookies Box',
            farm: 'Green Valley Farms',
            price: 120,
            quantity: 'pack',
            farmer: 'Green Earth FPO',
            location: 'Uttarakhand',
            available: '200 packs',
            image: require('../../../assets/products/millet_cookies.png')
        },
        {
            name: 'Roasted Jowar Puffs',
            farm: 'Healthy Foods Ltd',
            price: 85,
            quantity: '150g',
            farmer: 'Healthy Foods',
            location: 'Gujarat',
            available: '500 packs',
            image: require('../../../assets/products/jowar_puffs.png')
        },
        {
            name: 'Premium Bajra Grains',
            farm: 'Rajasthan Farmers Co-op',
            price: 35,
            quantity: 'kg',
            farmer: 'Suresh Singh',
            location: 'Rajasthan',
            available: '1000 kg',
            image: require('../../../assets/products/bajra_grains.png')
        },
        {
            name: 'Foxtail Millet Rice',
            farm: 'Andhra Millets',
            price: 60,
            quantity: 'kg',
            farmer: 'Krishna Reddy',
            location: 'Andhra Pradesh',
            available: '300 kg',
            image: null
        }
    ];

    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()) || product.farm.toLowerCase().includes(searchQuery.toLowerCase()));

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 1500);
    };

    return (
        <ScrollView
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#2F8F46']} tintColor="#2F8F46" />}
        >
            {/* Welcome Section */}
            <View style={styles.welcomeSection}>
                <View>
                    <Typography.Caption style={{ color: '#666', marginBottom: 4 }}>Welcome back,</Typography.Caption>
                    <Typography.Title style={{ fontSize: 24, color: '#1A1A1A' }}>{user?.name || 'Consumer'}</Typography.Title>
                    <Typography.Caption style={{ color: '#2F8F46', marginTop: 4 }}>
                        <Ionicons name="cart" size={14} color="#2F8F46" /> {user?.role?.toUpperCase() || 'BUYER'}
                    </Typography.Caption>
                </View>
                <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate('Profile')}>
                    <View style={styles.avatarCircle}>
                        <Typography.Title style={{ color: '#2F8F46', fontSize: 24 }}>
                            {user?.name?.charAt(0).toUpperCase() || 'C'}
                        </Typography.Title>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={styles.searchContainer}>
                <Input placeholder="Search millets or products..." style={styles.searchInput} value={searchQuery} onChangeText={setSearchQuery} autoCapitalize="none" returnKeyType="search" />
            </View>

            <Typography.Subtitle style={styles.sectionTitle}>Categories</Typography.Subtitle>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesRow}>
                {categories.map((cat, index) => (<CategoryChip key={index} label={cat} active={activeCategory === cat} onPress={() => setActiveCategory(cat)} />))}
            </ScrollView>

            <Typography.Subtitle style={styles.sectionTitle}>Featured Products</Typography.Subtitle>
            <Typography.Caption style={styles.sectionSubtitle}>{filteredProducts.length} products available</Typography.Caption>

            <View style={styles.grid}>
                {filteredProducts.map((product, index) => (<ProductCard key={index} {...product} onPress={() => navigation.navigate('ProductDetails', { product })} />))}
            </View>

            {filteredProducts.length === 0 && (
                <View style={styles.emptyState}>
                    <Ionicons name="search" size={48} color="#CCC" />
                    <Typography.Body style={styles.emptyText}>No products found</Typography.Body>
                    <Typography.Caption style={styles.emptySubtext}>Try adjusting your search</Typography.Caption>
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { padding: 16, paddingTop: 0 },
    welcomeSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        marginBottom: 8,
    },
    profileButton: {
        padding: 4,
    },
    avatarCircle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#E8F5E9',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#2F8F46',
    },
    searchContainer: { marginBottom: 24 },
    searchInput: { backgroundColor: '#F5F5F5', borderWidth: 0 },
    sectionTitle: { fontSize: 18, marginBottom: 12, color: '#1A1A1A' },
    sectionSubtitle: { color: '#666', marginBottom: 16 },
    categoriesRow: { paddingRight: 16, gap: 12, marginBottom: 24 },
    chip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#F5F5F5', borderWidth: 1, borderColor: '#E0E0E0' },
    activeChip: { backgroundColor: '#2F8F46', borderColor: '#2F8F46' },
    chipText: { color: '#666', fontWeight: '500' },
    activeChipText: { color: '#FFF' },
    grid: { gap: 16 },
    productCard: { backgroundColor: '#FFF', borderRadius: 12, padding: 12, flexDirection: 'row', gap: 16, elevation: 1, borderWidth: 1, borderColor: '#F0F0F0' },
    productImageContainer: { width: 80, height: 80, borderRadius: 8, overflow: 'hidden' },
    productImage: { width: '100%', height: '100%' },
    productImagePlaceholder: { width: '100%', height: '100%', backgroundColor: '#F9F9F9', justifyContent: 'center', alignItems: 'center' },
    productInfo: { flex: 1 },
    productName: { fontSize: 16, marginBottom: 4 },
    farmName: { color: '#888', fontSize: 12, marginBottom: 8 },
    priceRow: { flexDirection: 'row', alignItems: 'baseline', marginBottom: 8 },
    price: { fontWeight: 'bold', color: '#2F8F46' },
    viewButton: { paddingVertical: 6, minHeight: 36, alignSelf: 'flex-start' },
    emptyState: { alignItems: 'center', justifyContent: 'center', paddingVertical: 48 },
    emptyText: { marginTop: 16, fontSize: 16, fontWeight: '500', color: '#666' },
    emptySubtext: { marginTop: 8, color: '#999' }
});
