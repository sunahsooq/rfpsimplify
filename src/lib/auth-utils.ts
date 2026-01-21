import { AuthError } from "@supabase/supabase-js";

/**
 * Maps Supabase auth errors to safe, user-friendly messages
 * that don't reveal sensitive information about account states
 */
export const getAuthErrorMessage = (error: AuthError): string => {
  // Log full error for debugging (server-side only in production)
  console.error("Auth error:", error.message);

  const message = error.message.toLowerCase();

  // Generic credential errors - don't reveal if email exists
  if (
    message.includes("invalid login credentials") ||
    message.includes("invalid password") ||
    message.includes("user not found") ||
    message.includes("email not confirmed")
  ) {
    return "Invalid email or password. Please check your credentials and try again.";
  }

  // Rate limiting
  if (message.includes("too many requests") || message.includes("rate limit")) {
    return "Too many attempts. Please wait a moment and try again.";
  }

  // Email already registered (for signup)
  if (message.includes("already registered") || message.includes("already exists")) {
    return "An account with this email may already exist. Try signing in instead.";
  }

  // Password requirements
  if (message.includes("password")) {
    return "Password does not meet requirements. Please use at least 6 characters.";
  }

  // Email format
  if (message.includes("email")) {
    return "Please enter a valid email address.";
  }

  // Network errors
  if (message.includes("network") || message.includes("fetch")) {
    return "Connection error. Please check your internet and try again.";
  }

  // Default safe message
  return "Authentication failed. Please try again or contact support if the issue persists.";
};

/**
 * Safe SSO error message
 */
export const getSSOErrorMessage = (): string => {
  return "Authentication failed. Please try again or use email login.";
};
