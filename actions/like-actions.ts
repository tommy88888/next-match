'use server';

import { auth } from '@/auth';
import { db } from '@/lib/db';

import { pusherServer } from '@/lib/pusher';

export async function toggleLikeMember(targetUserId: string, isLiked: boolean) {
  try {
    // const userId = await getAuthUserId();
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) throw new Error('Unauthorized');

    if (isLiked) {
      await db.like.delete({
        where: {
          sourceUserId_targetUserId: {
            sourceUserId: userId,
            targetUserId,
          },
        },
      });
    } else {
      const like = await db.like.create({
        data: {
          sourceUserId: userId,
          targetUserId,
        },
        select: {
          sourceMember: {
            select: {
              name: true,
              image: true,
              userId: true,
            },
          },
        },
      });
      await pusherServer.trigger(`private-${targetUserId}`, 'like:new', {
        name: like.sourceMember.name,
        image: like.sourceMember.image,
        userId: like.sourceMember.userId,
      });
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function fetchCurrentUserLikeIds() {
  try {
    // const userId = await getAuthUserId();
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) throw new Error('Unauthorized');
    const likeIds = await db.like.findMany({
      where: {
        sourceUserId: userId,
      },
      select: {
        targetUserId: true,
      },
    });

    return likeIds.map((like) => like.targetUserId);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const fetchLikedMembers = async (type = 'source') => {
  try {
    // const userId = await getAuthUserId();
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) throw new Error('Unauthorized');

    switch (type) {
      case 'source':
        return await fetchSourceLikes(userId);
      case 'target':
        return await fetchTargetLikes(userId);
      case 'mutual':
        return await fetchMutualLikes(userId);
      default:
        return [];
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const fetchSourceLikes = async (userId: string) => {
  const sourceList = await db.like.findMany({
    where: { sourceUserId: userId },
    select: { targetMember: true },
  });
  return sourceList.map((x) => x.targetMember);
};

const fetchTargetLikes = async (userId: string) => {
  const targetList = await db.like.findMany({
    where: { targetUserId: userId },
    select: { sourceMember: true },
  });
  return targetList.map((x) => x.sourceMember);
};

const fetchMutualLikes = async (userId: string) => {
  const likedUsers = await db.like.findMany({
    where: { sourceUserId: userId },
    select: { targetUserId: true },
  });
  const likedIds = likedUsers.map((x) => x.targetUserId);

  const mutualList = await db.like.findMany({
    where: {
      AND: [{ targetUserId: userId }, { sourceUserId: { in: likedIds } }],
    },
    select: { sourceMember: true },
  });
  return mutualList.map((x) => x.sourceMember);
};
