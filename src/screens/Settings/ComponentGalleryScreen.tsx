import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { ScreenWrapper } from '../../components/ScreenWrapper';
import { Typography } from '../../components/Typography';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Card } from '../../components/Card';
import { Badge } from '../../components/Badge';
import { FAB } from '../../components/FAB';
import { SuccessAnimation } from '../../components/SuccessAnimation';
import { theme } from '../../theme';
import { useTranslation } from 'react-i18next';

export const ComponentGalleryScreen = () => {
    const { t } = useTranslation();
    const [showSuccess, setShowSuccess] = useState(false);

    return (
        <ScreenWrapper style={styles.container}>
            <View style={styles.header}>
                <Typography.Title>{t('gallery.title')}</Typography.Title>
            </View>

            <ScrollView contentContainerStyle={styles.content}>

                <View style={styles.section}>
                    <Typography.Subtitle>{t('gallery.typography')}</Typography.Subtitle>
                    <Typography.Title>{t('gallery.titleText')}</Typography.Title>
                    <Typography.Subtitle>{t('gallery.subtitleText')}</Typography.Subtitle>
                    <Typography.Body>{t('gallery.bodyText')}</Typography.Body>
                    <Typography.Caption>{t('gallery.captionText')}</Typography.Caption>
                </View>

                <View style={styles.section}>
                    <Typography.Subtitle>{t('gallery.buttons')}</Typography.Subtitle>
                    <View style={styles.row}>
                        <Button title={t('gallery.primary')} onPress={() => { }} style={styles.btn} />
                        <Button title={t('gallery.secondary')} variant="secondary" onPress={() => { }} style={styles.btn} />
                    </View>
                    <View style={styles.row}>
                        <Button title={t('gallery.ghost')} variant="ghost" onPress={() => { }} style={styles.btn} />
                        <Button title={t('gallery.loading')} loading onPress={() => { }} style={styles.btn} />
                    </View>
                    <Button title={t('gallery.disabled')} disabled onPress={() => { }} style={styles.btn} />
                </View>

                <View style={styles.section}>
                    <Typography.Subtitle>{t('gallery.inputs')}</Typography.Subtitle>
                    <Input label={t('gallery.textInput')} placeholder={t('gallery.enterText')} />
                    <Input label={t('gallery.numericInput')} placeholder="0.00" keyboardType="numeric" />
                </View>

                <View style={styles.section}>
                    <Typography.Subtitle>{t('gallery.badges')}</Typography.Subtitle>
                    <View style={styles.row}>
                        <Badge label={t('gallery.default')} />
                        <Badge label={t('gallery.success')} statusType="success" />
                        <Badge label={t('gallery.warning')} statusType="warning" />
                    </View>
                    <View style={styles.row}>
                        <Badge label={t('gallery.danger')} statusType="danger" />
                        <Badge label={t('gallery.info')} statusType="info" />
                    </View>
                </View>

                <View style={styles.section}>
                    <Typography.Subtitle>{t('gallery.cards')}</Typography.Subtitle>
                    <Card
                        title={t('gallery.cardTitle')}
                        subtitle={t('gallery.cardSubtitle')}
                        meta={t('gallery.cardMeta')}
                        status={<Badge label={t('gallery.active')} statusType="success" />}
                    />
                </View>

                <View style={styles.section}>
                    <Typography.Subtitle>{t('gallery.animations')}</Typography.Subtitle>
                    <Button title={t('gallery.showSuccess')} onPress={() => setShowSuccess(true)} />
                </View>

            </ScrollView>

            <FAB onPress={() => { }} />

            <SuccessAnimation
                visible={showSuccess}
                onFinish={() => setShowSuccess(false)}
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
    content: {
        padding: theme.spacing.layout.screenPadding,
        paddingBottom: 80,
    },
    section: {
        marginBottom: theme.spacing.xl,
        gap: theme.spacing.m,
    },
    row: {
        flexDirection: 'row',
        gap: theme.spacing.m,
        flexWrap: 'wrap',
    },
    btn: {
        flex: 1,
        minWidth: 120,
    }
});
