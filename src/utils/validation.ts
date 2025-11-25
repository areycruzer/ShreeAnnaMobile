// Form validation utilities for mobile app

export const validatePhone = (phone: string): boolean => {
    // Indian phone number validation (10 digits)
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
};

export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validatePincode = (pincode: string): boolean => {
    // Indian pincode validation (6 digits)
    const pincodeRegex = /^\d{6}$/;
    return pincodeRegex.test(pincode);
};

export const validateRequired = (value: string): boolean => {
    return value.trim().length > 0;
};

export const validateMinLength = (value: string, minLength: number): boolean => {
    return value.trim().length >= minLength;
};

export const validateNumber = (value: string): boolean => {
    return !isNaN(Number(value)) && Number(value) > 0;
};
