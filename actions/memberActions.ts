'use server';

import { db } from '@/lib/db';
import { GetMemberParams, PaginatedResponse, UserFilters } from '@/types';
import { Member, Photo } from '@prisma/client';
import { addYears } from 'date-fns';
import { getAuthUserId } from './auth-actions';
import image from 'next/image';

export async function getMembers({
  ageRange = '18,100',
  gender = 'male,female',
  orderBy = 'updated',
  pageNumber = '1',
  pageSize = '12',
  withPhoto = 'true',
}: GetMemberParams): Promise<PaginatedResponse<Member>> {
  // const session = await auth();
  // if (!session?.user) return null;

  const userId = await getAuthUserId();
  if (!userId) {
    throw new Error('No User id found!');
  }

  // const ageRange = searchParams?.ageRange?.toString()?.split(',') || [18, 100];
  const [minAge, maxAge] = ageRange.split(',');

  const currentDate = new Date();

  const minDob = addYears(currentDate, -maxAge - 1);

  const maxDob = addYears(currentDate, -minAge);

  // const orderBySelector = searchParams?.orderBy || 'updated';

  // const selectedGender = searchParams?.gender?.toString()?.split(',') || [
  //   'male',
  //   'female',
  // ];

  const selectedGender = gender.split(',');

  const page = parseInt(pageNumber);
  const limit = parseInt(pageSize);

  const skip = (page - 1) * limit;

  try {
    const member = await db.member.findUnique({
      where: { userId },
    });

    if (!member) {
      throw new Error('Member not found');
    }

    // let conditions = [
    //   { dateOfBirth: { gte: minDob } },
    //   { dateOfBirth: { lte: maxDob } },
    //   { gender: { in: selectedGender } },
    // ];

    // if (withPhoto === 'true') {
    //   conditions.push({ image: { not: null } });
    // }

    const count = await db.member.count({
      where: {
        AND: [
          { dateOfBirth: { gte: minDob } },
          { dateOfBirth: { lte: maxDob } },
          { gender: { in: selectedGender } },
          ...(withPhoto === 'true' ? [{ image: { not: null } }] : []),
        ],
        NOT: {
          userId,
        },
      },
    });

    const members = await db.member.findMany({
      where: {
        AND: [
          { dateOfBirth: { gte: minDob } },
          { dateOfBirth: { lte: maxDob } },
          { gender: { in: selectedGender } },
          ...(withPhoto === 'true' ? [{ image: { not: null } }] : []),
        ],
        NOT: {
          userId,
        },
      },
      orderBy: { [orderBy]: 'desc' },
      skip,
      take: limit,
    });

    return {
      items: members,
      totalCount: count,
    };
  } catch (err) {
    console.log(err);
    throw err;
    // return {
    //   items: [],
    //   totalCount: 0,
    // };
  }
}

export async function getMemberByUserId(userId: string) {
  try {
    return await db.member.findUnique({
      where: {
        userId,
      },
    });
  } catch (err) {
    console.error(err);
  }
}

export async function getPhotosByUserId(userId: string) {
  const currentUserId = await getAuthUserId();

  const member = await db.member.findUnique({
    where: { userId },
    select: {
      photos: {
        where: currentUserId === userId ? {} : { isApproved: true },
      },
    },
  });

  if (!member) return null;

  return member.photos as Photo[];
}

export async function updateLastActive() {
  const userId = await getAuthUserId();
  if (!userId) {
    throw new Error('No User id found!');
  }

  try {
    const member = await db.member.findUnique({
      where: { userId },
    });

    if (!member) return null;

    return db.member.update({
      where: { userId },
      data: { updated: new Date() },
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
}
