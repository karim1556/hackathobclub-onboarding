import { getDatabase } from '@/lib/database';

type JoinPayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[+\d][\d\s().-]{6,19}$/;

function errorResponse(message: string, status: number) {
  return Response.json({ ok: false, message }, { status });
}

export async function POST(request: Request) {
  let payload: JoinPayload;

  try {
    payload = (await request.json()) as JoinPayload;
  } catch {
    return errorResponse('Please check your details and try again.', 400);
  }

  const name = typeof payload.name === 'string' ? payload.name.trim() : '';
  const email = typeof payload.email === 'string' ? payload.email.trim().toLowerCase() : '';
  const phone = typeof payload.phone === 'string' ? payload.phone.trim() : '';

  if (name.length < 2 || name.length > 80) {
    return errorResponse('Enter your full name.', 400);
  }

  if (email.length > 120 || !emailPattern.test(email)) {
    return errorResponse('Enter a valid email address.', 400);
  }

  if (phone.length > 20 || !phonePattern.test(phone)) {
    return errorResponse('Enter a valid contact number.', 400);
  }

  try {
    await getDatabase()
      .prepare(
        `INSERT INTO club_signups (id, name, email, phone, created_at)
         VALUES (?, ?, ?, ?, ?)`,
      )
      .bind(crypto.randomUUID(), name, email, phone, Date.now())
      .run();

    return Response.json({ ok: true });
  } catch (error) {
    console.error('Unable to save club signup', error);
    return errorResponse('We could not save your details. Please try again.', 500);
  }
}
