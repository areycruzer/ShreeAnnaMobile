import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { Typography } from '../../components/Typography';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { useAuthStore } from '../../store/authStore';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export const EditProfileScreen = () => {
    const { t } = useTranslation();
    const navigation = useNavigation<any>();
    const user = useAuthStore(state => state.user);
    const updateUser = useAuthStore(state => state.updateUser);

    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [village, setVillage] = useState(user?.village || '');
    const [district, setDistrict] = useState(user?.district || '');
    const [state, setState] = useState(user?.state || '');
    const [fpoId, setFpoId] = useState(user?.fpo_id || '');
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        if (!name.trim()) {
            Alert.alert(t('login.error'), t('editProfile.nameRequired'));
            return;
        }

        setLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            const updatedUser = {
                ...user!,
                name,
                email,
                village,
                district,
                state,
                fpo_id: fpoId
            };

            updateUser(updatedUser);
            Alert.alert(t('batchForm.uploadSuccess'), t('onboarding.profileUpdated'), [
                { text: t('buttons.ok'), onPress: () => navigation.goBack() }
            ]);
        } catch (error) {
            Alert.alert(t('login.error'), t('editProfile.updateFailed'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Ionicons name="close" size={24} color="#1A1A1A" />
                    </TouchableOpacity>
                    <Typography.Title style={styles.headerTitle}>{t('profile.editProfile')}</Typography.Title>
                    <TouchableOpacity onPress={handleSave} disabled={loading}>
                        <Typography.Body style={{ color: '#2F8F46', fontWeight: 'bold' }}>{t('editProfile.save')}</Typography.Body>
                    </TouchableOpacity>
                </View>

                <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                    <View style={styles.avatarSection}>
                        <View style={styles.avatarContainer}>
                            <Typography.Title style={styles.avatarText}>
                                {name ? name.charAt(0).toUpperCase() : 'U'}
                            </Typography.Title>
                            <View style={styles.editBadge}>
                                <Ionicons name="camera" size={14} color="#FFF" />
                            </View>
                        </View>
                        <Typography.Caption style={{ color: '#666', marginTop: 8 }}>{t('editProfile.changePhoto')}</Typography.Caption>
                    </View>

                    <View style={styles.form}>
                        <Input
                            label={t('onboarding.name')}
                            value={name}
                            onChangeText={setName}
                            placeholder={t('editProfile.enterName')}
                        />
                        <Input
                            label={t('profile.email')}
                            value={email}
                            onChangeText={setEmail}
                            placeholder={t('editProfile.enterEmail')}
                            keyboardType="email-address"
                        />
                        <Input
                            label={t('login.mobileLabel')}
                            value={user?.phone || ''}
                            editable={false}
                            placeholder={t('login.mobilePlaceholder')}
                            style={{ backgroundColor: '#F5F5F5', color: '#999' }}
                        />
                        <Typography.Caption style={{ color: '#999', marginBottom: 16, marginTop: -12 }}>
                            {t('editProfile.phoneImmutable')}
                        </Typography.Caption>

                        <Typography.Subtitle style={styles.sectionTitle}>{t('editProfile.locationDetails')}</Typography.Subtitle>
                        <Input
                            label={t('onboarding.village')}
                            value={village}
                            onChangeText={setVillage}
                            placeholder={t('editProfile.enterVillage')}
                        />
                        <Input
                            label={t('profile.district')}
                            value={district}
                            onChangeText={setDistrict}
                            placeholder={t('editProfile.enterDistrict')}
                        />
                        <Input
                            label={t('profile.state')}
                            value={state}
                            onChangeText={setState}
                            placeholder={t('editProfile.enterState')}
                        />

                        {user?.role === 'fpo' && (
                            <>
                                <Typography.Subtitle style={styles.sectionTitle}>{t('profile.organization')}</Typography.Subtitle>
                                <Input
                                    label={t('onboarding.fpoId')}
                                    value={fpoId}
                                    onChangeText={setFpoId}
                                    placeholder={t('editProfile.enterFpoId')}
                                />
                            </>
                        )}
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    backButton: {
        padding: 4,
    },
    content: {
        padding: 20,
    },
    avatarSection: {
        alignItems: 'center',
        marginBottom: 32,
    },
    avatarContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#E8F5E9',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    avatarText: {
        fontSize: 40,
        color: '#2F8F46',
    },
    editBadge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#2F8F46',
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#FFF',
    },
    form: {
        gap: 4,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 12,
        color: '#1A1A1A',
    }
});
