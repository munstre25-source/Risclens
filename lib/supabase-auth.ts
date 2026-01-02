import { cookies } from 'next/headers';

// Centralized admin gate used by admin APIs
export async function requireAdmin(req: Request): Promise<boolean> {
  const adminSecret = process.env.ADMIN_SECRET;
  if (!adminSecret) return false;

  const cookieStore = cookies();
  const cookieToken = cookieStore.get('admin_token')?.value;
  const headerToken =
    req.headers.get('x-admin-secret') || req.headers.get('authorization');

  // Accept either the cookie set by /api/admin/login or the header token for scripted calls
  const authed =
    cookieToken === adminSecret ||
    (!!headerToken && headerToken.replace(/^Bearer\\s+/i, '') === adminSecret);

  return authed;
}
