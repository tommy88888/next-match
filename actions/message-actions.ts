'use server';

import { MessageSchema, messageSchema } from '@/lib/schemas/messageSchema';
import { ActionResult, MessageDto } from '@/types';
import { getAuthUserId } from './auth-actions';
import { db } from '@/lib/db';

import { mapMessageToMessageDto } from '@/lib/mappings';
import { pusherServer } from '@/lib/pusher';
import { createChatId } from '@/lib/utils';

export async function createMessage(
  recipientUserId: string,
  data: MessageSchema
): Promise<ActionResult<MessageDto>> {
  try {
    const userId = await getAuthUserId();
    // if (!userId) {
    //   throw new Error('No User id found!');
    // }
    const validated = messageSchema.safeParse(data);
    if (!validated.success)
      return { status: 'error', error: validated.error.errors };
    const { text } = validated.data;

    const message = await db.message.create({
      data: {
        text,
        recipientId: recipientUserId,
        senderId: userId,
      },
      select: messageSelect,
    });

    const messageDto = mapMessageToMessageDto(message);

    await pusherServer.trigger(
      createChatId(userId, recipientUserId),
      'message:new',
      messageDto
    );
    await pusherServer.trigger(
      `private-${recipientUserId}`,
      'message:new',
      messageDto
    );

    return { status: 'success', data: messageDto };
  } catch (err) {
    console.log(err);
    return { status: 'error', error: 'Something went wrong' };
  }
}

export async function getMessageThread(recipientId: string) {
  try {
    const userId = await getAuthUserId();
    // if (!userId) {
    //   throw new Error('No User id found!');
    // }

    const messages = await db.message.findMany({
      where: {
        OR: [
          {
            senderId: userId,
            recipientId,
            senderDeleted: false,
          },
          {
            senderId: recipientId,
            recipientId: userId,
            recipientDeleted: false,
          },
        ],
      },
      orderBy: {
        created: 'asc',
      },
      select: messageSelect,
    });

    let readCount = 0;

    if (messages.length > 0) {
      const readMessageIds = messages
        .filter(
          (m) =>
            m.dateRead === null &&
            m.recipient?.userId === userId &&
            m.sender?.userId === recipientId
        )
        .map((m) => m.id);

      await db.message.updateMany({
        where: {
          id: { in: readMessageIds },
        },
        data: { dateRead: new Date() },
      });

      readCount = readMessageIds.length;

      await pusherServer.trigger(
        createChatId(recipientId, userId),
        'messages:read',
        readMessageIds
      );
    }

    const messagesToReturn = messages.map((message) =>
      mapMessageToMessageDto(message)
    );
    return { messages: messagesToReturn, readCount };
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function getMessagesByContainer(
  container?: string | null,
  cursor?: string,
  limit = 10
) {
  try {
    const userId = await getAuthUserId();
    // const selector = container === 'outbox' ? 'senderId' : 'recipientId';

    const conditions = {
      [container === 'outbox' ? 'senderId' : 'recipientId']: userId,
      ...(container === 'outbox'
        ? { senderDeleted: false }
        : { recipientDeleted: false }),
    };

    const messages = await db.message.findMany({
      where: {
        ...conditions,
        ...(cursor ? { created: { lte: new Date(cursor) } } : {}),
      },
      orderBy: {
        created: 'desc',
      },
      select: messageSelect,
      take: limit + 1,
    });

    let nextCursor: string | undefined;

    if (messages.length > limit) {
      const nextItem = messages.pop();
      nextCursor = nextItem?.created.toISOString();
    } else {
      nextCursor = undefined;
    }

    const messagesToReturn = messages.map((message) =>
      mapMessageToMessageDto(message)
    );

    return { messages: messagesToReturn, nextCursor };
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function deleteMessage(messageId: string, isOutBox: boolean) {
  const selector = isOutBox ? 'senderDeleted' : 'recipientDeleted';

  try {
    const userId = await getAuthUserId();

    await db.message.update({
      where: {
        id: messageId,
      },
      data: {
        [selector]: true,
      },
    });

    const messageToDelete = await db.message.findMany({
      where: {
        OR: [
          {
            senderId: userId,
            senderDeleted: true,
            recipientDeleted: true,
          },
          {
            recipientId: userId,
            senderDeleted: true,
            recipientDeleted: true,
          },
        ],
      },
    });

    if (messageToDelete.length > 0) {
      await db.message.deleteMany({
        where: {
          OR: messageToDelete.map((m) => ({ id: m.id })),
        },
      });
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function getUnreadMessageCount() {
  try {
    const userId = await getAuthUserId();
    const res = await db.message.findMany({
      where: {
        recipientId: userId,
        // dateRead: null,
        // recipientDeleted: false,
      },
    });
    return res.filter(
      (r) =>
        r.dateRead === null &&
        r.recipientDeleted === false &&
        r.recipientId === userId
    ).length;

    // return db.message.count({
    //   where: {
    //     recipientId: userId,
    //     dateRead: null,
    //     recipientDeleted: false,
    //   },
    // });
  } catch (err) {
    console.error(err);
    throw err;
  }
}

const messageSelect = {
  id: true,
  text: true,
  created: true,
  dateRead: true,
  sender: {
    select: {
      userId: true,
      name: true,
      image: true,
    },
  },
  recipient: {
    select: {
      userId: true,
      name: true,
      image: true,
    },
  },
};
