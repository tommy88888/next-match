import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';
import { membersData } from './memberData';
import { db } from '@/lib/db';

type MemberProps = {
  email: string;
  username: string;
  gender: string;
  dateOfBirth: Date;
  name: string;
  created: Date;
  lastActive: Date;
  description: string;
  city: string;
  country: string;
  image: string;
};

const prisma = new PrismaClient();

async function seedMembers() {
  return membersData.map(async (member) =>
    prisma.user.create({
      data: {
        email: member.email,
        emailVerified: new Date(),
        name: member.name,
        passwordHash: await hash('111111', 12),
        image: member.image,
        profileComplete: true,
        member: {
          create: {
            dateOfBirth: new Date(member.dateOfBirth),
            gender: member.gender,
            name: member.name,
            created: new Date(member.created),
            updated: new Date(member.lastActive),
            description: member.description,
            city: member.city,
            country: member.country,
            image: member.image,
            photos: {
              create: {
                url: member.image,
                isApproved: true,
              },
            },
          },
        },
      },
    })
  );
}

async function seedAdmin() {
  return await prisma.user.create({
    data: {
      email: 'admin@ad.com',
      emailVerified: new Date(),
      name: 'tom',
      passwordHash: await hash('111111', 12),
      role: 'ADMIN',
    },
  });
}

async function main() {
  await seedMembers();
  await seedAdmin();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect());
