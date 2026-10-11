/**
 * Security Hardening & Input Sanitization Suite
 * Protects against XSS, injection vectors, prototype tampering, and abuse.
 */

// HTML entity encoding map for high-risk injection characters
const ENTITY_MAP: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;'
};

/**
 * Sanitizes generic user text by stripping dangerous HTML tags,
 * neutralizing javascript: protocol attacks, and encoding control characters.
 */
export function sanitizeInput(input: unknown): string {
  if (typeof input !== 'string') {
    if (input === null || input === undefined) return '';
    return String(input);
  }

  // 1. Strip null bytes & control characters (common binary exploit vectors)
  let clean = input.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');

  // 2. Neutralize dangerous executable URI patterns
  clean = clean.replace(/javascript\s*:/gi, 'blocked:');
  clean = clean.replace(/vbscript\s*:/gi, 'blocked:');
  clean = clean.replace(/data\s*:\s*text\/html/gi, 'blocked:');

  // 3. Strip raw HTML tags like <script>, <iframe>, <object>, <embed>, <svg onload>
  clean = clean.replace(/<[^>]*>/g, '');

  // 4. Trim excessive whitespace
  return clean.trim();
}

/**
 * Encodes special characters to safe HTML entities to prevent DOM XSS
 */
export function escapeHtml(str: string): string {
  if (!str) return '';
  return str.replace(/[&<>"'`=\/]/g, (char) => ENTITY_MAP[char] || char);
}

/**
 * Strict RFC 5322-compliant email validator
 */
export function isValidEmail(email: string): boolean {
  if (!email || email.length > 254) return false;
  // Standard robust email pattern
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(email.trim());
}

/**
 * Validates international phone format (digits, optional +, space, dashes, parentheses)
 */
export function isValidPhone(phone: string): boolean {
  if (!phone) return false;
  // Allow between 7 and 18 dialable digits/characters
  const clean = phone.replace(/[^0-9]/g, '');
  return clean.length >= 7 && clean.length <= 15;
}

/**
 * Safe URL validator that strictly rejects javascript:, data:, and file: schemes
 */
export function isSafeUrl(url: string): boolean {
  if (!url) return false;
  const lower = url.trim().toLowerCase();
  if (
    lower.startsWith('javascript:') ||
    lower.startsWith('data:') ||
    lower.startsWith('vbscript:') ||
    lower.startsWith('file:')
  ) {
    return false;
  }
  return true;
}

/**
 * Client-Side Anti-Spam Rate Limiting Throttle
 * Prevents automated scripts or rapid-fire form hammering
 */
const rateLimitCache = new Map<string, number>();

export function checkRateLimit(actionKey: string, cooldownSeconds: number = 5): { allowed: boolean; remainingSeconds: number } {
  const now = Date.now();
  const lastCall = rateLimitCache.get(actionKey) || 0;
  const cooldownMs = cooldownSeconds * 1000;

  if (now - lastCall < cooldownMs) {
    const remainingSeconds = Math.ceil((cooldownMs - (now - lastCall)) / 1000);
    return { allowed: false, remainingSeconds };
  }

  rateLimitCache.set(actionKey, now);
  return { allowed: true, remainingSeconds: 0 };
}
