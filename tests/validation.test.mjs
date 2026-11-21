import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  validatePhone,
  validateEmail,
  validatePincode,
  validateRequired,
  validateMinLength,
  validateNumber,
} from '../src/utils/validation.ts';

test('validatePhone accepts 10-digit Indian mobile numbers', () => {
  assert.equal(validatePhone('9876543210'), true);
  assert.equal(validatePhone('98765 43210'), true);
});

test('validatePhone rejects numbers that do not start with 6 to 9 or have the wrong length', () => {
  assert.equal(validatePhone('1234567890'), false);
  assert.equal(validatePhone('987654321'), false);
  assert.equal(validatePhone('98765432100'), false);
  assert.equal(validatePhone('+919876543210'), false);
});

test('validateEmail', () => {
  assert.equal(validateEmail('farmer@example.in'), true);
  assert.equal(validateEmail('farmer@example'), false);
  assert.equal(validateEmail('farmer example@x.in'), false);
});

test('validatePincode requires exactly six digits', () => {
  assert.equal(validatePincode('110001'), true);
  assert.equal(validatePincode('11000'), false);
  assert.equal(validatePincode('11000a'), false);
});

test('validateRequired and validateMinLength ignore surrounding spaces', () => {
  assert.equal(validateRequired('  '), false);
  assert.equal(validateRequired(' ragi '), true);
  assert.equal(validateMinLength('  ab  ', 3), false);
  assert.equal(validateMinLength('abc', 3), true);
});

test('validateNumber accepts positive numbers only', () => {
  assert.equal(validateNumber('25'), true);
  assert.equal(validateNumber('2.5'), true);
  assert.equal(validateNumber('0'), false);
  assert.equal(validateNumber('-3'), false);
  assert.equal(validateNumber('ten'), false);
});
