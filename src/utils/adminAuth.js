// src/utils/adminAuth.js
// Single Unified Admin Authentication Utility for Window & Mobile.
// - Same admin password works across all devices (Desktop Windows, Laptops, Mobile phones).
// - Cleartext password is NEVER stored in localStorage or sessionStorage.
// - Password verification uses SHA-256 cryptographic hashing.
// - Active login session is stored securely inside sessionStorage (hidden token).

import {
  hashPasscode,
  verifyAdminPasscode,
  loginAdmin as loginLeadAdmin,
  isAdminAuthenticated as isLeadAdminAuth,
  logoutAdmin as logoutLeadAdmin,
  changeAdminPasscode as changeLeadAdminPasscode,
  resetAdminPasscodeToDefault as resetLeadAdminDefault,
} from './leadStore';

export { hashPasscode, verifyAdminPasscode };

export function getDeviceId() {
  return 'unified_device';
}

export function isAdminConfigured() {
  return true; // Pre-configured with single unified admin password
}

export async function setupAdmin(password, confirmPassword) {
  if (!password || password.length < 4) {
    return { success: false, error: 'Password must be at least 4 characters.' };
  }
  if (password !== confirmPassword) {
    return { success: false, error: 'Passwords do not match.' };
  }
  return await changeLeadAdminPasscode('', password);
}

export async function loginAdmin(password) {
  return await loginLeadAdmin(password);
}

export function isSessionValid() {
  return isLeadAdminAuth();
}

export function touchSession() {
  // Session token lives safely in sessionStorage
}

export function logoutAdmin() {
  logoutLeadAdmin();
}

export async function changePassword(currentPw, newPw, confirmPw) {
  if (!newPw || newPw.length < 4) {
    return { success: false, error: 'New password must be at least 4 characters.' };
  }
  if (newPw !== confirmPw) {
    return { success: false, error: 'New passwords do not match.' };
  }
  return await changeLeadAdminPasscode(currentPw, newPw);
}

export function resetThisDevice() {
  return resetLeadAdminDefault();
}

export { changeLeadAdminPasscode as configureAdmin };