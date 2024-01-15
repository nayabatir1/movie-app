import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const user = {
  email: 'abcd@example.com',
  password: 'qwerty4321',
};
const saltOrRounds = 10;

const prisma = new PrismaClient();

async function main(): Promise<any> {
  user.password = await bcrypt.hash(user.password, saltOrRounds);

  await prisma.user.create({ data: user });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(0);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
