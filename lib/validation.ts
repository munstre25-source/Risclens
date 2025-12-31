/**
 * Input Validation and Sanitization
 * 
 * Server-side validation for all form inputs and API parameters.
 * Never trust client-side validation alone.
 */

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export interface CalculatorFormInput {
  company_name: string;
  industry: string;
  num_employees: number;
  data_types: string[];
  planned_audit_date: string;
  role: string;
  email: string;
  utm_source?: string;
  variation_id?: string;
  consent: boolean;
}

// Form input without email requirement (email collected after results)
export interface CalculatorFormInputWithoutEmail {
  company_name: string;
  industry: string;
  num_employees: number;
  data_types: string[];
  planned_audit_date: string;
  role: string;
  email?: string; // Optional
  utm_source?: string;
  variation_id?: string;
  consent?: boolean; // Optional
}

export interface ValidationResult<T> {
  valid: boolean;
  data?: T;
  errors: ValidationError[];
}

export interface ValidationError {
  field: string;
  message: string;
}

// =============================================================================
// CONSTANTS
// =============================================================================

const VALID_INDUSTRIES = [
  'saas',
  'fintech',
  'healthcare',
  'ecommerce',
  'consulting',
  'manufacturing',
  'other',
];

const VALID_DATA_TYPES = [
  'pii',
  'financial',
  'health',
  'intellectual_property',
  'customer_data',
];

const VALID_ROLES = [
  'cto',
  'ceo',
  'security',
  'engineering',
  'operations',
  'other',
];

// Email regex (simplified but effective)
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Max lengths for text fields
const MAX_COMPANY_NAME_LENGTH = 200;
const MAX_EMAIL_LENGTH = 254;
const MAX_UTM_LENGTH = 100;
const MAX_VARIATION_ID_LENGTH = 50;

// =============================================================================
// SANITIZATION FUNCTIONS
// =============================================================================

/**
 * Sanitize a string input (trim, remove null bytes)
 */
export function sanitizeString(input: unknown): string {
  if (typeof input !== 'string') return '';
  return input
    .trim()
    .replace(/\0/g, '') // Remove null bytes
    .slice(0, 1000); // Reasonable max length
}

/**
 * Sanitize an array of strings
 */
export function sanitizeStringArray(input: unknown): string[] {
  if (!Array.isArray(input)) return [];
  return input
    .filter((item): item is string => typeof item === 'string')
    .map((item) => sanitizeString(item))
    .filter((item) => item.length > 0);
}

/**
 * Sanitize a number input
 */
export function sanitizeNumber(input: unknown): number {
  if (typeof input === 'number' && !isNaN(input)) {
    return Math.floor(input);
  }
  if (typeof input === 'string') {
    const parsed = parseInt(input, 10);
    if (!isNaN(parsed)) return parsed;
  }
  return 0;
}

/**
 * Sanitize a boolean input
 */
export function sanitizeBoolean(input: unknown): boolean {
  if (typeof input === 'boolean') return input;
  if (input === 'true' || input === '1') return true;
  return false;
}

/**
 * Sanitize a date string input (ISO format)
 */
export function sanitizeDate(input: unknown): string | null {
  if (typeof input !== 'string') return null;
  
  // Try to parse as date
  const date = new Date(input);
  if (isNaN(date.getTime())) return null;
  
  // Return in ISO format (just the date part)
  return date.toISOString().split('T')[0];
}

// =============================================================================
// VALIDATION FUNCTIONS
// =============================================================================

/**
 * Validate calculator form input (with email required)
 */
export function validateCalculatorForm(input: unknown): ValidationResult<CalculatorFormInput> {
  const errors: ValidationError[] = [];

  // Ensure input is an object
  if (!input || typeof input !== 'object') {
    return {
      valid: false,
      errors: [{ field: '_', message: 'Invalid input format' }],
    };
  }

  const raw = input as Record<string, unknown>;

  // Sanitize all inputs
  const sanitized = {
    company_name: sanitizeString(raw.company_name),
    industry: sanitizeString(raw.industry).toLowerCase(),
    num_employees: sanitizeNumber(raw.num_employees),
    data_types: sanitizeStringArray(raw.data_types).map((s) => s.toLowerCase()),
    planned_audit_date: sanitizeDate(raw.planned_audit_date),
    role: sanitizeString(raw.role).toLowerCase(),
    email: sanitizeString(raw.email).toLowerCase(),
    utm_source: sanitizeString(raw.utm_source) || undefined,
    variation_id: sanitizeString(raw.variation_id) || undefined,
    consent: sanitizeBoolean(raw.consent),
  };

  // Validate company_name
  if (!sanitized.company_name) {
    errors.push({ field: 'company_name', message: 'Company name is required' });
  } else if (sanitized.company_name.length > MAX_COMPANY_NAME_LENGTH) {
    errors.push({ field: 'company_name', message: 'Company name is too long' });
  }

  // Validate industry
  if (!sanitized.industry) {
    errors.push({ field: 'industry', message: 'Industry is required' });
  } else if (!VALID_INDUSTRIES.includes(sanitized.industry)) {
    errors.push({ field: 'industry', message: 'Invalid industry selection' });
  }

  // Validate num_employees
  if (sanitized.num_employees <= 0) {
    errors.push({ field: 'num_employees', message: 'Number of employees must be positive' });
  } else if (sanitized.num_employees > 100000) {
    errors.push({ field: 'num_employees', message: 'Invalid number of employees' });
  }

  // Validate data_types
  if (sanitized.data_types.length === 0) {
    errors.push({ field: 'data_types', message: 'At least one data type is required' });
  } else {
    const invalidTypes = sanitized.data_types.filter((dt) => !VALID_DATA_TYPES.includes(dt));
    if (invalidTypes.length > 0) {
      errors.push({ field: 'data_types', message: 'Invalid data type selection' });
    }
  }

  // Validate planned_audit_date
  if (!sanitized.planned_audit_date) {
    errors.push({ field: 'planned_audit_date', message: 'Planned audit date is required' });
  } else {
    const auditDate = new Date(sanitized.planned_audit_date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (auditDate < today) {
      errors.push({ field: 'planned_audit_date', message: 'Audit date must be in the future' });
    }
  }

  // Validate role
  if (!sanitized.role) {
    errors.push({ field: 'role', message: 'Role is required' });
  } else if (!VALID_ROLES.includes(sanitized.role)) {
    errors.push({ field: 'role', message: 'Invalid role selection' });
  }

  // Validate email
  if (!sanitized.email) {
    errors.push({ field: 'email', message: 'Email is required' });
  } else if (!EMAIL_REGEX.test(sanitized.email)) {
    errors.push({ field: 'email', message: 'Invalid email format' });
  } else if (sanitized.email.length > MAX_EMAIL_LENGTH) {
    errors.push({ field: 'email', message: 'Email is too long' });
  }

  // Validate consent
  if (!sanitized.consent) {
    errors.push({ field: 'consent', message: 'Consent is required' });
  }

  // Validate optional fields length
  if (sanitized.utm_source && sanitized.utm_source.length > MAX_UTM_LENGTH) {
    sanitized.utm_source = sanitized.utm_source.slice(0, MAX_UTM_LENGTH);
  }
  if (sanitized.variation_id && sanitized.variation_id.length > MAX_VARIATION_ID_LENGTH) {
    sanitized.variation_id = sanitized.variation_id.slice(0, MAX_VARIATION_ID_LENGTH);
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    data: {
      ...sanitized,
      planned_audit_date: sanitized.planned_audit_date!, // We validated this above
    },
    errors: [],
  };
}

/**
 * Validate calculator form input WITHOUT requiring email
 * Email and consent are optional - can be set later via /api/lead/set-email
 */
export function validateCalculatorFormWithoutEmail(input: unknown): ValidationResult<CalculatorFormInputWithoutEmail> {
  const errors: ValidationError[] = [];

  // Ensure input is an object
  if (!input || typeof input !== 'object') {
    return {
      valid: false,
      errors: [{ field: '_', message: 'Invalid input format' }],
    };
  }

  const raw = input as Record<string, unknown>;

  // Sanitize all inputs
  const emailValue = sanitizeString(raw.email).toLowerCase();
  const sanitized = {
    company_name: sanitizeString(raw.company_name),
    industry: sanitizeString(raw.industry).toLowerCase(),
    num_employees: sanitizeNumber(raw.num_employees),
    data_types: sanitizeStringArray(raw.data_types).map((s) => s.toLowerCase()),
    planned_audit_date: sanitizeDate(raw.planned_audit_date),
    role: sanitizeString(raw.role).toLowerCase(),
    email: emailValue || undefined, // Optional - can be undefined
    utm_source: sanitizeString(raw.utm_source) || undefined,
    variation_id: sanitizeString(raw.variation_id) || undefined,
    consent: sanitizeBoolean(raw.consent) || undefined, // Optional
  };

  // Validate company_name
  if (!sanitized.company_name) {
    errors.push({ field: 'company_name', message: 'Company name is required' });
  } else if (sanitized.company_name.length > MAX_COMPANY_NAME_LENGTH) {
    errors.push({ field: 'company_name', message: 'Company name is too long' });
  }

  // Validate industry
  if (!sanitized.industry) {
    errors.push({ field: 'industry', message: 'Industry is required' });
  } else if (!VALID_INDUSTRIES.includes(sanitized.industry)) {
    errors.push({ field: 'industry', message: 'Invalid industry selection' });
  }

  // Validate num_employees
  if (sanitized.num_employees <= 0) {
    errors.push({ field: 'num_employees', message: 'Number of employees must be positive' });
  } else if (sanitized.num_employees > 100000) {
    errors.push({ field: 'num_employees', message: 'Invalid number of employees' });
  }

  // Validate data_types
  if (sanitized.data_types.length === 0) {
    errors.push({ field: 'data_types', message: 'At least one data type is required' });
  } else {
    const invalidTypes = sanitized.data_types.filter((dt) => !VALID_DATA_TYPES.includes(dt));
    if (invalidTypes.length > 0) {
      errors.push({ field: 'data_types', message: 'Invalid data type selection' });
    }
  }

  // Validate planned_audit_date
  if (!sanitized.planned_audit_date) {
    errors.push({ field: 'planned_audit_date', message: 'Planned audit date is required' });
  } else {
    const auditDate = new Date(sanitized.planned_audit_date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (auditDate < today) {
      errors.push({ field: 'planned_audit_date', message: 'Audit date must be in the future' });
    }
  }

  // Validate role
  if (!sanitized.role) {
    errors.push({ field: 'role', message: 'Role is required' });
  } else if (!VALID_ROLES.includes(sanitized.role)) {
    errors.push({ field: 'role', message: 'Invalid role selection' });
  }

  // Email is OPTIONAL here - if provided, validate format
  if (sanitized.email && !EMAIL_REGEX.test(sanitized.email)) {
    errors.push({ field: 'email', message: 'Invalid email format' });
  } else if (sanitized.email && sanitized.email.length > MAX_EMAIL_LENGTH) {
    errors.push({ field: 'email', message: 'Email is too long' });
  }

  // Consent is OPTIONAL here

  // Validate optional fields length
  if (sanitized.utm_source && sanitized.utm_source.length > MAX_UTM_LENGTH) {
    sanitized.utm_source = sanitized.utm_source.slice(0, MAX_UTM_LENGTH);
  }
  if (sanitized.variation_id && sanitized.variation_id.length > MAX_VARIATION_ID_LENGTH) {
    sanitized.variation_id = sanitized.variation_id.slice(0, MAX_VARIATION_ID_LENGTH);
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    data: {
      ...sanitized,
      planned_audit_date: sanitized.planned_audit_date!, // We validated this above
    },
    errors: [],
  };
}

/**
 * Validate UUID format
 */
export function isValidUUID(input: unknown): boolean {
  if (typeof input !== 'string') return false;
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(input);
}

/**
 * Validate admin secret
 */
export function validateAdminAuth(authHeader: string | null, adminSecret: string): boolean {
  if (!authHeader || !adminSecret) return false;
  
  // Support both "Bearer <token>" and raw token
  const token = authHeader.startsWith('Bearer ') 
    ? authHeader.slice(7) 
    : authHeader;
  
  // Constant-time comparison to prevent timing attacks
  if (token.length !== adminSecret.length) return false;
  
  let result = 0;
  for (let i = 0; i < token.length; i++) {
    result |= token.charCodeAt(i) ^ adminSecret.charCodeAt(i);
  }
  
  return result === 0;
}
