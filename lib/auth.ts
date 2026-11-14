import { cookies } from 'next/headers';
import { createHmac, timingSafeEqual } from 'node:crypto';

const AUTH_COOKIE_NAME = 'eltech_admin_session';

function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD ?? 'change-me';
}

function getAdminEmail(): string {
  return process.env.ADMIN_EMAIL ?? 'admin@eltechsolutions.com';
}

function getAuthSecret(): string {
  return process.env.AUTH_SECRET ?? 'development-auth-secret';
}

export function getAdminCredentials() {
  return {
    email: getAdminEmail(),
    password: getAdminPassword(),
  };
}

function signToken(payload: string): string {
  return createHmac('sha256', getAuthSecret()).update(payload).digest('hex');
}

export function isValidAdminSession(sessionValue: string | undefined): boolean {
  if (!sessionValue) return false;

  const [email, signature] = sessionValue.split(':');
  if (!email || !signature) return false;

  const expected = signToken(email);
  const expectedBuffer = Buffer.from(expected, 'hex');
  const suppliedBuffer = Buffer.from(signature, 'hex');

  if (expectedBuffer.length !== suppliedBuffer.length) {
    return false;
  }

  return timingSafeEqual(expectedBuffer, suppliedBuffer) && email === getAdminEmail();
}

export async function createAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  const sessionValue = `${getAdminEmail()}:${signToken(getAdminEmail())}`;
  cookieStore.set(AUTH_COOKIE_NAME, sessionValue, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 8,
  });
}

export async function clearAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE_NAME);
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const sessionValue = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  return isValidAdminSession(sessionValue);
}
