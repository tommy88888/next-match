import { TokenType } from '@prisma/client';

import { db } from './db';

export async function getTokenByEmail(email: string) {
  try {
    return db.token.findFirst({
      where: { email },
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
}
export async function getTokenByToken(token: string) {
  try {
    return db.token.findFirst({
      where: { token },
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function generateToken(email: string, type: TokenType) {
  const arrayBuffer = new Uint8Array(48);
  crypto.getRandomValues(arrayBuffer);
  const token = Array.from(arrayBuffer, (byte) =>
    byte.toString(16).padStart(2, '0')
  ).join('');
  const expires = new Date(Date.now() + 1000 * 60 * 60 * 24);

  const existingToken = await getTokenByEmail(email);
  if (existingToken) {
    await db.token.delete({
      where: { id: existingToken.id },
    });
  }

  return db.token.create({
    data: {
      email,
      token,
      expires,
      type,
    },
  });
}
