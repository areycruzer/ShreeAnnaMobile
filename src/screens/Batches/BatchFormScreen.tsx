import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert, Image, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';

import * as ImagePicker from 'expo-image-picker';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import { ScreenWrapper } from '../../components/ScreenWrapper';
import { Typography } from '../../components/Typography';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { saveBatchLocal } from '../../services/Database';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../theme';

import { SuccessAnimation } from '../../components/SuccessAnimation';

export const BatchFormScreen = () => {
    const { t } = useTranslation();
    const navigation = useNavigation();
    const [step, setStep] = useState(1);

    // Form State
    const [commodity, setCommodity] = useState('');
    const [grade, setGrade] = useState('');
    const [qty, setQty] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert(t('batchForm.permissionNeeded'), t('batchForm.galleryPermission'));
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            try {
                const manipResult = await manipulateAsync(
                    result.assets[0].uri,
                    [{ resize: { width: 1024 } }],
                    { compress: 0.7, format: SaveFormat.JPEG }
                );
                setImage(manipResult.uri);
            } catch (error) {
                console.error("Compression error:", error);
                Alert.alert(t('batchForm.errorTitle'), t('batchForm.processImageError'));
            }
        }
    };

    const handleNext = () => {
        if (step === 1) {
            if (!commodity || !grade || !qty || !price) {
                Alert.alert(t('batchForm.errorTitle'), t('batchForm.fillAllFields'));
                return;
            }
            setStep(2);
        } else if (step === 2) {
            if (!image) {
                Alert.alert(t('batchForm.errorTitle'), t('batchForm.uploadPhotoError'));
                return;
            }
            setStep(3);
        }
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            const batch = {
                commodity_code: commodity,
                grade,
                qty_kg: parseFloat(qty),
                min_price: parseFloat(price),
                sample_image: image,
                status: 'Draft',
                harvest_date: new Date().toISOString().split('T')[0],
                // Add missing required fields for DB
                farm_user_id: 'user-1001', // Mock user ID
                moisture_pct: 0,
                foreign_matter_pct: 0,
                geo_lat: 0,
                geo_long: 0,
            };

            await saveBatchLocal(batch);
            setShowSuccess(true);
        } catch (error) {
            console.error(error);
            Alert.alert(t('batchForm.errorTitle'), t('batchForm.saveBatchError'));
        } finally {
            setLoading(false);
        }
    };

    const renderStepIndicator = () => (
        <View style={styles.stepIndicator}>
            {[1, 2, 3].map((s) => (
                <View key={s} style={[styles.stepDot, step >= s && styles.stepDotActive]} />
            ))}
        </View>
    );

    return (
        <ScreenWrapper style={styles.container}>
            <View style={styles.header}>
                <Typography.Title>{t('home.uploadBatch')}</Typography.Title>
                {renderStepIndicator()}
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {step === 1 && (
                    <View>
                        <Typography.Subtitle style={styles.sectionTitle}>{t('batchForm.basicInfo')}</Typography.Subtitle>
                        <Input
                            label={t('batchForm.commodity')}
                            placeholder="e.g. MILLET_BAJRA"
                            value={commodity}
                            onChangeText={setCommodity}
                        />
                        <Input
                            label={t('batchForm.grade')}
                            placeholder="e.g. A"
                            value={grade}
                            onChangeText={setGrade}
                        />
                        <Input
                            label={t('batchForm.qty_kg')}
                            placeholder="e.g. 100"
                            value={qty}
                            onChangeText={setQty}
                            keyboardType="numeric"
                        />
                        <Input
                            label={t('batchForm.price')}
                            placeholder="e.g. 2500"
                            value={price}
                            onChangeText={setPrice}
                            keyboardType="numeric"
                        />
                    </View>
                )}

                {step === 2 && (
                    <View>
                        <Typography.Subtitle style={styles.sectionTitle}>{t('batchForm.photos')}</Typography.Subtitle>
                        <TouchableOpacity onPress={pickImage} style={styles.imageUpload}>
                            {image ? (
                                <Image source={{ uri: image }} style={styles.previewImage} />
                            ) : (
                                <View style={styles.uploadPlaceholder}>
                                    <Typography.Body>{t('batchForm.tapToUpload')}</Typography.Body>
                                </View>
                            )}
                        </TouchableOpacity>
                        {image && (
                            <Button
                                title={t('batchForm.retakePhoto')}
                                onPress={pickImage}
                                variant="secondary"
                                style={{ marginTop: 16 }}
                            />
                        )}
                    </View>
                )}

                {step === 3 && (
                    <View>
                        <Typography.Subtitle style={styles.sectionTitle}>{t('batchForm.review')}</Typography.Subtitle>
                        <View style={styles.reviewCard}>
                            <View style={styles.reviewRow}>
                                <Typography.Body style={styles.reviewLabel}>{t('batchForm.commodity')}</Typography.Body>
                                <Typography.Body style={styles.reviewValue}>{commodity}</Typography.Body>
                            </View>
                            <View style={styles.reviewRow}>
                                <Typography.Body style={styles.reviewLabel}>{t('batchForm.grade')}</Typography.Body>
                                <Typography.Body style={styles.reviewValue}>{grade}</Typography.Body>
                            </View>
                            <View style={styles.reviewRow}>
                                <Typography.Body style={styles.reviewLabel}>{t('batchForm.qty_kg')}</Typography.Body>
                                <Typography.Body style={styles.reviewValue}>{qty} kg</Typography.Body>
                            </View>
                            <View style={styles.reviewRow}>
                                <Typography.Body style={styles.reviewLabel}>{t('batchForm.price')}</Typography.Body>
                                <Typography.Body style={styles.reviewValue}>₹ {price}</Typography.Body>
                            </View>
                            <View style={styles.reviewRow}>
                                <Typography.Body style={styles.reviewLabel}>{t('batchForm.image')}</Typography.Body>
                                <Image source={{ uri: image! }} style={styles.reviewThumbnail} />
                            </View>
                        </View>
                    </View>
                )}
            </ScrollView>

            <View style={styles.footer}>
                {step > 1 && (
                    <Button
                        title={t('batchForm.back')}
                        onPress={() => setStep(step - 1)}
                        variant="secondary"
                        style={styles.footerButton}
                    />
                )}
                <Button
                    title={step === 3 ? t('batchForm.saveDraft') : t('batchForm.next')}
                    onPress={step === 3 ? handleSave : handleNext}
                    loading={loading}
                    style={StyleSheet.flatten([styles.footerButton, { flex: step === 1 ? 1 : 1 }])}
                />
            </View>

            <SuccessAnimation
                visible={showSuccess}
                message={t('batchForm.successMessage')}
                onFinish={() => {
                    setShowSuccess(false);
                    navigation.goBack();
                }}
            />
        </ScreenWrapper>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background.default,
    },
    header: {
        padding: theme.spacing.layout.screenPadding,
        backgroundColor: theme.colors.background.paper,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.divider,
    },
    stepIndicator: {
        flexDirection: 'row',
        marginTop: 16,
        justifyContent: 'center',
        gap: 8,
    },
    stepDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#E0E0E0',
    },
    stepDotActive: {
        backgroundColor: '#2F8F46',
        width: 32,
        borderRadius: 6,
    },
    content: {
        padding: 24,
    },
    sectionTitle: {
        marginBottom: 24,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1A1A1A',
    },
    imageUpload: {
        height: 240,
        backgroundColor: '#F9F9F9',
        borderRadius: 16,
        borderWidth: 2,
        borderColor: '#E0E0E0',
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    uploadPlaceholder: {
        alignItems: 'center',
    },
    previewImage: {
        width: '100%',
        height: '100%',
    },
    reviewCard: {
        backgroundColor: theme.colors.background.paper,
        padding: theme.spacing.m,
        borderRadius: theme.spacing.radius.m,
    },
    reviewRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: theme.spacing.s,
        alignItems: 'center',
    },
    reviewLabel: {
        color: theme.colors.text.secondary,
    },
    reviewValue: {
        fontWeight: 'bold',
    },
    reviewThumbnail: {
        width: 48,
        height: 48,
        borderRadius: theme.spacing.radius.s,
    },
    footer: {
        padding: theme.spacing.layout.screenPadding,
        backgroundColor: theme.colors.background.paper,
        flexDirection: 'row',
        gap: theme.spacing.m,
        borderTopWidth: 1,
        borderTopColor: theme.colors.divider,
    },
    footerButton: {
        flex: 1,
    }
});
