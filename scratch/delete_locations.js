const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const namesToDelete = ['CIEE', 'USINA PAISA'];
  
  for (const name of namesToDelete) {
    const loc = await prisma.workLocation.findUnique({ where: { name } });
    if (loc) {
      // Check if it has employees
      const empCount = await prisma.employee.count({ where: { workLocationId: loc.id } });
      if (empCount === 0) {
        await prisma.workLocation.delete({ where: { id: loc.id } });
        console.log(`Deleted: ${name}`);
      } else {
        console.log(`Cannot delete ${name}: has employees`);
      }
    } else {
      console.log(`Not found: ${name}`);
    }
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
