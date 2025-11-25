import AsyncStorage from '@react-native-async-storage/async-storage';

const EVENTS_KEY = '@shree_anna_events';

export interface AppEvent {
    id: string;
    timestamp: string;
    eventType: string;
    screen?: string;
    action?: string;
    userId?: string;
    metadata?: Record<string, any>;
}

class EventLogger {
    private static instance: EventLogger;
    private events: AppEvent[] = [];
    private maxEvents = 1000; // Keep last 1000 events

    private constructor() {
        this.loadEvents();
    }

    static getInstance(): EventLogger {
        if (!EventLogger.instance) {
            EventLogger.instance = new EventLogger();
        }
        return EventLogger.instance;
    }

    private async loadEvents() {
        try {
            const eventsJson = await AsyncStorage.getItem(EVENTS_KEY);
            if (eventsJson) {
                this.events = JSON.parse(eventsJson);
            }
        } catch (error) {
            console.error('Failed to load events:', error);
        }
    }

    private async saveEvents() {
        try {
            // Keep only last maxEvents
            if (this.events.length > this.maxEvents) {
                this.events = this.events.slice(-this.maxEvents);
            }
            await AsyncStorage.setItem(EVENTS_KEY, JSON.stringify(this.events));
        } catch (error) {
            console.error('Failed to save events:', error);
        }
    }

    async logEvent(eventType: string, screen?: string, action?: string, userId?: string, metadata?: Record<string, any>) {
        const event: AppEvent = {
            id: `event-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            timestamp: new Date().toISOString(),
            eventType,
            screen,
            action,
            userId,
            metadata
        };

        this.events.push(event);
        await this.saveEvents();

        // Console log for development
        console.log(`📊 [${eventType}] ${screen ? `${screen} > ` : ''}${action || ''}`, metadata || '');
    }

    async getEvents(limit?: number): Promise<AppEvent[]> {
        if (limit) {
            return this.events.slice(-limit);
        }
        return [...this.events];
    }

    async clearEvents() {
        this.events = [];
        await AsyncStorage.removeItem(EVENTS_KEY);
    }

    // Helper methods for common events
    async logScreenView(screen: string, userId?: string) {
        await this.logEvent('screen_view', screen, undefined, userId);
    }

    async logButtonClick(screen: string, buttonName: string, userId?: string, metadata?: Record<string, any>) {
        await this.logEvent('button_click', screen, buttonName, userId, metadata);
    }

    async logNavigation(from: string, to: string, userId?: string) {
        await this.logEvent('navigation', from, `navigate_to_${to}`, userId);
    }

    async logLogin(userId: string, method: string = 'password') {
        await this.logEvent('login', 'LoginScreen', 'login_success', userId, { method });
    }

    async logLogout(userId: string) {
        await this.logEvent('logout', undefined, 'logout', userId);
    }

    async logRegistration(userId: string, role: string) {
        await this.logEvent('registration', 'RegisterScreen', 'registration_success', userId, { role });
    }

    async logFormSubmit(screen: string, formName: string, userId?: string, data?: Record<string, any>) {
        await this.logEvent('form_submit', screen, formName, userId, data);
    }

    async logError(screen: string, error: string, userId?: string, metadata?: Record<string, any>) {
        await this.logEvent('error', screen, error, userId, metadata);
    }
}

// Export singleton instance
export const eventLogger = EventLogger.getInstance();

// Export convenience functions
export const logScreenView = (screen: string, userId?: string) => eventLogger.logScreenView(screen, userId);
export const logButtonClick = (screen: string, buttonName: string, userId?: string, metadata?: Record<string, any>) => eventLogger.logButtonClick(screen, buttonName, userId, metadata);
export const logNavigation = (from: string, to: string, userId?: string) => eventLogger.logNavigation(from, to, userId);
export const logLogin = (userId: string, method?: string) => eventLogger.logLogin(userId, method);
export const logLogout = (userId: string) => eventLogger.logLogout(userId);
export const logRegistration = (userId: string, role: string) => eventLogger.logRegistration(userId, role);
export const logFormSubmit = (screen: string, formName: string, userId?: string, data?: Record<string, any>) => eventLogger.logFormSubmit(screen, formName, userId, data);
export const logError = (screen: string, error: string, userId?: string, metadata?: Record<string, any>) => eventLogger.logError(screen, error, userId, metadata);
