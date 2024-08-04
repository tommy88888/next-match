'use server';

import {
  memberEditSchema,
  MemberEditSchema,
  MemberSchema,
  memberSchema,
} from '@/lib/schemas/member-edit-schema';
import { ActionResult } from '@/types';
import { Member, Photo } from '@prisma/client';
import { getAuthUserId } from './auth-actions';
import { db } from '@/lib/db';
import { cloudinary } from '@/lib/cloudinary';

export async function updateMemberProfile(
  data: MemberEditSchema,
  nameUpdated: boolean
): Promise<ActionResult<Member>> {
  try {
    const validated = memberEditSchema.safeParse(data);

    if (!validated.success)
      return { status: 'error', error: validated.error.errors };
    const userId = await getAuthUserId();

    const { name, description, city, country } = validated.data;

    if (nameUpdated) {
      await db.user.update({
        where: {
          id: userId,
        },
        data: { name },
      });
    }

    const member = await db.member.update({
      where: { userId },
      data: {
        name,
        description,
        city,
        country,
      },
    });
    return { status: 'success', data: member };
  } catch (err: any) {
    console.error(err);
    return { status: 'error', error: err.message || 'Something went wrong' };
  }
}
// export async function newMemberProfile(
//   data: MemberSchema
//   // nameUpdated: boolean
// ): Promise<ActionResult<Member>> {
//   try {
//     const userId = await getAuthUserId();

//     const validated = memberSchema.safeParse(data);

//     if (!validated.success)
//       return { status: 'error', error: validated.error.errors };

//     if (!userId) {
//       return {
//         status: 'error',
//         error: 'No user id found, please log in or register',
//       };
//     }

//     const { name, gender, dateOfBirth, description, city, country } =
//       validated.data;

//     // if (nameUpdated) {
//     //   await db.user.update({
//     //     where: {
//     //       id: userId,
//     //     },
//     //     data: { name },
//     //   });
//     // }

//     const existingMember = await db.member.findUnique({
//       where: { userId: userId },
//     });

//     if (existingMember) {
//       return {
//         status: 'error',
//         error: 'Member already exists for this user',
//       };
//     }
//     const member = await db.member.create({
//       data: {
//         ...data,
//         user: {
//           connect: { id: userId }, // Connect to existing user by userId
//         },
//       },
//     });
//     return { status: 'success', data: member };
//   } catch (err: any) {
//     console.error(err);
//     return { status: 'error', error: err.message || 'Something went wrong' };
//   }
// }

export async function addImage(url: string, publicId: string) {
  try {
    const userId = await getAuthUserId();

    return db.member.update({
      where: { userId },
      data: {
        photos: {
          create: [{ url, publicId }],
        },
      },
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function setMainImage(photo: Photo) {
  if (!photo.isApproved)
    throw new Error('Only approved photos can be set to main image');
  try {
    const userId = await getAuthUserId();

    await db.user.update({
      where: {
        id: userId,
      },
      data: { image: photo.url },
    });

    return db.member.update({
      where: { userId },
      data: { image: photo.url },
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function deleteImage(photo: Photo) {
  try {
    const userId = await getAuthUserId();
    // if (!userId) {
    //   throw new Error('No User id found!');
    // }
    if (photo.publicId) {
      await cloudinary.v2.uploader.destroy(photo.publicId);
    }

    return db.member.update({
      where: { userId },
      data: {
        photos: {
          delete: { id: photo.id },
        },
      },
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function getUserInfoForNav() {
  try {
    const userId = await getAuthUserId();

    return db.user.findUnique({
      where: { id: userId },
      select: { name: true, image: true },
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
}
