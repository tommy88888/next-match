'use server';

import { db } from '@/lib/db';
import { getUserRole } from './auth-actions';
import { Photo } from '@prisma/client';
import { cloudinary } from '@/lib/cloudinary';

export async function getUnapprovedPhotos() {
  try {
    const role = await getUserRole();

    if (role !== 'ADMIN') throw new Error('Not Authorized');

    return db.photo.findMany({
      where: {
        isApproved: false,
      },
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function approvePhoto(photoId: string) {
  try {
    const role = await getUserRole();
    if (role !== 'ADMIN') throw new Error('Unauthorized');

    const photo = await db.photo.findUnique({
      where: { id: photoId },
      include: { member: { include: { user: true } } },
    });

    if (!photo || !photo.member || !photo.member.user)
      throw new Error('Can not approve this image');
    const { member } = photo;

    const userUpdate =
      member.user && member.user.image === null ? { image: photo.url } : {};

    const memberUpdate = member.image === null ? { image: photo.url } : {};

    if (Object.keys(userUpdate).length > 0) {
      await db.user.update({
        where: { id: member.userId },
        data: userUpdate,
      });
    }

    return db.member.update({
      where: {
        id: member.id,
      },
      data: {
        ...memberUpdate,
        photos: {
          update: {
            where: { id: photo.id },
            data: {
              isApproved: true,
            },
          },
        },
      },
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function rejectPhoto(photo: Photo) {
  try {
    const role = await getUserRole();
    if (role !== 'ADMIN') throw new Error('Unauthorized');

    if (photo.publicId) {
      await cloudinary.v2.uploader.destroy(photo.publicId);
    }

    return db.photo.delete({
      where: { id: photo.id },
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
}
