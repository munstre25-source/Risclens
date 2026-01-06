import { logAuditEvent } from './supabase';

/**
 * Audit Logger Utility for Debugging
 * 
 * Features:
 * - Redaction of PII (emails)
 * - Truncation of long strings
 * - Sampling
 * - Environment flags
 * - Metadata enrichment
 */

interface AuditLogOpts {
  lead_id?: string;
  debug_session_id?: string;
  route?: string;
}

const MAX_STRING_LENGTH = 200;
const DEFAULT_SAMPLE_RATE = 0.05;

/**
 * Redacts emails in a string or object
 */
function redact(value: any): any {
  if (typeof value === 'string') {
    // Basic email regex redaction: alex@company.com -> a***@company.com
    return value.replace(/([^@\s]{1})[^@\s]*(@.+)/g, '$1***$2');
  }
  
  if (Array.isArray(value)) {
    return value.map(redact);
  }
  
  if (value !== null && typeof value === 'object') {
    const redacted: any = {};
    for (const key in value) {
      redacted[key] = redact(value[key]);
    }
    return redacted;
  }
  
  return value;
}

/**
 * Truncates long strings in an object
 */
function truncate(value: any): any {
  if (typeof value === 'string') {
    if (value.length > MAX_STRING_LENGTH) {
      return value.substring(0, MAX_STRING_LENGTH) + '... [TRUNCATED]';
    }
    return value;
  }
  
  if (Array.isArray(value)) {
    return value.map(truncate);
  }
  
  if (value !== null && typeof value === 'object') {
    const truncated: any = {};
    for (const key in value) {
      truncated[key] = truncate(value[key]);
    }
    return truncated;
  }
  
  return value;
}

/**
 * Main audit logging function
 */
export async function auditLog(
  eventType: string,
  details: any,
  opts: AuditLogOpts = {}
): Promise<void> {
  const enabled = process.env.AUDIT_DEBUG_ENABLED === 'true';
  if (!enabled) return;

  const sampleRate = parseFloat(process.env.AUDIT_DEBUG_SAMPLE_RATE || DEFAULT_SAMPLE_RATE.toString());
  const shouldLog = Math.random() < sampleRate;
  
  // If we have a debug_session_id, we override sampling (assume explicit testing)
  if (!shouldLog && !opts.debug_session_id) return;

  try {
    const payload = {
      ...truncate(redact(details)),
      _metadata: {
        is_debug: true,
        environment: process.env.NODE_ENV || 'development',
        request_id: crypto.randomUUID(),
        debug_session_id: opts.debug_session_id,
        lead_id: opts.lead_id,
        route: opts.route,
        timestamp: new Date().toISOString(),
      }
    };

    // Fire and forget - don't await so we don't block the request flow
    logAuditEvent(eventType, payload).catch(err => {
      console.error('[AuditLogger] Failed to write log:', err);
    });
  } catch (err) {
    // Defensive catch to ensure logging never breaks the main flow
    console.error('[AuditLogger] Critical failure:', err);
  }
}

/**
 * How to use:
 * 1. Set AUDIT_DEBUG_ENABLED=true in .env
 * 2. Optionally set AUDIT_DEBUG_SAMPLE_RATE (default 0.05)
 * 3. Call auditLog(eventType, details, { lead_id, debug_session_id })
 * 4. Filter logs in /admin/audit by is_debug: true or debug_session_id
 */
