import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert, TouchableOpacity, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Typography } from '../../components/Typography';
import { theme } from '../../theme';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { ScreenWrapper } from '../../components/ScreenWrapper';
import { validatePhone, validateEmail, validatePincode, validateRequired, validateNumber } from '../../utils/validation';

export const PlaceOrderScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const route = useRoute<any>();
    const { product } = route.params || {};

    // Form state
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [quantity, setQuantity] = useState('50');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [pincode, setPincode] = useState('');
    const [loading, setLoading] = useState(false);

    // Error state
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!validateRequired(name)) {
            newErrors.name = 'Name is required';
        }

        if (!validateRequired(phone)) {
            newErrors.phone = 'Phone number is required';
        } else if (!validatePhone(phone)) {
            newErrors.phone = 'Please enter a valid 10-digit phone number';
        }

        if (email && !validateEmail(email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!validateRequired(quantity)) {
            newErrors.quantity = 'Quantity is required';
        } else if (!validateNumber(quantity)) {
            newErrors.quantity = 'Please enter a valid quantity';
        } else if (Number(quantity) < 50) {
            newErrors.quantity = 'Minimum order is 50 kg';
        }

        if (!validateRequired(address)) {
            newErrors.address = 'Address is required';
        }

        if (!validateRequired(city)) {
            newErrors.city = 'City is required';
        }

        if (!validateRequired(state)) {
            newErrors.state = 'State is required';
        }

        if (!validateRequired(pincode)) {
            newErrors.pincode = 'Pincode is required';
        } else if (!validatePincode(pincode)) {
            newErrors.pincode = 'Please enter a valid 6-digit pincode';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handlePlaceOrder = async () => {
        // Dismiss keyboard
        Keyboard.dismiss();

        if (!validateForm()) {
            Alert.alert('Validation Error', 'Please fix the errors in the form');
            return;
        }

        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            Alert.alert(
                'Order Placed Successfully! 🎉',
                `Your purchase request for ${quantity}kg of ${product?.name || 'product'} has been sent to the farmer. They will contact you at ${phone} shortly.`,
                [{ text: 'OK', onPress: () => navigation.navigate('Home') }]
            );
        }, 1500);
    };

    const totalAmount = product ? product.price * parseInt(quantity || '0') : 0;

    return (
        <ScreenWrapper>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView
                    contentContainerStyle={styles.container}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                            <Typography.Body>← Back</Typography.Body>
                        </TouchableOpacity>
                        <Typography.Title style={styles.title}>Place Order</Typography.Title>
                    </View>

                    {/* Order Summary */}
                    <View style={styles.section}>
                        <Typography.Subtitle style={styles.sectionTitle}>Order Summary</Typography.Subtitle>
                        <View style={styles.summaryCard}>
                            <View style={styles.row}>
                                <Typography.Body>Product:</Typography.Body>
                                <Typography.Body style={{ fontWeight: 'bold' }}>{product?.name || 'Millet'}</Typography.Body>
                            </View>
                            <View style={styles.row}>
                                <Typography.Body>Price:</Typography.Body>
                                <Typography.Body>₹{product?.price || 0}/{product?.quantity || 'kg'}</Typography.Body>
                            </View>
                            <View style={[styles.row, styles.totalRow]}>
                                <Typography.Subtitle>Total Amount:</Typography.Subtitle>
                                <Typography.Subtitle style={{ color: theme.colors.primary }}>₹{totalAmount}</Typography.Subtitle>
                            </View>
                        </View>
                    </View>

                    {/* Contact Information */}
                    <View style={styles.section}>
                        <Typography.Subtitle style={styles.sectionTitle}>Contact Information</Typography.Subtitle>
                        <Input
                            label="Full Name *"
                            placeholder="Enter your full name"
                            value={name}
                            onChangeText={(text) => {
                                setName(text);
                                if (errors.name) setErrors({ ...errors, name: '' });
                            }}
                            error={errors.name}
                            autoCapitalize="words"
                            returnKeyType="next"
                        />
                        <Input
                            label="Phone Number *"
                            placeholder="+91 XXXXX XXXXX"
                            keyboardType="phone-pad"
                            value={phone}
                            onChangeText={(text) => {
                                setPhone(text);
                                if (errors.phone) setErrors({ ...errors, phone: '' });
                            }}
                            error={errors.phone}
                            maxLength={10}
                            returnKeyType="next"
                        />
                        <Input
                            label="Email Address (Optional)"
                            placeholder="your@email.com"
                            keyboardType="email-address"
                            value={email}
                            onChangeText={(text) => {
                                setEmail(text);
                                if (errors.email) setErrors({ ...errors, email: '' });
                            }}
                            error={errors.email}
                            autoCapitalize="none"
                            returnKeyType="next"
                        />
                    </View>

                    {/* Order Details */}
                    <View style={styles.section}>
                        <Typography.Subtitle style={styles.sectionTitle}>Order Details</Typography.Subtitle>
                        <Input
                            label="Quantity (kg) *"
                            value={quantity}
                            onChangeText={(text) => {
                                setQuantity(text);
                                if (errors.quantity) setErrors({ ...errors, quantity: '' });
                            }}
                            keyboardType="numeric"
                            error={errors.quantity}
                            returnKeyType="next"
                        />
                        <Typography.Caption style={styles.hint}>
                            Minimum Order: 50 kg
                        </Typography.Caption>
                    </View>

                    {/* Delivery Address */}
                    <View style={styles.section}>
                        <Typography.Subtitle style={styles.sectionTitle}>Delivery Address</Typography.Subtitle>
                        <Input
                            label="Address *"
                            placeholder="Street address, building, landmark"
                            multiline
                            numberOfLines={3}
                            value={address}
                            onChangeText={(text) => {
                                setAddress(text);
                                if (errors.address) setErrors({ ...errors, address: '' });
                            }}
                            error={errors.address}
                            returnKeyType="next"
                            style={{ minHeight: 80 }}
                        />
                        <View style={styles.rowInput}>
                            <View style={{ flex: 1, marginRight: 8 }}>
                                <Input
                                    label="City *"
                                    placeholder="City"
                                    value={city}
                                    onChangeText={(text) => {
                                        setCity(text);
                                        if (errors.city) setErrors({ ...errors, city: '' });
                                    }}
                                    error={errors.city}
                                    autoCapitalize="words"
                                    returnKeyType="next"
                                />
                            </View>
                            <View style={{ flex: 1, marginLeft: 8 }}>
                                <Input
                                    label="State *"
                                    placeholder="State"
                                    value={state}
                                    onChangeText={(text) => {
                                        setState(text);
                                        if (errors.state) setErrors({ ...errors, state: '' });
                                    }}
                                    error={errors.state}
                                    autoCapitalize="words"
                                    returnKeyType="next"
                                />
                            </View>
                        </View>
                        <Input
                            label="Pincode *"
                            placeholder="XXXXXX"
                            keyboardType="numeric"
                            value={pincode}
                            onChangeText={(text) => {
                                setPincode(text);
                                if (errors.pincode) setErrors({ ...errors, pincode: '' });
                            }}
                            error={errors.pincode}
                            maxLength={6}
                            returnKeyType="done"
                        />
                    </View>

                    <Button
                        title="Place Order"
                        onPress={handlePlaceOrder}
                        loading={loading}
                        style={styles.button}
                    />
                </ScrollView>
            </KeyboardAvoidingView>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        paddingBottom: 32,
    },
    header: {
        marginBottom: 24,
    },
    backButton: {
        paddingVertical: 8,
        marginBottom: 8,
    },
    title: {
        fontSize: 28,
        color: '#1A1A1A',
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        marginBottom: 16,
        color: '#1A1A1A',
    },
    summaryCard: {
        backgroundColor: '#FFF',
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    totalRow: {
        marginTop: 8,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#EEE',
    },
    rowInput: {
        flexDirection: 'row',
    },
    hint: {
        color: '#666',
        marginTop: -12,
        marginBottom: 8,
    },
    button: {
        marginTop: 8,
        marginBottom: 16,
    }
});
