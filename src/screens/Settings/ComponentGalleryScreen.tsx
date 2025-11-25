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

export const ComponentGalleryScreen = () => {
    const [showSuccess, setShowSuccess] = useState(false);

    return (
        <ScreenWrapper style={styles.container}>
            <View style={styles.header}>
                <Typography.Title>Component Gallery</Typography.Title>
            </View>

            <ScrollView contentContainerStyle={styles.content}>

                <View style={styles.section}>
                    <Typography.Subtitle>Typography</Typography.Subtitle>
                    <Typography.Title>Title Text</Typography.Title>
                    <Typography.Subtitle>Subtitle Text</Typography.Subtitle>
                    <Typography.Body>Body text is used for general content.</Typography.Body>
                    <Typography.Caption>Caption text is smaller.</Typography.Caption>
                </View>

                <View style={styles.section}>
                    <Typography.Subtitle>Buttons</Typography.Subtitle>
                    <View style={styles.row}>
                        <Button title="Primary" onPress={() => { }} style={styles.btn} />
                        <Button title="Secondary" variant="secondary" onPress={() => { }} style={styles.btn} />
                    </View>
                    <View style={styles.row}>
                        <Button title="Ghost" variant="ghost" onPress={() => { }} style={styles.btn} />
                        <Button title="Loading" loading onPress={() => { }} style={styles.btn} />
                    </View>
                    <Button title="Disabled" disabled onPress={() => { }} style={styles.btn} />
                </View>

                <View style={styles.section}>
                    <Typography.Subtitle>Inputs</Typography.Subtitle>
                    <Input label="Text Input" placeholder="Enter text..." />
                    <Input label="Numeric Input" placeholder="0.00" keyboardType="numeric" />
                </View>

                <View style={styles.section}>
                    <Typography.Subtitle>Badges</Typography.Subtitle>
                    <View style={styles.row}>
                        <Badge label="Default" />
                        <Badge label="Success" statusType="success" />
                        <Badge label="Warning" statusType="warning" />
                    </View>
                    <View style={styles.row}>
                        <Badge label="Danger" statusType="danger" />
                        <Badge label="Info" statusType="info" />
                    </View>
                </View>

                <View style={styles.section}>
                    <Typography.Subtitle>Cards</Typography.Subtitle>
                    <Card
                        title="Card Title"
                        subtitle="Subtitle goes here"
                        meta="2 mins ago"
                        status={<Badge label="Active" statusType="success" />}
                    />
                </View>

                <View style={styles.section}>
                    <Typography.Subtitle>Animations</Typography.Subtitle>
                    <Button title="Show Success" onPress={() => setShowSuccess(true)} />
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
