const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed (Modo JS Direto)...');

  // 1. Admin fixo
  const adminPassword = await bcrypt.hash('Paisa@2026!', 10);
  const admin = await prisma.user.upsert({
    where: { username: 'admin' },
    update: { 
      password: adminPassword,
      role: 'ADMIN',
      name: 'Administrador RH'
    },
    create: {
      username: 'admin',
      password: adminPassword,
      name: 'Administrador RH',
      role: 'ADMIN'
    }
  });
  console.log(`✅ Admin configurado: ${admin.username}`);

  // 2. Locais base da usina
  const usina = await prisma.workLocation.upsert({
    where: { name: 'Usina Paisa - Matriz' },
    update: {},
    create: { name: 'Usina Paisa - Matriz', category: 'RURAL' }
  });

  await prisma.workLocation.upsert({
    where: { name: 'Administrativo Central' },
    update: {},
    create: { name: 'Administrativo Central', category: 'ADMINISTRATIVA', parentId: usina.id }
  });
  console.log('✅ Locais base configurados');

  // 3. Setores base
  const setores = ['Operacional', 'Manutenção', 'Agrícola', 'RH', 'Segurança do Trabalho'];
  for (const nome of setores) {
    await prisma.sector.upsert({
      where: { name: nome },
      update: {},
      create: { name: nome }
    });
  }
  console.log('✅ Setores base configurados');

  // 4. Tipos de afastamento
  const tiposLeave = ['Atestado Médico', 'Licença Maternidade', 'Acidente de Trabalho', 'Férias', 'Licença Não Remunerada'];
  for (const nome of tiposLeave) {
    await prisma.leaveType.upsert({
      where: { name: nome },
      update: {},
      create: { name: nome }
    });
  }
  console.log('✅ Tipos de afastamento configurados');

  console.log('🚀 Seed finalizado com sucesso!');
  console.log('Acesso: admin | Senha: Paisa@2026!');
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
