import { PrismaClient } from '@prisma/client';
import { hashSync } from 'bcrypt';
const prisma = new PrismaClient();
async function main() {
  try {
    await prisma.user.upsert({
      where: { email: 'admin@admin.com' },
      update: {},
      create: {
        name: 'administrator',
        email: 'admin@admin.com',
        phoneNumber: '11943956693',
        password: hashSync('123456', 10),
        role: 'ADMIN',
      },
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
