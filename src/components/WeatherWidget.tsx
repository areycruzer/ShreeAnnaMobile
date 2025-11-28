import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { Typography } from './Typography';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import * as Location from 'expo-location';

export const WeatherWidget = () => {
    const { t } = useTranslation();
    const [weather, setWeather] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            try {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    setError('Permission to access location was denied');
                    setLoading(false);
                    return;
                }

                let location = await Location.getCurrentPositionAsync({});
                fetchWeather(location.coords.latitude, location.coords.longitude);
            } catch (err) {
                console.error("Location error:", err);
                setError('Could not fetch location');
                setLoading(false);
            }
        })();
    }, []);

    const fetchWeather = async (lat: number, lon: number) => {
        try {
            // Open-Meteo API (Free, no key required)
            const response = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`
            );
            const data = await response.json();

            // Reverse geocoding for city name (optional, using coordinates for now if fails)
            let locationName = `${lat.toFixed(2)}, ${lon.toFixed(2)}`;
            try {
                const geocode = await Location.reverseGeocodeAsync({ latitude: lat, longitude: lon });
                if (geocode.length > 0) {
                    locationName = `${geocode[0].city || geocode[0].district || geocode[0].region}, ${geocode[0].isoCountryCode}`;
                }
            } catch (e) {
                console.warn("Geocoding failed", e);
            }

            setWeather({
                temp: `${Math.round(data.current.temperature_2m)}°C`,
                condition: getWeatherDescription(data.current.weather_code),
                icon: getWeatherIcon(data.current.weather_code),
                location: locationName,
                humidity: `${data.current.relative_humidity_2m}%`,
                wind: `${data.current.wind_speed_10m} km/h`
            });
        } catch (err) {
            console.error("Weather fetch error:", err);
            setError('Failed to fetch weather');
        } finally {
            setLoading(false);
        }
    };

    const getWeatherIcon = (code: number): any => {
        if (code === 0) return 'sunny';
        if (code >= 1 && code <= 3) return 'partly-sunny';
        if (code >= 45 && code <= 48) return 'cloudy';
        if (code >= 51 && code <= 67) return 'rainy';
        if (code >= 71 && code <= 77) return 'snow';
        if (code >= 80 && code <= 82) return 'rainy';
        if (code >= 95) return 'thunderstorm';
        return 'cloud';
    };

    const getWeatherDescription = (code: number): string => {
        if (code === 0) return 'Clear Sky';
        if (code >= 1 && code <= 3) return 'Partly Cloudy';
        if (code >= 45 && code <= 48) return 'Foggy';
        if (code >= 51 && code <= 67) return 'Rain';
        if (code >= 71 && code <= 77) return 'Snow';
        if (code >= 80 && code <= 82) return 'Showers';
        if (code >= 95) return 'Thunderstorm';
        return 'Unknown';
    };

    if (loading) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', height: 160 }]}>
                <ActivityIndicator color="#FFF" />
                <Typography.Caption style={{ color: '#FFF', marginTop: 8 }}>Loading weather...</Typography.Caption>
            </View>
        );
    }

    if (error || !weather) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', height: 160 }]}>
                <Ionicons name="cloud-offline" size={32} color="#FFF" />
                <Typography.Caption style={{ color: '#FFF', marginTop: 8 }}>{error || 'Weather unavailable'}</Typography.Caption>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View>
                    <Typography.Title style={styles.temp}>{weather.temp}</Typography.Title>
                    <View style={styles.locationRow}>
                        <Ionicons name="location-sharp" size={14} color="#FFF" />
                        <Typography.Body style={styles.location}>{weather.location}</Typography.Body>
                    </View>
                </View>
                <View style={styles.iconContainer}>
                    <Ionicons name={weather.icon} size={40} color="#FFD700" />
                    <Typography.Body style={styles.condition}>{weather.condition}</Typography.Body>
                </View>
            </View>
            <View style={styles.details}>
                <View style={styles.detailItem}>
                    <Ionicons name="water-outline" size={16} color="#FFF" />
                    <Typography.Caption style={styles.detailText}>{t('weather.humidity')}: {weather.humidity}</Typography.Caption>
                </View>
                <View style={styles.detailItem}>
                    <Ionicons name="leaf-outline" size={16} color="#FFF" />
                    <Typography.Caption style={styles.detailText}>{t('weather.wind')}: {weather.wind}</Typography.Caption>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#2F8F46',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    temp: {
        fontSize: 32,
        color: '#FFF',
        fontWeight: 'bold',
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    location: {
        color: '#FFF',
        marginLeft: 4,
        opacity: 0.9,
    },
    iconContainer: {
        alignItems: 'center',
    },
    condition: {
        color: '#FFF',
        marginTop: 4,
        fontWeight: '500',
    },
    details: {
        flexDirection: 'row',
        gap: 16,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.2)',
        paddingTop: 12,
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    detailText: {
        color: '#FFF',
        opacity: 0.9,
    }
});
