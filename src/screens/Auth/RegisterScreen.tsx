import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Typography } from '../../components/Typography';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { ScreenWrapper } from '../../components/ScreenWrapper';
import { validatePhone, validateEmail, validateRequired, validateMinLength } from '../../utils/validation';
import { useAuthStore } from '../../store/authStore';

interface FormData {
    name: string;
    mobile: string;
    email: string;
    password: string;
    confirmPassword: string;
    village?: string;
    district?: string;
    state?: string;
    fpoId?: string;
    landSize?: string;
    groupName?: string;
    membersCount?: string;
    registrationNumber?: string;
    companyName?: string;
    gstin?: string;
    businessType?: string;
    department?: string;
    designation?: string;
    employeeId?: string;
}

export const RegisterScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const route = useRoute<any>();
    const { role = 'farmer', color = '#2F8F46', title = 'Farmer / FPO', icon = '🌾' } = route.params || {};
    const register = useAuthStore(state => state.register);

    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<FormData>({
        name: '',
        mobile: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);

    const updateField = (field: keyof FormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const validateStep1 = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!validateRequired(formData.name)) newErrors.name = 'Name is required';
        if (!validateRequired(formData.mobile)) newErrors.mobile = 'Mobile number is required';
        else if (!validatePhone(formData.mobile)) newErrors.mobile = 'Invalid mobile number';

        if (formData.email && !validateEmail(formData.email)) newErrors.email = 'Invalid email address';

        if (!validateRequired(formData.password)) newErrors.password = 'Password is required';
        else if (!validateMinLength(formData.password, 8)) newErrors.password = 'Password must be at least 8 characters';

        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep2 = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (role === 'farmer') {
            if (!validateRequired(formData.village || '')) newErrors.village = 'Village is required';
            if (!validateRequired(formData.district || '')) newErrors.district = 'District is required';
            if (!validateRequired(formData.state || '')) newErrors.state = 'State is required';
        } else if (role === 'shg') {
            if (!validateRequired(formData.groupName || '')) newErrors.groupName = 'Group name is required';
            if (!validateRequired(formData.membersCount || '')) newErrors.membersCount = 'Members count is required';
        } else if (role === 'buyer') {
            if (!validateRequired(formData.companyName || '')) newErrors.companyName = 'Company name is required';
            if (!validateRequired(formData.businessType || '')) newErrors.businessType = 'Business type is required';
        } else if (role === 'admin') {
            if (!validateRequired(formData.department || '')) newErrors.department = 'Department is required';
            if (!validateRequired(formData.designation || '')) newErrors.designation = 'Designation is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (step === 1 && validateStep1()) {
            setStep(2);
        } else if (step === 2 && validateStep2()) {
            handleSubmit();
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const userData = {
                name: formData.name,
                phone: formData.mobile,
                email: formData.email,
                role: role,
                village: formData.village,
                district: formData.district,
                state: formData.state,
                fpo_id: formData.fpoId
            };

            const success = await register(userData, formData.password);
            if (success) {
                console.log('✅ Registration successful');
                navigation.navigate('RegistrationSuccess', { role, mobile: formData.mobile });
            } else {
                Alert.alert('Registration Failed', 'This phone number is already registered. Please login instead.');
            }
        } catch (error) {
            console.error('❌ Registration error:', error);
            Alert.alert('Error', 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const renderStep1 = () => (
        <>
            <Input
                label="Full Name *"
                placeholder="Enter your full name"
                value={formData.name}
                onChangeText={(val) => updateField('name', val)}
                error={errors.name}
                autoCapitalize="words"
                returnKeyType="next"
            />
            <Input
                label="Mobile Number *"
                placeholder="10-digit mobile number"
                value={formData.mobile}
                onChangeText={(val) => updateField('mobile', val)}
                error={errors.mobile}
                keyboardType="phone-pad"
                maxLength={10}
                returnKeyType="next"
            />
            <Input
                label="Email (Optional)"
                placeholder="your@email.com"
                value={formData.email}
                onChangeText={(val) => updateField('email', val)}
                error={errors.email}
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="next"
            />
            <Input
                label="Password *"
                placeholder="Minimum 8 characters"
                value={formData.password}
                onChangeText={(val) => updateField('password', val)}
                error={errors.password}
                secureTextEntry
                returnKeyType="next"
            />
            <Input
                label="Confirm Password *"
                placeholder="Re-enter password"
                value={formData.confirmPassword}
                onChangeText={(val) => updateField('confirmPassword', val)}
                error={errors.confirmPassword}
                secureTextEntry
                returnKeyType="done"
            />
        </>
    );

    const renderStep2 = () => {
        if (role === 'farmer') {
            return (
                <>
                    <Input label="Village *" placeholder="Your village name" value={formData.village || ''} onChangeText={(val) => updateField('village', val)} error={errors.village} returnKeyType="next" />
                    <Input label="District *" placeholder="Your district" value={formData.district || ''} onChangeText={(val) => updateField('district', val)} error={errors.district} returnKeyType="next" />
                    <Input label="State *" placeholder="Your state" value={formData.state || ''} onChangeText={(val) => updateField('state', val)} error={errors.state} returnKeyType="next" />
                    <Input label="FPO ID (Optional)" placeholder="If you're part of an FPO" value={formData.fpoId || ''} onChangeText={(val) => updateField('fpoId', val)} returnKeyType="next" />
                    <Input label="Land Size (Optional)" placeholder="In acres" value={formData.landSize || ''} onChangeText={(val) => updateField('landSize', val)} keyboardType="numeric" returnKeyType="done" />
                </>
            );
        } else if (role === 'shg') {
            return (
                <>
                    <Input label="Group Name *" placeholder="SHG name" value={formData.groupName || ''} onChangeText={(val) => updateField('groupName', val)} error={errors.groupName} returnKeyType="next" />
                    <Input label="Number of Members *" placeholder="Total members" value={formData.membersCount || ''} onChangeText={(val) => updateField('membersCount', val)} error={errors.membersCount} keyboardType="numeric" returnKeyType="next" />
                    <Input label="Registration Number (Optional)" placeholder="Official registration no." value={formData.registrationNumber || ''} onChangeText={(val) => updateField('registrationNumber', val)} returnKeyType="next" />
                    <Input label="District *" placeholder="Your district" value={formData.district || ''} onChangeText={(val) => updateField('district', val)} returnKeyType="done" />
                </>
            );
        } else if (role === 'buyer') {
            return (
                <>
                    <Input label="Company Name *" placeholder="Business/Company name" value={formData.companyName || ''} onChangeText={(val) => updateField('companyName', val)} error={errors.companyName} returnKeyType="next" />
                    <Input label="GSTIN (Optional)" placeholder="GST identification number" value={formData.gstin || ''} onChangeText={(val) => updateField('gstin', val)} returnKeyType="next" />
                    <Input label="Business Type *" placeholder="e.g., Processor, Trader" value={formData.businessType || ''} onChangeText={(val) => updateField('businessType', val)} error={errors.businessType} returnKeyType="done" />
                </>
            );
        } else {
            return (
                <>
                    <Input label="Department *" placeholder="Your department" value={formData.department || ''} onChangeText={(val) => updateField('department', val)} error={errors.department} returnKeyType="next" />
                    <Input label="Designation *" placeholder="Your position" value={formData.designation || ''} onChangeText={(val) => updateField('designation', val)} error={errors.designation} returnKeyType="next" />
                    <Input label="Employee ID (Optional)" placeholder="Official employee ID" value={formData.employeeId || ''} onChangeText={(val) => updateField('employeeId', val)} returnKeyType="done" />
                </>
            );
        }
    };

    return (
        <ScreenWrapper style={styles.container}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
                    <TouchableOpacity onPress={() => step === 1 ? navigation.goBack() : setStep(1)} style={styles.backButton}>
                        <Typography.Body style={{ color: '#666' }}>← Back</Typography.Body>
                    </TouchableOpacity>

                    <View style={styles.header}>
                        <View style={[styles.roleIcon, { backgroundColor: color }]}>
                            <Typography.Title style={{ fontSize: 40 }}>{icon}</Typography.Title>
                        </View>
                        <Typography.Title style={styles.title}>Register as {title}</Typography.Title>
                        <Typography.Caption style={styles.subtitle}>Step {step} of 2</Typography.Caption>
                    </View>

                    <View style={styles.progressBar}>
                        <View style={[styles.progressFill, { width: `${(step / 2) * 100}%`, backgroundColor: color }]} />
                    </View>

                    <View style={styles.form}>
                        {step === 1 ? renderStep1() : renderStep2()}
                    </View>

                    <Button title={step === 1 ? 'Next' : 'Register'} onPress={handleNext} loading={loading} style={[styles.button, { backgroundColor: color }]} />

                    <TouchableOpacity style={styles.loginLink} onPress={() => navigation.navigate('Login', { role, color, title, icon })}>
                        <Typography.Body style={{ color: '#666' }}>Already have an account? </Typography.Body>
                        <Typography.Body style={{ color, fontWeight: 'bold' }}>Login</Typography.Body>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFF' },
    scrollContent: { flexGrow: 1, padding: 24 },
    backButton: { marginBottom: 24, paddingVertical: 8 },
    header: { alignItems: 'center', marginBottom: 32 },
    roleIcon: { width: 100, height: 100, borderRadius: 24, justifyContent: 'center', alignItems: 'center', marginBottom: 24, elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8 },
    title: { fontSize: 24, fontWeight: 'bold', color: '#1A1A1A', marginBottom: 8, textAlign: 'center' },
    subtitle: { fontSize: 14, color: '#666' },
    progressBar: { height: 4, backgroundColor: '#E8E8E8', borderRadius: 2, marginBottom: 32, overflow: 'hidden' },
    progressFill: { height: '100%', borderRadius: 2 },
    form: { marginBottom: 24 },
    button: { marginBottom: 16 },
    loginLink: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }
});
