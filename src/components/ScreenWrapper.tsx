import React from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar, Platform, ScrollView, ViewStyle } from 'react-native';

interface ScreenWrapperProps {
    children: React.ReactNode;
    scrollable?: boolean;
    style?: ViewStyle;
}

export const ScreenWrapper = ({ children, scrollable = false, style }: ScreenWrapperProps) => {
    const Content = scrollable ? ScrollView : View;

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#F7F7F7" />
            <Content
                style={[styles.content, style]}
                contentContainerStyle={scrollable ? styles.scrollContent : undefined}
            >
                {children}
            </Content>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F7',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    content: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 24,
    },
});
