import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando Seeding do Banco de Dados...');

  // 1. Criar Usuário Admin Mestre (Se não existir)
  const masterUsername = 'admin'; // Substitua pelo seu usuário preferido se desejar
  const hashedPassword = await bcrypt.hash('paisa2024', 10);

  const admin = await prisma.user.upsert({
    where: { username: masterUsername },
    update: {},
    create: {
      username: masterUsername,
      password: hashedPassword,
      name: 'Administrador Paisa',
      role: 'ADMIN',
    },
  });
  console.log(`✅ Usuário Admin verificado/criado: ${admin.username}`);

  // 2. Criar Notícias Iniciais (Se o banco estiver vazio)
  const newsCount = await prisma.news.count();
  if (newsCount === 0) {
    await prisma.news.createMany({
      data: [
        {
          title: "USINA PAISA LIDERA SUSTENTABILIDADE NO NORDESTE",
          slug: "sustentabilidade-paisa-destaque",
          excerpt: "Novas certificações confirmam o compromisso ambiental da unidade.",
          content: "A Usina Paisa atingiu recordes históricos em redução de emissão de carbono...",
          category: "ESG",
          status: "PUBLICO",
          authorName: "Comunicação Paisa",
        },
        {
            title: "TECNOLOGIA NO CAMPO: DRONES E IA NA SAFRA",
            slug: "tecnologia-campo-drones",
            excerpt: "Monitoramento em tempo real aumenta a eficiência da produção.",
            content: "O uso de inteligência artificial aplicada ao monitoramento de pragas...",
            category: "Tecnologia",
            status: "PUBLICO",
            authorName: "TI Paisa",
        }
      ]
    });
    console.log('✅ Notícias iniciais criadas.');
  }

  // 3. Criar Vagas Iniciais
  const jobCount = await prisma.job.count();
  if (jobCount === 0) {
    await prisma.job.createMany({
      data: [
        {
          title: "Operador de Máquinas",
          area: "Operacional",
          location: "Unidade Alagoas",
          type: "CLT - Presencial",
          description: "Operação de colhedoras e tratores de grande porte.",
          status: "PUBLICO"
        },
        {
            title: "Analista de RH",
            area: "Administrativo",
            location: "Escritório Central",
            type: "CLT - Híbrido",
            description: "Gestão de talentos e processos seletivos.",
            status: "PUBLICO"
        }
      ]
    });
    console.log('✅ Vagas iniciais criadas.');
  }

  console.log('🚀 Seeding finalizado com sucesso!');
}

main()
  .catch((e) => {
    console.error('❌ Erro no Seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
