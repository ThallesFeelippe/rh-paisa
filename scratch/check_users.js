const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany();
  console.log('Users in database:', users.map(u => ({ username: u.username, role: u.role, name: u.name })));
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
