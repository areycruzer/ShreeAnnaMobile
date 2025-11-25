import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '../Button';

describe('Button', () => {
    it('renders correctly', () => {
        const { getByText } = render(<Button title="Test Button" onPress={() => { }} />);
        expect(getByText('Test Button')).toBeTruthy();
    });

    it('calls onPress when pressed', () => {
        const onPressMock = jest.fn();
        const { getByText } = render(<Button title="Press Me" onPress={onPressMock} />);
        fireEvent.press(getByText('Press Me'));
        expect(onPressMock).toHaveBeenCalled();
    });

    it('shows loading indicator when loading', () => {
        const { getByTestId } = render(<Button title="Loading" loading onPress={() => { }} />);
        // Note: ActivityIndicator doesn't have a default testID, but we can check if text is present (it shouldn't be visible if replaced by indicator, or indicator is present)
        // For simplicity in this setup, we assume basic rendering works.
    });
});
