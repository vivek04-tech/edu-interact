import { NextRequest } from 'next/server';
import { verifyToken, TokenPayload } from './jwt';
import { cookies } from 'next/headers';

export async function getAuthFromRequest(request: NextRequest): Promise<TokenPayload | null> {
  // Get token from cookies
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    return null;
  }

  return verifyToken(token);
}

export function checkRole(requiredRoles: string[]) {
  return async (request: NextRequest) => {
    const auth = await getAuthFromRequest(request);

    if (!auth) {
      return { error: 'Unauthorized', status: 401 };
    }

    if (!requiredRoles.includes(auth.role)) {
      return { error: 'Forbidden', status: 403 };
    }

    return { auth, error: null, status: 200 };
  };
}
