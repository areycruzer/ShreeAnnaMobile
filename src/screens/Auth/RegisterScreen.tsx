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
import { useTranslation } from 'react-i18next';

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
    const { role, color, title, icon } = route.params || {};
    const { t } = useTranslation();
    const { register } = useAuthStore();

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

        if (!validateRequired(formData.name)) newErrors.name = t('register.errors.nameRequired');
        if (!validateRequired(formData.mobile)) newErrors.mobile = t('register.errors.mobileRequired');
        else if (!validatePhone(formData.mobile)) newErrors.mobile = t('register.errors.invalidMobile');

        if (formData.email && !validateEmail(formData.email)) newErrors.email = t('register.errors.invalidEmail');

        if (!validateRequired(formData.password)) newErrors.password = t('register.errors.passwordRequired');
        else if (!validateMinLength(formData.password, 8)) newErrors.password = t('register.errors.passwordLength');

        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = t('register.errors.passwordMismatch');

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep2 = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (role === 'farmer') {
            if (!validateRequired(formData.village || '')) newErrors.village = t('register.errors.villageRequired');
            if (!validateRequired(formData.district || '')) newErrors.district = t('register.errors.districtRequired');
            if (!validateRequired(formData.state || '')) newErrors.state = t('register.errors.stateRequired');
        } else if (role === 'shg') {
            if (!validateRequired(formData.groupName || '')) newErrors.groupName = t('register.errors.groupNameRequired');
            if (!validateRequired(formData.membersCount || '')) newErrors.membersCount = t('register.errors.membersCountRequired');
        } else if (role === 'buyer') {
            if (!validateRequired(formData.companyName || '')) newErrors.companyName = t('register.errors.companyNameRequired');
            if (!validateRequired(formData.businessType || '')) newErrors.businessType = t('register.errors.businessTypeRequired');
        } else if (role === 'admin') {
            if (!validateRequired(formData.department || '')) newErrors.department = t('register.errors.departmentRequired');
            if (!validateRequired(formData.designation || '')) newErrors.designation = t('register.errors.designationRequired');
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
                Alert.alert(t('register.errors.registrationFailed'), t('register.errors.phoneRegistered'));
            }
        } catch (error) {
            console.error('❌ Registration error:', error);
            Alert.alert(t('login.error'), t('register.errors.genericError'));
        } finally {
            setLoading(false);
        }
    };

    const renderStep1 = () => (
        <>
            <Input
                label={t('onboarding.name')}
                placeholder={t('editProfile.enterName')}
                value={formData.name}
                onChangeText={(val) => updateField('name', val)}
                error={errors.name}
                autoCapitalize="words"
                returnKeyType="next"
            />
            <Input
                label={t('login.mobileLabel')}
                placeholder={t('login.mobilePlaceholder')}
                value={formData.mobile}
                onChangeText={(val) => updateField('mobile', val)}
                error={errors.mobile}
                keyboardType="phone-pad"
                maxLength={10}
                returnKeyType="next"
            />
            <Input
                label={t('register.emailOptional')}
                placeholder={t('register.emailPlaceholder')}
                value={formData.email}
                onChangeText={(val) => updateField('email', val)}
                error={errors.email}
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="next"
            />
            <Input
                label={t('login.passwordLabel')}
                placeholder={t('register.passwordPlaceholder')}
                value={formData.password}
                onChangeText={(val) => updateField('password', val)}
                error={errors.password}
                secureTextEntry
                returnKeyType="next"
            />
            <Input
                label={t('register.confirmPassword')}
                placeholder={t('register.reEnterPassword')}
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
                    <Input label={t('onboarding.village') + ' *'} placeholder={t('editProfile.enterVillage')} value={formData.village || ''} onChangeText={(val) => updateField('village', val)} error={errors.village} returnKeyType="next" />
                    <Input label={t('profile.district') + ' *'} placeholder={t('editProfile.enterDistrict')} value={formData.district || ''} onChangeText={(val) => updateField('district', val)} error={errors.district} returnKeyType="next" />
                    <Input label={t('profile.state') + ' *'} placeholder={t('editProfile.enterState')} value={formData.state || ''} onChangeText={(val) => updateField('state', val)} error={errors.state} returnKeyType="next" />
                    <Input label={t('onboarding.fpoId')} placeholder={t('register.fpoPlaceholder')} value={formData.fpoId || ''} onChangeText={(val) => updateField('fpoId', val)} returnKeyType="next" />
                    <Input label={t('register.landSize')} placeholder={t('register.landSizePlaceholder')} value={formData.landSize || ''} onChangeText={(val) => updateField('landSize', val)} keyboardType="numeric" returnKeyType="done" />
                </>
            );
        } else if (role === 'shg') {
            return (
                <>
                    <Input label={t('register.groupName')} placeholder={t('register.groupNamePlaceholder')} value={formData.groupName || ''} onChangeText={(val) => updateField('groupName', val)} error={errors.groupName} returnKeyType="next" />
                    <Input label={t('register.membersCount')} placeholder={t('register.membersCountPlaceholder')} value={formData.membersCount || ''} onChangeText={(val) => updateField('membersCount', val)} error={errors.membersCount} keyboardType="numeric" returnKeyType="next" />
                    <Input label={t('register.registrationNumber')} placeholder={t('register.registrationNumberPlaceholder')} value={formData.registrationNumber || ''} onChangeText={(val) => updateField('registrationNumber', val)} returnKeyType="next" />
                    <Input label={t('profile.district') + ' *'} placeholder={t('editProfile.enterDistrict')} value={formData.district || ''} onChangeText={(val) => updateField('district', val)} returnKeyType="done" />
                </>
            );
        } else if (role === 'buyer') {
            return (
                <>
                    <Input label={t('register.companyName')} placeholder={t('register.companyNamePlaceholder')} value={formData.companyName || ''} onChangeText={(val) => updateField('companyName', val)} error={errors.companyName} returnKeyType="next" />
                    <Input label={t('register.gstin')} placeholder={t('register.gstinPlaceholder')} value={formData.gstin || ''} onChangeText={(val) => updateField('gstin', val)} returnKeyType="next" />
                    <Input label={t('register.businessType')} placeholder={t('register.businessTypePlaceholder')} value={formData.businessType || ''} onChangeText={(val) => updateField('businessType', val)} error={errors.businessType} returnKeyType="done" />
                </>
            );
        } else {
            return (
                <>
                    <Input label={t('register.department')} placeholder={t('register.departmentPlaceholder')} value={formData.department || ''} onChangeText={(val) => updateField('department', val)} error={errors.department} returnKeyType="next" />
                    <Input label={t('register.designation')} placeholder={t('register.designationPlaceholder')} value={formData.designation || ''} onChangeText={(val) => updateField('designation', val)} error={errors.designation} returnKeyType="next" />
                    <Input label={t('register.employeeId')} placeholder={t('register.employeeIdPlaceholder')} value={formData.employeeId || ''} onChangeText={(val) => updateField('employeeId', val)} returnKeyType="done" />
                </>
            );
        }
    };

    return (
        <ScreenWrapper style={styles.container}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
                    <TouchableOpacity onPress={() => step === 1 ? navigation.goBack() : setStep(1)} style={styles.backButton}>
                        <Typography.Body style={{ color: '#666' }}>{t('login.back')}</Typography.Body>
                    </TouchableOpacity>

                    <View style={styles.header}>
                        <View style={[styles.roleIcon, { backgroundColor: color }]}>
                            <Typography.Title style={{ fontSize: 40 }}>{icon}</Typography.Title>
                        </View>
                        <Typography.Title style={styles.title}>{t('register.registerAs')} {title}</Typography.Title>
                        <Typography.Caption style={styles.subtitle}>{t('register.step')} {step} {t('register.of')} 2</Typography.Caption>
                    </View>

                    <View style={styles.progressBar}>
                        <View style={[styles.progressFill, { width: `${(step / 2) * 100}%`, backgroundColor: color }]} />
                    </View>

                    <View style={styles.form}>
                        {step === 1 ? renderStep1() : renderStep2()}
                    </View>

                    <Button title={step === 1 ? t('register.next') : t('register.register')} onPress={handleNext} loading={loading} style={[styles.button, { backgroundColor: color }]} />

                    <TouchableOpacity style={styles.loginLink} onPress={() => navigation.navigate('Login', { role, color, title, icon })}>
                        <Typography.Body style={{ color: '#666' }}>{t('login.noAccount')} </Typography.Body>
                        <Typography.Body style={{ color, fontWeight: 'bold' }}>{t('login.loginButton')}</Typography.Body>
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
